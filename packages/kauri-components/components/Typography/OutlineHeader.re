module Styles = {
  let heading =
    Css.(
      [%css
        {|
           {
              color: #1E2428;
              font-size: 11px;
              font-weight: 700;
            }
         |}
      ]
    )
    |> Css.style;
};
let component = ReasonReact.statelessComponent("OutlineHeading");
let make = (~text="Outline", _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=Styles.heading>
      (ReasonReact.string(text |. String.uppercase))
    </h3>,
};