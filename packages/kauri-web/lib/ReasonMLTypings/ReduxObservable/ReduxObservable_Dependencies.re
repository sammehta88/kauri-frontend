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