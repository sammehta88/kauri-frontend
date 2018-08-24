module TwitterShareButton = {
  [@bs.module "react-share"]
  external twitterShareButton: ReasonReact.reactClass = "TwitterShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    title: string,
  };

  let make = (~url, ~title, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=twitterShareButton,
      ~props=jsProps(~url, ~title),
      children,
    );
};

module TwitterIcon = {
  [@bs.module "react-share"]
  external twitterIcon: ReasonReact.reactClass = "TwitterIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=twitterIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};

module LinkedinShareButton = {
  [@bs.module "react-share"]
  external linkedInShareButton: ReasonReact.reactClass = "LinkedinShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    title: string,
  };

  let make = (~title, ~url, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=linkedInShareButton,
      ~props=jsProps(~url, ~title),
      children,
    );
};

module LinkedinIcon = {
  [@bs.module "react-share"]
  external linkedInIcon: ReasonReact.reactClass = "LinkedinIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=linkedInIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};

module RedditShareButton = {
  [@bs.module "react-share"]
  external redditShareButton: ReasonReact.reactClass = "RedditShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    title: string,
  };

  let make = (~url, ~title, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=redditShareButton,
      ~props=jsProps(~url, ~title),
      children,
    );
};

module RedditIcon = {
  [@bs.module "react-share"]
  external redditIcon: ReasonReact.reactClass = "RedditIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=redditIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};

module PinterestShareButton = {
  [@bs.module "react-share"]
  external pinterestShareButton: ReasonReact.reactClass =
    "PinterestShareButton";

  [@bs.deriving abstract]
  type jsProps = {
    url: string,
    media: string,
    description: string,
  };

  let make = (~url, ~title, children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=pinterestShareButton,
      ~props=jsProps(~media=url, ~url, ~description=title),
      children,
    );
};

module PinterestIcon = {
  [@bs.module "react-share"]
  external pinterestIcon: ReasonReact.reactClass = "PinterestIcon";

  let make = children =>
    ReasonReact.wrapJsForReason(
      ~reactClass=pinterestIcon,
      ~props={"size": 26, "round": true},
      children,
    );
};