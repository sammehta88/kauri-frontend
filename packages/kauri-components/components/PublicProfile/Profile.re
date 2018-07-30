module Container = {
  let component = ReasonReact.statelessComponent("ProfileContainer");

  module Styles = {
    open Css;
    let container =
      [%css
        {|
      {
        display: flexBox;
      }
      > :first-child {
        margin-right: 20px;
      }
      |}
      ]
      |. style;
  };

  let make = children => {
    ...component,
    render: _self =>
      <section className=Styles.container>
        (children |. ReasonReact.array)
      </section>,
  };

  [@bs.deriving abstract]
  type jsProps = {children: array(ReasonReact.reactElement)};

  let default =
    ReasonReact.wrapReasonForJs(~component, jsProps =>
      make(jsProps |. childrenGet)
    );
};

module Metadata = {
  let component = ReasonReact.statelessComponent("ProfileMetaData");

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
};