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

  let imagePlaceholder =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginRight(px(8)),
        display(`flex),
        alignItems(`center),
        justifyContent(`center),
        background(white),
        textTransform(`capitalize),
      ])
    );

  let username = (~colorProp) =>
    /* font-size: 14px; font-weight: 700 */
    Css.(
      style([
        fontSize(px(14)),
        fontWeight(700),
        overflow(hidden),
        maxWidth(px(200)),
        color(hex(colorProp)),
        textTransform(`lowercase),
      ])
    );
};

let make = (~username, ~profileImage=?, ~color="#1E2428", _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      {
        switch (profileImage) {
        | Some(string) => <img className=Styles.image src=string />
        | _ =>
          <div className=Styles.imagePlaceholder>
            {ReasonReact.string(String.sub(username, 0, 1))}
          </div>
        }
      }
      <div className={Styles.username(~colorProp=color)}>
        {ReasonReact.string(username)}
      </div>
    </div>,
};