[@bs.deriving abstract]
type approveArticlePayload = {
  id: string,
  version: int,
  signature: string,
};

type actionType =
  | ApproveArticle;

let stringOfActionType = actionType =>
  switch (actionType) {
  | ApproveArticle => "APPROVE_ARTICLE"
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

type state = {hey: int};

type store = {getState: unit => state};

type apolloClient;

type smartContracts;

type web3;

type fetch;

type apolloSubscriber;

type web3PersonalSign;

type getGasPrice;

type driverJS;

/* [@bs.send] external getDriver : (driverJS, int) => unit = ""; */
[@bs.deriving abstract]
type dependencies = {
  apolloClient,
  smartContracts,
  web3,
  fetch,
  apolloSubscriber,
  web3PersonalSign,
  getGasPrice,
  driverJS,
};

let approveArticleEpic = (action: approveArticleAction, _store, _dependencies) =>
  ReduxObservable.(
    action
    |. ofType("hey")
    |. flatMap(x => of1(x |. payloadGet))
    |. mergeMap(x => of1(x |. versionGet))
  );
/* let hey = action |. payloadGet; */
/* let state = store.getState(); */
/* let me = dependencies |. driverJSGet |. getDriver(2); */