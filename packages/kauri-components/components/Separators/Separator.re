let component = ReasonReact.statelessComponent("HorizontalSeparator");

module Styles = {
  let horizontal =
    Css.(
      [%css
        {|
        {
            height: 2px;
            background: #f2f2f2;
            width: 100%;
        }
        |}
      ]
    )
    |> Css.style;
};

let make = _children => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => <div className=Styles.horizontal />,
};