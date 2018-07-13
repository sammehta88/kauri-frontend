type apolloClient;

type smartContracts;

type web3;

type fetch;

type apolloSubscriber = string => Js.Promise.t(string);

type web3PersonalSign;

type getGasPrice;

type driverJS;

/* [@bs.send] external getDriver : (driverJS, int) => unit = ""; */
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