[@bs.module]
external homepage : ReasonReact.reactClass =
  "../../components/containers/Homepage/View";

[@bs.deriving abstract]
type jsProps = {
  userId: string,
  routeChangeAction: string => unit,
};
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
  let container =
    Css.(
      [%css
        {|
      {
          display: flexBox;
          flex-direction: row;
          justify-content: flex-start;
          padding: 10px;
          flex: 1;
          flex-wrap: wrap;
    }
    |}
      ]
    )
    |> Css.style;

  let sectionTitle =
    Css.([%css {|
  {
      width: 100%;
      text-align: center;
}
|}])
    |> Css.style;
};

let component = ReasonReact.statelessComponent("RinkebyPublicProfile");

let renderArticleCards = (~response, ~routeChangeAction) =>
  switch (response##searchArticles |? (x => x##content)) {
  | Some(content) =>
    content
    |> Js.Array.map(article =>
         <ArticleCard
           articleId=(article |? (x => x##article_id) |> default(""))
           articleVersion=(article |? (x => x##article_version) |> default(1))
           changeRoute=routeChangeAction
           key=(article |? (article => article##article_id) |> default(""))
           title=(article |? (article => article##subject) |> default(""))
           content=(article |? (article => article##text) |> default(""))
           date=(
             article
             |? (article => article##date_updated)
             |? (date_updated => Js.Json.decodeString(date_updated))
             |> default("")
             |> MomentRe.moment
             |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)))
           )
           username=(
             article
             |? (article => article##user)
             |? (user => user##username)
             |> default(
                  article
                  |? (article => article##user)
                  |? (user => user##user_id)
                  |> default("Unknown Writer"),
                )
           )
         />
       )
    |. ReasonReact.array
  | None => <p> ("No articles found boo" |. ReasonReact.string) </p>
  };

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
                 <h1 className=Styles.sectionTitle>
                   (ReasonReact.string("Latest Articles"))
                 </h1>
                 (renderArticleCards(~response, ~routeChangeAction))
               </div>
             }
         )
    </SearchPersonalArticlesQuery>;
  },
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~userId=jsProps |. userIdGet,
      ~routeChangeAction=jsProps |. routeChangeActionGet,
      [||],
    )
  );