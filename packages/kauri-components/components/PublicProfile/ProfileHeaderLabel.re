open Vrroom;
let component = ReasonReact.statelessComponent("ProfileHeaderLabel");

module Styles = {
  open Css;
  let header =
    [%css
      {|
      {
        color: #FFFFFF;
        font-size: 11px;
        font-weight: 300;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
      }
      |}
    ]
    |. style;
};

let make = (~header, _children) => {
  ...component,
  render: _self =>
    <span className=Styles.header>
      (header |. String.uppercase |. text)
    </span>,
};

[@bs.deriving abstract]
type jsProps = {header: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~header=jsProps |. headerGet, [||])
  );