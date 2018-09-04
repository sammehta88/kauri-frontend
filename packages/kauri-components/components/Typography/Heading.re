module Styles = {
  let baseHeading = (~sizeProp, ~colorProp) =>
    Css.[
      fontSize(px(sizeProp)),
      fontWeight(500),
      margin2(~v=px(6), ~h=px(0)),
      color(hex(colorProp)),
    ];
  let heading = (~colorProp, ~sizeProp) =>
    Css.style(baseHeading(~colorProp, ~sizeProp));
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~cardHeight=290, ~text, ~color="1E2428", ~size=20, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className={Styles.heading(~colorProp=color, ~sizeProp=size)}>
      {Paragraph.getLineClamp(~cardHeight, ~text) |> ReasonReact.string}
    </h3>,
};