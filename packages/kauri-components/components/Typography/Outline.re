module Styles = {
  let container = Css.([%css {| { width: 300px; } |}]) |> Css.style;
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
let component = ReasonReact.statelessComponent("Outline");
let make = (~headings, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=Styles.container>
      <OutlineHeader />
      <OutlineHeadings headings />
      <Separator direction="horizontal" color=LightGray />
    </div>,
};