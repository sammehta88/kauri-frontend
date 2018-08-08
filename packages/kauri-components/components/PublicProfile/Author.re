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

let make = (~userId, ~username, ~routeChangeAction=?, _children) => {
  ...component,
  render: _self =>
    <div
      className=Styles.author
      onClick=(
        _event =>
          switch (routeChangeAction) {
          | Some(routeChangeAction) =>
            routeChangeAction({j|/public-profile/$userId|j})
          | None => ()
          }
      )>
      <Avatar />
      <Username username pageType=Article />
    </div>,
};