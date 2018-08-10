let component = ReasonReact.statelessComponent("UserWidgetSmall");

module Styles = {
  let container =
    Css.(style([display(`flex), flexDirection(row), alignItems(center)]));

  let image =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginRight(px(8)),
      ])
    );

  let baseUsernameStyle =
    Css.[
      fontSize(px(14)),
      fontWeight(700),
      overflow(hidden),
      maxWidth(px(200)),
    ];

  let username = pageType =>
    switch (pageType) {
    | Some(_pageType) => Css.style(baseUsernameStyle)
    | None =>
      Css.(
        style(
          List.append(
            [selector(":hover", [color(hex("0BA986"))])],
            baseUsernameStyle,
          ),
        )
      )
    };
};

let make = (~username, ~profileImage, ~pageType, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <img className=Styles.image src=profileImage />
      <span className=(Styles.username(pageType))>
        (ReasonReact.string(username))
      </span>
    </div>,
};