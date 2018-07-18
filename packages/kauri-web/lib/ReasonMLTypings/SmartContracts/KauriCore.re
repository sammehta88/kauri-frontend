type deployedContract;

[@bs.deriving abstract]
type transactionOptions = {
  from: string,
  gas: int,
  gasPrice: int,
};

/*
 articleId,
 articleVersion,
 (requestId != null) ? requestId : "",
 this.utils.convertIpfsHash(contentHash),
 category,
 "0x"+account,
 sig.v,
 "0x"+sig.r.toString("hex"),
 "0x"+sig.s.toString("hex"),
 { from: account }
 */
[@bs.send]
external _publishArticle :
  (
    deployedContract,
    string,
    int,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    transactionOptions
  ) =>
  Js.Promise.t(string) =
  "publishArticle";

let publishArticle =
    (
      deployedContract,
      articleID,
      articleVersion,
      requestID,
      convertedIPFSHash,
      category,
      contributor,
      signatureV,
      signatureR,
      signatureS,
      account,
      gasPrice,
    ) => {
  let transactionOptions =
    transactionOptions(~from=account, ~gas=250000, ~gasPrice);
  _publishArticle(
    deployedContract,
    articleID,
    articleVersion,
    requestID,
    convertedIPFSHash,
    category,
    contributor,
    signatureV,
    signatureR,
    signatureS,
    transactionOptions,
  );
};