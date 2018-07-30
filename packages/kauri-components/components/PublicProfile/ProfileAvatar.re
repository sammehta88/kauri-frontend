let component = ReasonReact.statelessComponent("ProfileAvatar");

module Styles = {
  open Css;
  let mask =
    [%css
      {|
      {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
      |}
    ]
    |. style;
};

let make = (~avatarURL, _children) => {
  ...component,
  render: _self => <img src=avatarURL className=Styles.mask />,
};

[@bs.deriving abstract]
type jsProps = {avatarURL: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~avatarURL=jsProps |. avatarURLGet, [||])
  );