open Vrroom;
let component = ReasonReact.statelessComponent("Blurb");

module Styles = {
  open Css;
  let blurb =
    [%css
      {|
      {
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 300;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;       }
      |}
    ]
    |. style;
};

let make = (~blurb, _children) => {
  ...component,
  render: _self => <span className=Styles.blurb> (blurb |. text) </span>,
};

[@bs.deriving abstract]
type jsProps = {blurb: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~blurb=jsProps |. blurbGet, [||])
  );