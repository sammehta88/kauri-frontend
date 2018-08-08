let component = ReasonReact.statelessComponent("Heading");

module Styles = {
  let label =
    Css.(
      style([
        fontSize(em(0.7)),
        textTransform(uppercase),
        fontWeight(600),
        lineHeight(1.6),
        unsafe("margin", "10px 0px 10px 0px"),
      ])
    );
};
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <label className=Styles.label> (ReasonReact.string(text)) </label>,
};