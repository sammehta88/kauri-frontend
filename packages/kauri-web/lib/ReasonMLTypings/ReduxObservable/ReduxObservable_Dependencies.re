type apolloClient;

type smartContracts;

type web3;

type fetch;

type apolloSubscriber;

type web3PersonalSign;

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
  getGasPrice,
  driverJS,
};

[@bs.splice] [@bs.send]
external apolloSubscriber : (dependencies, array(string)) => unit = "";