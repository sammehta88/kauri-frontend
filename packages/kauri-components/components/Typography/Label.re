
let component = ReasonReact.statelessComponent("Heading");

module Styles = {
    let heading =
      Css.(
        [%css
          {|
          {
              font-size: 0.7em;
              text-transform: uppercase;
              font-weight: 600;
              line-height: 1.6;
              margin: 10px;
        }
        |}
        ]
      )
      |> Css.style;
  };
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => <label className=Styles.heading>{ReasonReact.string(text)}</label>
};