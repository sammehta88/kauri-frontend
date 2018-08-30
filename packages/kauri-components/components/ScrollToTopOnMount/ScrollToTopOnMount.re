open Vrroom;

[@bs.val] external scrollToTop: (int, int) => unit = "window.scrollTo";
let component = ReasonReact.statelessComponent("ScrollToTopOnMount");

module Styles = {
  let hey =
    Css.(style([background(blue), height(px(100)), width(px(100))]));
};

let make = _children => {
  ...component,
  didMount: _self => scrollToTop(0, 0),
  render: _self => <div className=Styles.hey />,
};

let default = ReasonReact.wrapReasonForJs(~component, () => make([||]));