let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image = Css.(style([width(px(46))]));

  let imageContainer = (~communityColor) =>
    Css.(
      style([
        display(`flex),
        justifyContent(center),
        alignItems(center),
        height(px(80)),
        width(px(80)),
        borderRadius(px(4)),
        unsafe("border", {j|1px solid $communityColor|j}),
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
          textAlign(center),
          minWidth(px(262)),
          maxHeight(px(heightProp)),
          selector(" a", [display(`block), height(`percent(100.0))]),
        ])
      )
    | None =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(center),
          minWidth(px(262)),
        ])
      )
    };

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(center),
        height(px(50)),
        paddingLeft(px(14)),
        paddingRight(px(14)),
      ])
    );

  let content =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        justifyContent(`flexStart),
        flexDirection(column),
        unsafe("padding", "11px 14px 11px 14px"),
        flex(1),
        height(`percent(100.0)),
      ])
    );
};

let cardContent =
    (
      ~heading,
      ~communityDescription,
      ~communityName,
      ~communityColor,
      ~communityLogo,
    ) =>
  <>
    <div className=Styles.content>
      <Label text=heading />
      {
        switch (communityLogo) {
        | Some(string) =>
          <div className={Styles.imageContainer(~communityColor)}>
            <img className=Styles.image src=string />
          </div>
        | None => ReasonReact.null
        }
      }
      <Heading text=communityName />
      <Paragraph text=communityDescription />
    </div>
  </>;

let make =
    (
      ~heading="community",
      ~communityName,
      ~communityDescription,
      ~followers,
      ~articles,
      ~views,
      ~communityLogo=?,
      ~communityColor=?,
      ~changeRoute=?,
      ~cardHeight=?,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        className={Styles.container(~heightProp=cardHeight)}
        onClick={
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute({j|/community/$communityName|j})
            | None => ()
            }
        }>
        {
          switch (linkComponent) {
          | Some(linkComponent) =>
            linkComponent(
              cardContent(
                ~heading,
                ~communityDescription,
                ~communityName,
                ~communityColor,
                ~communityLogo,
              ),
            )
          | None =>
            cardContent(
              ~heading,
              ~communityDescription,
              ~communityName,
              ~communityColor,
              ~communityLogo,
            )
          }
        }
        <Separator marginX=14 marginY=0 direction="horizontal" />
        <div className=Styles.footer>
          <CardCounter value=articles label="Articles" />
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  communityName: string,
  communityDescription: string,
  followers: string,
  articles: string,
  views: string,
  communityLogo: string,
  changeRoute: string => unit,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  cardHeight: int,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~heading=jsProps->headingGet,
      ~communityName=jsProps->communityNameGet,
      ~communityDescription=jsProps->communityDescriptionGet,
      ~followers=jsProps->followersGet,
      ~articles=jsProps->articlesGet,
      ~views=jsProps->viewsGet,
      ~cardHeight=jsProps->cardHeightGet,
      ~communityLogo=jsProps->communityLogoGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );