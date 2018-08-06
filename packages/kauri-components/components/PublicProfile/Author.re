let component = ReasonReact.statelessComponent("Avatar");

module Styles = {
  let author =
    Css.(
      style([
        display(flexBox),
        alignItems(center),
        selector("> :last-child", [marginLeft(px(8))]),
      ])
    );
};

let make = (~username, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.author> <Avatar /> <Username username /> </div>,
};