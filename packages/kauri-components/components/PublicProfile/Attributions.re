let component = ReasonReact.statelessComponent("Attributions");

module Styles = {
  open Css;
  let container =
    [%css
      {|
      {
        display: flexBox;
      }
      > div {
        margin-right: 36px;
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