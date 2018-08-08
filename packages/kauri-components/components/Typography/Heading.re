module Styles = {
  let heading =
    Css.(
      style([
        fontSize(px(20)),
        fontWeight(600),
        margin2(~v=px(6), ~h=px(0)),
      ])
    );
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3 className=Styles.heading> (ReasonReact.string(text)) </h3>,
};