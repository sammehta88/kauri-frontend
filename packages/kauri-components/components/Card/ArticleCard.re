let component = ReasonReact.statelessComponent("ArticleCard");

type article = {
  date: string,
  title: string,
  content: string,
  imageURL: string,
  username: string,
  profileImage: string,
  articleVersion: int,
};

module Styles = {
  let image =
    Css.(
      style([
        height(px(170)),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
      ])
    );

  let container = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          maxHeight(px(heightProp)),
          minWidth(px(262)),
        ])
      )
    | None => Css.(style([display(`flex), flexDirection(column), flex(1)]))
    };

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(flexStart),
        justifyContent(center),
        height(px(50)),
        paddingLeft(px(14)),
        paddingRight(px(14)),
      ])
    );

  let content =
    Css.(
      style([padding2(~v=px(11), ~h=px(14)), flex(1), overflow(hidden)])
    );
};

type pageType =
  | RinkebyPublicProfile
  | Collection;

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~imageURL=?,
      ~pageType=?,
      ~username,
      ~userId,
      ~profileImage=?,
      ~changeRoute=?,
      ~articleId: string,
      ~articleVersion: int,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className=(Styles.container(~heightProp=cardHeight))>
        (
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        )
        <div className=Styles.content>
          <Label text=("Posted " ++ date) />
          <Link
            className=Css.[
              selector("> div:first-child", [height(`percent(100.0))]),
            ]
            removeHoverColor=true
            href={j|/article/$articleId/article-version/$articleVersion|j}
            routeChangeAction=changeRoute>
            <Heading text=title />
            (
              content->(String.sub(0, 2))->(String.contains('{')) ?
                [%raw
                  {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content$1 }, type: 'article card' }, null);
                    }
                  })()
                |}
                ] :
                <Paragraph text=content />
            )
          </Link>
          (
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          )
        </div>
        <Separator marginX=14 marginY=0 direction="horizontal" />
        <div className=Styles.footer>
          <Link
            removeHoverColor=true
            href={j|/public-profile/$userId|j}
            routeChangeAction=changeRoute>
            <UserWidgetSmall
              pageType
              username
              userId
              routeChangeAction=
                changeRoute->Belt.Option.getWithDefault(_ => ())
              profileImage=(
                switch (profileImage) {
                | Some(image) => image
                | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
                }
              )
            />
          </Link>
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  article,
  date: string,
  title: string,
  content: string,
  username: string,
  userId: string,
  articleId: string,
  articleVersion: int,
  cardHeight: int,
  changeRoute: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~date=jsProps->dateGet,
      ~title=jsProps->titleGet,
      ~content=jsProps->contentGet,
      ~username=jsProps->usernameGet,
      ~userId=jsProps->userIdGet,
      ~articleId=jsProps->articleIdGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~articleVersion=jsProps->articleVersionGet,
      [||],
    )
  );