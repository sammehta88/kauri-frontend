[@bs.module "../../../lib/theme-config.js"]
external themeConfig: ThemeConfig.themeConfig = "default";
[@bs.module "../../../lib/theme-config.js"]
external communities: ThemeConfig.communities = "categories";
let component = ReasonReact.statelessComponent("Community");

let make =
    (
      ~communityName,
      ~followers,
      ~views,
      ~communityLogo,
      ~changeRoute,
      ~cardHeight,
      _children,
    ) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let articlesCountQuery =
      CommunityArticlesCount.make(~category=communityName, ());
    <CommunityArticlesCountQuery variables=articlesCountQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <Loading />
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               let articles =
                 response->Article_Resource.articlesCountGet |> string_of_int;
               let (description, primaryColor) =
                 ThemeConfig.getCommunityConfig(themeConfig, communityName)
                 ->ThemeConfig.(descriptionGet, primaryColorGet);
               <CommunityCard
                 communityName
                 communityDescription=description
                 followers
                 articles
                 views
                 communityLogo
                 changeRoute
                 cardHeight
                 communityColor=primaryColor
               />;
             }
         )
    </CommunityArticlesCountQuery>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  followers: string,
  articles: string,
  views: string,
  communityLogo: string,
  changeRoute: string => unit,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~communityName=jsProps->communityNameGet,
      ~followers=jsProps->followersGet,
      ~views=jsProps->viewsGet,
      ~communityLogo=jsProps->communityLogoGet,
      ~changeRoute=jsProps->changeRouteGet,
      ~cardHeight=jsProps->cardHeightGet,
      [||],
    )
  );