exception NoHashFound;
exception NoResponseData;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

module DraftArticle = {
  let actionType = "DRAFT_ARTICLE";

  [@bs.deriving abstract]
  type metadata = {
    [@bs.as "FOR_VERSION"]
    forVersion: string,
  };

  [@bs.deriving abstract]
  type payload = {
    id: string,
    subject: string,
    text: string,
    category: string,
    sub_category: string,
    metadata,
    draft: bool,
    request_id: option(string),
  };

  [@bs.deriving abstract]
  type action = {
    [@bs.as "type"]
    type_: string,
    payload,
  };
};

let draftArticleAction = (payload: DraftArticle.payload) : DraftArticle.action =>
  DraftArticle.action(~type_=DraftArticle.actionType, ~payload);

let draftArticleEpic =
    (
      action: DraftArticle.action,
      _store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    |. ofType(DraftArticle.actionType)
    |. switchMap(draftArticleAction => {
         let (apolloClient, subscriber) =
           dependencies
           |. (
             ReduxObservable.Dependencies.apolloClientGet,
             ReduxObservable.Dependencies.subscribeToOffchainEvent,
           );

         let (resourceID, subject, category, text, sub_category) =
           draftArticleAction
           |. DraftArticle.payloadGet
           |. DraftArticle.(
                idGet,
                subjectGet,
                categoryGet,
                textGet,
                sub_categoryGet,
              );

         let request_id =
           switch (
             draftArticleAction
             |. DraftArticle.payloadGet
             |. DraftArticle.request_idGet
           ) {
           | Some(request_id) => request_id
           | None => ""
           };

         let forVersion =
           draftArticleAction
           |. DraftArticle.payloadGet
           |. DraftArticle.metadataGet
           |. DraftArticle.forVersionGet;

         let metadataString = {j|{"FOR_VERSION", $(forVersion)}|j};

         let draftArticleMutation =
           Article_Queries.DraftArticle.make(
             ~id=resourceID,
             ~subject,
             ~text,
             ~category,
             ~sub_category,
             ~metadata=Js.Json.parseExn(metadataString),
             ~draft=true,
             ~request_id,
             (),
           );

         fromPromise(
           apolloClient##mutate({
             "mutation": Article_Queries.DraftArticleMutation.graphqlMutationAST,
             "variables": draftArticleMutation##variables,
             "fetchPolicy": Js.Nullable.undefined,
           }),
         );
       })
  );