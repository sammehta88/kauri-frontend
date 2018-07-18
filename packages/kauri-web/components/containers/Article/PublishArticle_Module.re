open ReduxObservable.Store;
open ReduxObservable.Dependencies;

exception NoHashFound;
exception NoResponseData;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

[@bs.deriving abstract]
type publishArticlePayload = {
  article_id: string,
  article_version: int,
  request_id: option(string),
  content_hash: string,
  category: string,
  user_id: string,
  signature: string,
};

[@bs.deriving abstract]
type publishArticleAction = {
  [@bs.as "type"]
  type_: string,
  payload: publishArticlePayload,
};

let publishArticleAction =
    (payload: publishArticlePayload)
    : publishArticleAction =>
  publishArticleAction(~type_="PUBLISH_ARTICLE", ~payload);

[@bs.module "../../../lib/generate-approve-article-hash.js"]
/* (content_hash) => "" */
external convertIpfsHash : string => string = "convertIpfsHash";

type rs;

[@bs.send] external toString : (rs, string) => string = "";

[@bs.deriving abstract]
type signatureParameters = {
  v: string,
  r: rs,
  s: rs,
};
[@bs.module "ethereumjs-util"]
/* Article signature => signature decomposed */
external fromRpcSig : string => signatureParameters = "";

/*
 * Convert IPFS hash from content_hash
  1 - Publish article transaction
  2 - Subscribe to onchain event txid-ArticlePublished
  3 - Get Article query fetch with no cache
   */

let publishArticleEpic =
    (action: publishArticleAction, store: store, dependencies: dependencies) =>
  ReduxObservable.Observable.(
    action
    |. ofType("PUBLISH_ARTICLE")
    |. switchMap(action => {
         let apolloClient = dependencies |. apolloClientGet;
         let getGasPrice = dependencies |. getGasPriceGet;
         let subscriber = dependencies |. subscribeToOnchainEvent;

         let resourceID = action |. payloadGet |. article_idGet;
         let article_version = action |. payloadGet |. article_versionGet;
         let category = action |. payloadGet |. categoryGet;
         let content_hash = action |. payloadGet |. content_hashGet;
         let signature = action |. payloadGet |. signatureGet;
         let accounts = dependencies |. web3Get |. ethGet |. accountsGet;
         let request_id =
           switch (action |. payloadGet |. request_idGet) {
           | Some(request_id) => request_id
           | None => ""
           };
         let contributor = action |. payloadGet |. user_idGet;
         let convertedIPFSHash = convertIpfsHash(content_hash);
         let signatureParams = fromRpcSig(signature);
         /* let signatureParams =
            fromRpcSig(
              "0x472832bdb76d62cc39582e37f493d03549b7c6cc5129fe7c133df86d75edc20632ccaa52e4c0e72ef1ff581fbe7cb376036be9785ff522c685825ad8e84e75fe1b",
            ); */
         let signatureV = signatureParams |. vGet;
         let signatureR =
           "0x" ++ (signatureParams |. rGet |. toString("hex"));
         let signatureS =
           "0x" ++ (signatureParams |. sGet |. toString("hex"));
         /* let resourceID = "a38f4088c7c04e449644d6f25e28bd49";
            let article_version = 1;
            let category = "kauri";
            let user_id = "0xf8ae578d5d4e570de6c31f26d42ef369c320ae0b";
            let content_hash = "QmZpfbd67BNumh5gJnp7jeXNz443V4rDvYsDssDKREtFgq"; */

         let kauriCoreDeployedContract =
           dependencies |. smartContractsGet() |. kauriCoreGet;

         let publishArticle =
           kauriCoreDeployedContract |. KauriCore.publishArticle;

         fromPromise(getGasPrice())
         |. mergeMap(gasPrice =>
              publishArticle(
                resourceID,
                article_version,
                request_id,
                convertedIPFSHash,
                category,
                contributor,
                signatureV,
                signatureR,
                signatureS,
                accounts[0],
                gasPrice,
              )
              |. fromPromise
            )
         |. tap(transactionHash => {
              Js.log(transactionHash);
              let dispatchAction = store |. ReduxObservable.Store.dispatch;
              open App_Module;

              let publishArticleMetaData = {
                resource: "article",
                resourceID,
                resourceAction: "publish article",
              };

              dispatchAction(
                `RouteChange(
                  routeChangeAction(
                    route(~slug=resourceID, ~routeType=ArticlePublished),
                  ),
                ),
              );
              dispatchAction(
                `ShowNotification(showWaitingForTransactionToBeMinedAction),
              );
              dispatchAction(
                `TrackMixpanel(
                  trackMixPanelAction(
                    trackMixPanelPayload(
                      ~event="Offchain",
                      ~metaData=publishArticleMetaData,
                    ),
                  ),
                ),
              );
            })
         |. tap(_ => apolloClient##resetStore())
         |. mergeMap(transactionHash =>
              fromPromise(subscriber(transactionHash, `ArticlePublished))
            )
         |. tap(response => Js.log(response))
         |. mergeMap(_ => {
              open App_Module;
              let notificationType = notificationTypeToJs(`Success);
              let showPublishArticleNotificationPayload =
                showNotificationPayload(
                  ~notificationType,
                  ~message="Article published",
                  ~description=
                    "Your article is now published and verified by "
                    ++ String.capitalize(category)
                    ++ "!",
                );

              showPublishArticleNotificationPayload
              |. showNotificationAction
              |. of1;
            })
         |. catch(err => {
              Js.log(err);
              of1(App_Module.(showErrorNotificationAction(err)));
            });
       })
  );