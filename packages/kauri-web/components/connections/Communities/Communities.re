[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";
[@bs.module "../../../routes"]
external linkComponent: Link.linkComponent = "Link";

let component = ReasonReact.statelessComponent("Communities");

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

let renderCommunitiyCards = (~communities) =>
  communities
  ->Belt.Array.map(community => {
      let description =
        ThemeConfig.getCommunityConfig(themeConfig, community)
        |> ThemeConfig.descriptionGet;
      open Article_Queries;

      let articlesCountQuery =
        CommunityArticlesCount.make(~category=community, ());

      <CommunityArticlesCountQuery
        key=community variables=articlesCountQuery##variables>
        ...{
             ({result}) =>
               switch (result) {
               | Loading => <Loading />
               | Error(error) =>
                 <div> {ReasonReact.string(error##message)} </div>
               | Data(response) =>
                 let totalArticles =
                   response->Article_Resource.articlesCountGet->string_of_int;
                 <CommunityCard
                   key=community
                   communityName=community
                   communityDescription=description
                   communityLogo={j|/static/images/$community/avatar.png|j}
                   articles=totalArticles
                   /* followers="1" */
                   /* views="1" */
                   linkComponent=(
                     childrenProps =>
                       <Link
                         useAnchorTag=true
                         linkComponent
                         route={j|/community/$community|j}>
                         ...childrenProps
                       </Link>
                   )
                 />;
               }
           }
      </CommunityArticlesCountQuery>;
    })
  |> ReasonReact.array;

let make = _children => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.communitiesContainer>
        {renderCommunitiyCards(~communities)}
      </div>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {routeChangeAction: string => unit};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));