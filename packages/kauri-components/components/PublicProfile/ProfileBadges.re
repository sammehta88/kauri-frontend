open Vrroom;
let component = ReasonReact.statelessComponent("ProfileBadges");

module Styles = {
  open Css;
  let container =
    [%css
      {|
      {
        display: flexBox;
        flex-direction: column;
      }
      |}
    ]
    |. style;

  let badgesContainer =
    [%css
      {|
    {
      display: flexBox;
      flex-direction: row;
      margin-top: 11px;
    }
    > img {
      margin-right: 10px;
    }
    |}
    ]
    |. style;
};

let make = (~header, children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <ProfileHeaderLabel header />
      <div className=Styles.badgesContainer>
        (children |. ReasonReact.array)
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  header: string,
  children: array(ReasonReact.reactElement),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~header=jsProps |. headerGet, jsProps |. childrenGet)
  );