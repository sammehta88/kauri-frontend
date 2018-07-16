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
type approveArticlePayload = {
  id: string,
  article_version: int,
  category: string,
  content_hash: string,
  request_id: option(string),
  user_id: string,
};

[@bs.deriving abstract]
type reduxAction = {
  [@bs.as "type"]
  type_: string,
};

[@bs.deriving abstract]
type approveArticleAction = {
  [@bs.as "type"]
  type_: string,
  payload: approveArticlePayload,
};

let approveArticleAction =
    (payload: approveArticlePayload)
    : approveArticleAction =>
  approveArticleAction(~type_="APPROVE_ARTICLE", ~payload);

module GetArticle = [%graphql
  {|
    query getArticle($article_id: String) {
      getArticle(id: $article_id) {
        article_id
        user_id
        request_id
        date_created
        date_updated
        text
        tip
        status
        subject
        sub_category
        category
        content_hash
        comments {
          comment_id
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
          user {
            username
          }
        }
        user {
          user_id
          username
        }
        metadata
      }
    }
  |}
];

module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($id: String!, $article_version: Int!, $signature: String!) {
      approveArticle(id: $id, article_version: $article_version, signature: $signature) {
         hash
      }
    }
  |}
];

module ApproveArticleMutation = ReasonApollo.CreateMutation(ApproveArticle);

[@bs.module "../../../lib/generate-approve-article-hash.js"]
/* (id, version, content_hash, category, request_id, contributor) => "" */
external generateApproveArticleHash :
  (string, int, string, string, string, string) => string =
  "default";

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) =>
  ReduxObservable.Observable.(
    action
    |. ofType("APPROVE_ARTICLE")
    |. switchMap(action => {
         let apolloClient = dependencies |. apolloClientGet;
         let subscriber = dependencies |. subscribeToOffchainEvent;
         let personalSign = dependencies |. personalSignGet;

         let resourceID = action |. payloadGet |. idGet;
         let article_version = action |. payloadGet |. article_versionGet;
         let category = action |. payloadGet |. categoryGet;
         let content_hash = action |. payloadGet |. content_hashGet;
         let request_id =
           switch (action |. payloadGet |. request_idGet) {
           | Some(request_id) => request_id
           | None => ""
           };
         let user_id = action |. payloadGet |. user_idGet;
         /* let resourceID = "a38f4088c7c04e449644d6f25e28bd49";
            let article_version = 1;
            let category = "kauri";
            let user_id = "0xf8ae578d5d4e570de6c31f26d42ef369c320ae0b";
            let content_hash = "QmZpfbd67BNumh5gJnp7jeXNz443V4rDvYsDssDKREtFgq"; */
         open Mixpanel_Module;
         let metaData = {
           "resource": "article",
           "resourceID": resourceID,
           "resourceAction": "approve article",
         };
         let trackApproveArticlePayload =
           trackMixPanelPayload(~event="Offchain", ~metaData);
         let trackApproveArticleAction =
           trackMixPanelAction(trackApproveArticlePayload);
         open App_Module;
         let notificationType = notificationTypeToJs(`Success);
         let showApproveArticleNotificationPayload =
           showNotificationPayload(
             ~notificationType,
             ~message="Article approved",
             ~description=
               "This approved article now needs to be published by the author",
           );

         let showApproveArticleNotificationAction =
           showNotificationAction(showApproveArticleNotificationPayload);

         /* (id, version, content_hash, category, request_id, contributor) => "" */
         let approveArticleHash =
           generateApproveArticleHash(
             resourceID,
             article_version,
             content_hash,
             category,
             request_id,
             user_id,
           );

         fromPromise(personalSign(approveArticleHash))
         |. mergeMap(signature => {
              let approveArticleMutation =
                ApproveArticle.make(
                  ~id=resourceID,
                  ~article_version,
                  ~signature,
                  (),
                );

              let approveArticleMutationMethod = {
                "mutation": ApproveArticleMutation.graphqlMutationAST,
                "variables": approveArticleMutation##variables,
                "fetchPolicy": Js.Nullable.undefined,
              };

              fromPromise(
                apolloClient##mutate(approveArticleMutationMethod),
              );
            })
         |. map(response => {
              let possibleResponse = Js.Nullable.toOption(response##data);
              switch (possibleResponse) {
              | Some(data) =>
                let result = ApproveArticle.parse(data);
                switch (result##approveArticle |? (x => x##hash)) {
                | Some(hash) => hash
                | None => raise(NoHashFound)
                };
              | _ => raise(NoResponseData)
              };
            })
         |. mergeMap(hash => fromPromise(subscriber([|hash|])))
         |. mergeMap(_hash => {
              let getArticleQuery =
                GetArticle.make(~article_id=resourceID, ());
              let getArticleQueryMethod = {
                "query": GetArticleQuery.graphqlQueryAST,
                "variables": getArticleQuery##variables,
                "fetchPolicy": Js.Nullable.return("network-only"),
              };

              fromPromise(apolloClient##query(getArticleQueryMethod));
            })
         |. flatMapTo(
              of3(
                trackApproveArticleAction,
                showApproveArticleNotificationAction,
                routeChangeAction(
                  route(~routeType=ArticleApproved, ~slug=resourceID),
                ),
              ),
            )
         |. catch(err => {
              Js.log(err);
              of1(showErrorNotificationAction(err));
            });
       })
  );