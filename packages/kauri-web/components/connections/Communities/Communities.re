open Infix_Utilities;

[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";

module Styles = {
  let container =
    Css.(style([unsafe("padding", "30px calc((100vw - 1280px) / 2)")]));

  let communitiesContainer =
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
      <div className=Styles.communitiesContainer>
        (renderCommunitiyCards(~communities, ~routeChangeAction))
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~routeChangeAction=jsProps->routeChangeActionGet, [||])
  );