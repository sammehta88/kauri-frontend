let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let paragraph =
    Css.(style([fontSize(px(14)), margin2(~v=px(10), ~h=px(0))]));
};
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=Styles.paragraph> (ReasonReact.string(text)) </div>,
};