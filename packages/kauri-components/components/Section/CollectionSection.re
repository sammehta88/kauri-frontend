[@bs.module]
external homepage : ReasonReact.reactClass =
  "../../components/containers/Collection/View";

[@bs.deriving abstract]
type user = {username: string};

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
      [%css
        {|
      {
          display: flexBox;
          flex-direction: column;
          width: 100%;
          text-align: center;
    }
    |}
      ]
    )
    |> Css.style;

  let section =
    Css.(
      [%css
        {|
  {
      width: 100%;
      display: flexBox;
      flex-direction: row;
      justify-content: center;
}
|}
      ]
    )
    |> Css.style;
};

let component = ReasonReact.statelessComponent("HomePageArticles");

let make =
    (~routeChangeAction, ~name, ~description="", ~articles=?, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <Paragraph text=name size=22 />
      <Paragraph text=description />
      (
        switch (articles) {
        | None => ReasonReact.null
        | Some(articles) =>
          Js.log(articles);
          <div className=Styles.section>
            (ReasonReact.string("Some Articles"))
          </div>;
        }
      )
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  name: string,
  description: string,
  articles: Js.Nullable.t(Js.Array.t(article)),
  routeChangeAction: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~routeChangeAction=jsProps |. routeChangeActionGet,
      ~name=jsProps |. nameGet,
      ~description=jsProps |. descriptionGet,
      ~articles=jsProps |> articlesGet |> Js.Nullable.toOption,
      [||],
    )
  );