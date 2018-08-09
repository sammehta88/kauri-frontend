let component = ReasonReact.statelessComponent("BaseCard");

module Styles = {
  let card =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        minHeight(px(270)),
        width(px(290)),
        borderRadius(px(4)),
        backgroundColor(hex("FFFFFF")),
        cursor(`pointer),
        unsafe("boxShadow", "0 0 4px 0 rgba(0,0,0,0.11)"),
        transitionProperty("all"),
        transitionDuration(300),
        margin(px(15)),
      ])
    );
};

let make = children => {
  ...component,
  render: _self => <div className=Styles.card> ...children </div>,
};