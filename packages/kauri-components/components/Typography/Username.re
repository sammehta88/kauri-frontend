let component = ReasonReact.statelessComponent("Username");

module Styles = {
  let username =
    Css.(
      style([
        maxWidth(px(250)),
        overflow(hidden),
        textOverflow(ellipsis),
        fontSize(px(12)),
        fontWeight(700),
        color(hex("1E2428")),
      ])
    );
};
let make = (~username, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <span className=Styles.username> (ReasonReact.string(username)) </span>,
};