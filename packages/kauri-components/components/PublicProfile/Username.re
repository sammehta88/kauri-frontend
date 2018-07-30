open Vrroom;
let component = ReasonReact.statelessComponent("Username");

module Styles = {
  open Css;
  let username =
    [%css
      {|
      {
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
        margin-bottom: 5px;
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