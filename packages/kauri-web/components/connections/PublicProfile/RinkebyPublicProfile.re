let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let default = (a, b) =>
  switch (b) {
  | None => a
  | Some(b) => b
  };

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
        unsafe("padding", "2.5em calc((100vw - 1280px) / 2)"),
        paddingBottom(px(0)),
      ])
    );
  let sectionTitle =
    Css.([%css {|
  {
      width: 100%;
      text-align: center;
}
|}])
    |> Css.style;
};

let getArticleUsername = article =>
  article
  |? (article => article##user)
  |? (user => user##username)
  |> default(
       article
       |? (article => article##user)
       |? (user => user##user_id)
       |> default("Unknown Writer"),
     );

let getArticleDateUpdated = article =>
  article
  |? (article => article##date_updated)
  |? (date_updated => Js.Json.decodeString(date_updated))
  |> default("")
  |> MomentRe.moment
  |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)));

let component = ReasonReact.statelessComponent("RinkebyPublicProfile");

let renderArticleCards = (~response, ~routeChangeAction) =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(article =>
         <ArticleCard
           articleId=(article |? (x => x##article_id) |> default(""))
           articleVersion=(
             article |? (x => x##article_version) |> default(1)
           )
           changeRoute=routeChangeAction
           key=(article |? (article => article##article_id) |> default(""))
           title=(article |? (article => article##subject) |> default(""))
           content=(article |? (article => article##text) |> default(""))
           date=(getArticleDateUpdated(article))
           username=(getArticleUsername(article))
         />
       )
    |. ReasonReact.array
  | None => <p> ("No articles found boo" |. ReasonReact.string) </p>
  };

let getArticleCount = response =>
  response##searchArticles
  |? (x => x##content)
  |> default([||])
  |> Array.length;

let make = (~userId, ~routeChangeAction, _children) => {
  ...component,
  render: _self => {
    open Article_Queries;
    let articlesQuery = SearchPersonalArticles.make(~userId, ());
    <SearchPersonalArticlesQuery variables=articlesQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> (ReasonReact.string("Loading")) </div>
             | Error(error) =>
               <div> (ReasonReact.string(error##message)) </div>
             | Data(response) =>
               <div className=Styles.container>
                 <section className=Styles.header>
                   <ProfileAvatar
                     username="SOON (TM)"
                     pageType=RinkebyPublicProfile
                   />
                   <StatisticsContainer
                     statistics=[|
                       {
                         "name": "Articles",
                         "count": getArticleCount(response),
                       },
                     |]
                   />
                 </section>
                 <section className=Styles.articlesContainer>
                   (renderArticleCards(~response, ~routeChangeAction))
                 </section>
               </div>
             }
         )
    </SearchPersonalArticlesQuery>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  userId: string,
  routeChangeAction: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~userId=jsProps |. userIdGet,
      ~routeChangeAction=jsProps |. routeChangeActionGet,
      [||],
    )
  );