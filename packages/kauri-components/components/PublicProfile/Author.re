let component = ReasonReact.statelessComponent("Avatar");

type pageType =
  | SubmittingArticle
  | Default;

let getPageType = pageType =>
  switch (pageType) {
  | "SubmittingArticle" => SubmittingArticle
  | _ => Default
  };

let getCursor = pageType =>
  switch (pageType) {
  | Some(pageType) =>
    switch (getPageType(pageType)) {
    | SubmittingArticle => `default
    | _ => `pointer
    }
  | None => `pointer
  };

module Styles = {
  let author = pageType =>
    Css.(
      style([
        display(flexBox),
        alignItems(center),
        cursor(getCursor(pageType)),
        selector("> :last-child", [marginLeft(px(8))]),
      ])
    );
};

let make = (~userId, ~username, ~pageType, ~routeChangeAction=?, _children) => {
  ...component,
  render: _self =>
    <div
      className=(Styles.author(pageType))
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