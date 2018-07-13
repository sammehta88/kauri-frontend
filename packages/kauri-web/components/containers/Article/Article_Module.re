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
type approveArticleAction = {
  [@bs.as "type"]
  type_: string,
  payload: approveArticlePayload,
};

[@bs.deriving abstract]
type reduxAction = {
  [@bs.as "type"]
  type_: string,
};

let approveArticleAction =
    (payload: approveArticlePayload)
    : approveArticleAction =>
  approveArticleAction(~type_=stringOfActionType(ApproveArticle), ~payload);

module GetArticle = [%graphql
  {|
    query getArticle($id: String) {
        getArticle (id: $id) {
          article_id
        }
    }
  |}
];

module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

[@bs.deriving abstract]
type apolloQuery = {
  query: string,
  mutation: string,
};

[@bs.module] external gql : ReasonApolloTypes.gql = "graphql-tag";

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) => {
  let hey = 1;
  let apolloClient = dependencies |. apolloClient;
  let getArticleQuery =
    GetArticle.make(~id="993d89122c124b9aba49e07f41c21752", ());
  /* let graphqlQueryAST = gql(GetArticleQuery.query); */
  let queryMethod = {
    "query": gql(. GetArticle.query),
    "variables": getArticleQuery##variables,
  };

  ReduxObservable.Observable.(
    action
    |. ofType(stringOfActionType(ApproveArticle))
    |. tap(_x => Js.log(of1))
    |. tap(_x => Js.log(apolloClient##query(queryMethod)))
    |. flatMap(x => of1(x |. payload))
    |. mergeMap(x => of1(x |. version))
    |. mapTo(reduxAction(~type_="HEY"))
  );
};
/* let signature = ...Some genius , */
/* let hey = action |. payloadGet; */
/* let state = store.getState(); */
/* let me = dependencies |. driverJSGet |. getDriver(2); */