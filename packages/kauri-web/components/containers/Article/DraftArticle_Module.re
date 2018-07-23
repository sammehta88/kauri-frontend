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
  type payload = {
    article_id: string,
    article_version: int,
    category: string,
    content_hash: string,
    request_id: option(string),
    user_id: string,
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
    |. switchMap(action => {
         let (apolloClient, subscriber) =
           dependencies
           |. (
             ReduxObservable.Dependencies.apolloClientGet,
             ReduxObservable.Dependencies.subscribeToOffchainEvent,
           );
         of1(action);
       })
  );