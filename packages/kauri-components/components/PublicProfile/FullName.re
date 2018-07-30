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
        font-weight: 300;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
      }
      |}
    ]
    |. style;
};

let make = (~fullName, _children) => {
  ...component,
  render: _self => <span className=Styles.fullName> (fullName |. text) </span>,
};

[@bs.deriving abstract]
type jsProps = {fullName: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~fullName=jsProps |. fullNameGet, [||])
  );