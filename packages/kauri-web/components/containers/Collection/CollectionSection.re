[@bs.module "../../../routes"]
external linkComponent: Link.linkComponent = "Link";

[@bs.deriving abstract]
type user = {
  username: Js.Nullable.t(string),
  user_id: string,
};

[@bs.deriving abstract]
type article = {
  article_id: string,
  date_created: string,
  subject: string,
  text: string,
  imageURL: string,
  user,
  profileImage: string,
  article_version: int,
};

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        width(`percent(100.0)),
        textAlign(center),
      ])
    );

  let section =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        flexDirection(row),
        justifyContent(center),
        flexWrap(`wrap),
      ])
    );
};

let component = ReasonReact.statelessComponent("CollectionSection");

let make = (~name, ~description="", ~articles, _children) => {
  ...component,
  render: _self =>
    switch (articles) {
    | None => ReasonReact.null
    | Some(articles) =>
      <div className=Styles.container>
        <Paragraph text=name size=22 />
        <Paragraph text=description />
        <div className=Styles.section>
          {
            Js.Array.map(
              article => {
                let (articleId, articleVersion) =
                  article->(article_idGet, article_versionGet);
                <ArticleCard
                  key=article->article_idGet
                  articleId
                  articleVersion
                  linkComponent={
                    (childrenProps, route) =>
                      <Link
                        useAnchorTag=true
                        linkComponent
                        toSlug={
                          route |> Js.String.includes("article") ?
                            Js.Nullable.return(article->subjectGet) :
                            Js.Nullable.null
                        }
                        route>
                        ...childrenProps
                      </Link>
                  }
                  title=article->subjectGet
                  content=article->textGet
                  cardHeight=400
                  imageURL=article->imageURLGet
                  date=
                    article
                    ->date_createdGet
                    ->MomentRe.moment
                    ->MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)))
                  username=article->userGet->usernameGet->Js.Nullable.toOption
                  userId=article->userGet->user_idGet
                />;
              },
              articles,
            )
            |> ReasonReact.array
          }
        </div>
      </div>
    },
};

[@bs.deriving abstract]
type jsProps = {
  name: string,
  description: string,
  articles: Js.Nullable.t(array(article)),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~name=jsProps->nameGet,
      ~description=jsProps->descriptionGet,
      ~articles=jsProps |> articlesGet |> Js.Nullable.toOption,
      [||],
    )
  );