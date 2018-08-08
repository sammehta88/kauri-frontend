let component = ReasonReact.statelessComponent("UserWidgetSmall");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        unsafe("margin", "10px 0px 10px 0px"),
      ])
    );

  let image =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginRight(px(8)),
      ])
    );

  let username =
    /* font-size: 14px; font-weight: 700 */
    Css.(
      style([
        fontSize(px(14)),
        fontWeight(700),
        overflow(hidden),
        maxWidth(px(200)),
      ])
    );
};

let make = (~username, ~profileImage, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <img className=Styles.image src=profileImage />
      <div className=Styles.username> (ReasonReact.string(username)) </div>
    </div>,
};