open ReduxObservable.Store;
open ReduxObservable.Dependencies;

[@bs.deriving abstract]
type approveArticlePayload = {
  id: string,
  version: int,
  content_hash: string,
  category: string,
};

type actionType =
  | ApproveArticle;

let stringOfActionType = actionType =>
  switch (actionType) {
  | ApproveArticle => "TRACK_ANALYTICS"
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
  approveArticleAction(~type_=stringOfActionType(ApproveArticle), ~payload);

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($id: String, $article_version: Int, $signature: String) {
      approveArticle(id: $id, version: $article_version, signature: $signature) {
         hash
        }
    }
  |}
];

module ApproveArticleQuery = ReasonApollo.CreateQuery(ApproveArticle);
let approveArticleQuery =
  ApproveArticle.make(~id="993d89122c124b9aba49e07f41c21752", ());

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) => {
  let apolloClient = dependencies |. apolloClient;
  let queryMethod = {
    "query": ApproveArticleQuery.graphqlQueryAST,
    "variables": approveArticleQuery##variables,
  };
  let subscriber = dependencies |. apolloSubscriber;

  ReduxObservable.Observable.(
    action
    |. ofType(stringOfActionType(ApproveArticle))
    |. tap(_x => Js.log(of1))
    /* |. tap(_x => Js.log(apolloClient##query(queryMethod))) */
    |. tap(_x => fromPromise(apolloClient##query(queryMethod)))
  );
  /* |. mergeMap({ data: { approveArticle: { hash } } }) => fromPromise(subscriber(x |. type_))) */
  /* |. mapTo(reduxAction(~type_="HEY")) */
  /* |. flatMap(x => fromPromise(Js.Promise.resolve(1))) */
  /* |. flatMap(x => of1(x |. payload))
     |. mergeMap(x => of1(x |. version)) */
};
/* let signature = ...Some genius , */
/* let hey = action |. payloadGet; */
/* let state = store.getState(); */
/* let me = dependencies |. driverJSGet |. getDriver(2); */