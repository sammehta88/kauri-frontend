module Styles = {
  let heading =
    Css.(
      [%css
        {|
           {
               font-size: 1.2em;
               text-transform: uppercase;
               font-weight: 600;
               line-height: 1.4;
               margin: 10px;
         }
         |}
      ]
    )
    |> Css.style;
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => <h3> (ReasonReact.string(text)) </h3>,
};