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
      style([
        padding2(~v=px(11), ~h=px(14)),
        flex(1),
        overflow(hidden),
        selector("> a > div", [height(`percent(100.0))]),
      ])
    );
};

let cardContent = (~title, ~content) =>
  <>
    <Heading text=title />
    {
      content->(String.sub(0, 2))->(String.contains('{')) ?
        [%raw
          {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content }, type: 'article card' }, null);
                    }
                  })()
                |}
        ] :
        <Paragraph text=content />
    }
  </>;

let publicProfile = (~pageType, ~username, ~userId, ~profileImage) =>
  <UserWidgetSmall
    pageType
    username=
      username
      ->Belt.Option.getWithDefault(
          String.sub(userId, 0, 11)
          ++ "..."
          ++ String.sub(userId, String.length(userId) - 13, 11),
        )
    profileImage={
      switch (profileImage) {
      | Some(image) => image
      | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
      }
    }
  />;

type pageType =
  | RinkebyPublicProfile
  | Collection;

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~articleId,
      ~articleVersion,
      ~imageURL=?,
      ~pageType=?,
      ~linkComponent=?,
      ~username,
      ~userId,
      ~profileImage=?,
      ~cardHeight=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className={Styles.container(~heightProp=cardHeight)}>
        {
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        }
        <div className=Styles.content>
          <Label text={"Posted " ++ date} />
          {
            switch (linkComponent) {
            | Some(linkComponent) =>
              linkComponent(
                cardContent(~title, ~content),
                {j|/article/$articleId/v$articleVersion|j},
              )
            | None => cardContent(~title, ~content)
            }
          }
          {
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          }
        </div>
        <Separator marginX=14 marginY=0 direction="horizontal" />
        <div className=Styles.footer>
          {
            switch (linkComponent, pageType) {
            | (Some(linkComponent), None) =>
              linkComponent(
                publicProfile(~pageType, ~username, ~userId, ~profileImage),
                {j|/public-profile/$userId|j},
              )
            | (Some(_), Some(_pageType)) =>
              publicProfile(~pageType, ~username, ~userId, ~profileImage)
            | (None, None) =>
              publicProfile(~pageType, ~username, ~userId, ~profileImage)
            | (None, Some(_)) =>
              publicProfile(~pageType, ~username, ~userId, ~profileImage)
            }
          }
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  article,
  date: string,
  title: string,
  articleId: string,
  articleVersion: string,
  content: string,
  linkComponent:
    (ReasonReact.reactElement, string) => ReasonReact.reactElement,
  username: Js.Nullable.t(string),
  userId: string,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~articleId=jsProps->articleIdGet,
      ~articleVersion=jsProps->articleVersionGet,
      ~date=jsProps->dateGet,
      ~title=jsProps->titleGet,
      ~content=jsProps->contentGet,
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );