module FacebookShareButton = {
  [@bs.module "react-share"]
  external facebookShareButton : ReasonReact.reactClass =
    "FacebookShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    quote: string,
  };

  let make = (~url, ~quote, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=facebookShareButton,
      ~props=jsProps(~url, ~quote),
      children,
    );
};

module FacebookIcon = {
  [@bs.module "react-share"]
  external facebookShareButton : ReasonReact.reactClass = "FacebookIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=facebookShareButton,
      ~props={"size": 32, "round": true},
      children,
    );
};