let component = ReasonReact.statelessComponent("ProfileBadge");

module Styles = {
  open Css;
  let mask =
    [%css
      {|
      {
        background-color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      |}
    ]
    |. style;
};

let make = (~badgeURL, _children) => {
  ...component,
  render: _self => <img src=badgeURL className=Styles.mask />,
};

[@bs.deriving abstract]
type jsProps = {badgeURL: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~badgeURL=jsProps |. badgeURLGet, [||])
  );