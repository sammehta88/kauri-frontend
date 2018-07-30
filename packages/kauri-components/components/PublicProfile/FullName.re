open Vrroom;
let component = ReasonReact.statelessComponent("FullName");

module Styles = {
  open Css;
  let fullName =
    [%css
      {|
      {
        color: #FFFFFF;
        font-size: 24px;
        font-weight: 500;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
        margin: 0;
        margin-bottom: 8px;
      }
      |}
    ]
    |. style;
};

let make = (~fullName, _children) => {
  ...component,
  render: _self => <h2 className=Styles.fullName> (fullName |. text) </h2>,
};

[@bs.deriving abstract]
type jsProps = {fullName: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~fullName=jsProps |. fullNameGet, [||])
  );