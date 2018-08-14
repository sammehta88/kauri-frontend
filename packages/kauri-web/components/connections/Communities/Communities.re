open Infix_Utilities;

[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";

module Styles = {
  let container = Css.(style([]));

  let header =
    Css.(
      style([
        height(px(190)),
        backgroundColor(hex("1E2428")),
        display(`flex),
        alignItems(center),
        justifyContent(spaceBetween),
        unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
        selector("> :last-child", [marginRight(px(136))]),
      ])
    );
  let articlesContainer =
    Css.(
      style([
        display(flexBox),
        flexDirection(row),
        justifyContent(center),
        flex(1),
        flexWrap(wrap),
        paddingBottom(px(0)),
      ])
    );
  let sectionTitle =
    Css.(style([width(`percent(100.0)), textAlign(center)]));
};

let component = ReasonReact.statelessComponent("Communities");

let renderCommunitiyCards = (~communities, ~routeChangeAction) =>
  communities
  ->Belt.Array.map(
      community => {
        let description =
          ThemeConfig.getCommunityConfig(themeConfig, community)
          ->ThemeConfig.descriptionGet;
        /* Article_Queries.(getCommunityArticlesCount) */
        <CommunityCard
          key=community
          communityName=community
          communityDescription=description
          changeRoute=routeChangeAction
          articles="1"
          followers="1"
          views="1"
        />;
      },
    )
  ->ReasonReact.array;

let make = (~routeChangeAction, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      (renderCommunitiyCards(~communities, ~routeChangeAction))
    </div>,
};

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps->routeChangeActionGet, [||])
  );