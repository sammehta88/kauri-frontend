let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image =
    Css.(
      style([
        height(px(30)),
        width(px(30)),
        borderRadius(px(15)),
        marginTop(px(6)),
      ])
    );

  let collectionCardContainer =
    Css.(
      style([
        unsafe("padding", "11px 14px 11px 14px"),
        display(`flex),
        flexDirection(column),
        flex(1),
        textAlign(center),
        minWidth(px(262)),
      ])
    );

  let collectionCardFooter =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(center),
        padding2(~v=px(4), ~h=px(14)),
      ])
    );

  let collectionCardContent =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        justifyContent(center),
        flexDirection(column),
        unsafe("padding", "7px 7px 0px 7px"),
        flex(1),
      ])
    );
};

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      /* ~upvotes, */
      ~articles,
      /* ~followers, */
      ~lastUpdated=?,
      ~curatorImage=?,
      ~changeRoute=?,
      ~collectionId: string,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        onClick=(
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute({j|/collection/$collectionId|j})
            | None => ()
            }
        )
        className=Styles.collectionCardContainer>
        <Label text=heading />
        <div className=Styles.collectionCardContent>
          <Heading text=collectionName />
          <Paragraph text=collectionDescription />
          <img
            className=Styles.image
            src=(
              switch (curatorImage) {
              | Some(image) => image
              | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
              }
            )
          />
          (
            switch (lastUpdated) {
            | Some(string) => <Label text=string />
            | None => ReasonReact.null
            }
          )
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.collectionCardFooter>
          /* <CardCounter value=upvotes label="upvotes" /> */
           <CardCounter value=articles label="Articles" /> </div>
      </div>
    </BaseCard>,
  /* <CardCounter value=followers label="Followers" /> */
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  collectionName: string,
  collectionDescription: string,
  collectionId: string,
  /* upvotes: string|int, */
  articles: string,
  /* followers: string|int, */
  lastUpdated: string,
  /* curatorImage: string */
  changeRoute: string => unit,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps->changeRouteGet,
      ~heading=jsProps->headingGet,
      ~collectionName=jsProps->collectionNameGet,
      ~articles=jsProps->articlesGet,
      ~lastUpdated=jsProps->lastUpdatedGet,
      ~collectionId=jsProps->collectionIdGet,
      ~collectionDescription=jsProps->collectionDescriptionGet,
      [||],
    )
  );