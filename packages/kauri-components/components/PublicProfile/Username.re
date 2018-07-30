open Vrroom;
let component = ReasonReact.statelessComponent("Username");

module Styles = {
  open Css;
  let username =
    [%css
      {|
      {
        color: #fff;
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
       }
      |}
    ]
    |. style;
};

let make = (~username, _children) => {
  ...component,
  render: _self => <span className=Styles.username> (username |. text) </span>,
};

[@bs.deriving abstract]
type jsProps = {username: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~username=jsProps |. usernameGet, [||])
  );