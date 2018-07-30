let component = ReasonReact.statelessComponent("SocialWebsites");

module Styles = {
  open Css;
  let container =
    [%css
      {|
      {
        display: flexBox;
        margin-bottom: 23px;
      }
      > * {
        margin-right: 5px;
      }
      |}
    ]
    |. style;
};

let make = children => {
  ...component,
  render: _self =>
    <div className=Styles.container> (children |. ReasonReact.array) </div>,
};

[@bs.deriving abstract]
type jsProps = {children: array(ReasonReact.reactElement)};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(jsProps |. childrenGet)
  );