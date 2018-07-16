open ReduxObservable_Observable;
type apolloClient;

type smartContracts;

type web3;

type fetch;

type apolloSubscriber;

type web3PersonalSign;

type personalSign = string => Js.Promise.t(string);

type getGasPrice;

type driverJS;

/* [@bs.deriving abstract]
   type store = {dispatch: string => unit}; */

/* [@bs.send] external dispatch : (store, string) => unit = ""; */
/* [@bs.deriving abstract]
   type store = {dispatch: string => unit}; */
/* open ApolloClient; */
[@bs.deriving abstract]
type dependencies = {
  apolloClient: ApolloClient.generatedApolloClient,
  smartContracts,
  web3,
  fetch,
  apolloSubscriber,
  web3PersonalSign,
  personalSign,
  getGasPrice,
  driverJS,
};

[@bs.splice] [@bs.send]
external subscribeToOffchainEvent :
  (dependencies, array(string)) => Js.Promise.t(string) =
  "apolloSubscriber";