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

  let collectionCardContainer = (~heightProp) =>
    switch (heightProp) {
    | Some(heightProp) =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(`left),
          minWidth(px(262)),
          maxHeight(px(heightProp)),
          selector(" a", [display(`flex), height(`percent(100.0))]),
        ])
      )
    | None =>
      Css.(
        style([
          display(`flex),
          flexDirection(column),
          flex(1),
          textAlign(`left),
          minWidth(px(262)),
          selector(" a", [display(`flex), height(`percent(100.0))]),
        ])
      )
    };

  let collectionCardFooter =
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(center),
        justifyContent(center),
        height(px(50)),
        paddingLeft(px(14)),
        paddingRight(px(14)),
      ])
    );

  let collectionCardContent = (~imageURL, ~colorProp) =>
    Css.(
      style([
        display(`flex),
        flex(1),
        color(hex(colorProp)),
        height(`percent(100.0)),
        backgroundSize(`cover),
        unsafe(
          "background",
          switch (imageURL) {
          | Some(_) => {j|url($imageURL) center center|j}
          | _ => "transparent"
          },
        ),
        position(relative),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
        overflow(hidden),
      ])
    );

  let darkLayer = (~image) =>
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        justifyContent(`flexStart),
        alignItems(`center),
        flexDirection(column),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
        flex(1),
        unsafe("padding", "11px 14px 11px 14px"),
        unsafe(
          "background",
          switch (image) {
          | Some(_) => "rgba(30,36,40,0.7)"
          | _ => "transparent"
          },
        ),
      ])
    );
};

let cardContent =
    (
      ~imageURL,
      ~heading,
      ~collectionName,
      ~collectionDescription,
      ~curatorImage,
      ~lastUpdated,
    ) =>
  <>
    <div
      className={
        Styles.collectionCardContent(
          ~imageURL,
          ~colorProp=
            switch (imageURL) {
            | Some(_) => "FFFFFF"
            | _ => "1E2428"
            },
        )
      }>
      <div className={Styles.darkLayer(~image=imageURL)}>
        <Label
          color={
            switch (imageURL) {
            | Some(_) => "FFFFFF"
            | None => "1E2428"
            }
          }
          text=heading
        />
        <Heading
          text=collectionName
          color={
            switch (imageURL) {
            | Some(_) => "FFFFFF"
            | None => "1E2428"
            }
          }
        />
        <Paragraph
          color={
            switch (imageURL) {
            | Some(_) => "FFFFFF"
            | None => "1E2428"
            }
          }
          text=collectionDescription
        />
        <img
          className=Styles.image
          src={
            switch (curatorImage) {
            | Some(image) => image
            | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
            }
          }
        />
        {
          switch (lastUpdated) {
          | Some(string) =>
            <Label
              text=string
              color={
                switch (imageURL) {
                | Some(_) => "FFFFFF"
                | None => "1E2428"
                }
              }
            />
          | None => ReasonReact.null
          }
        }
      </div>
    </div>
  </>;

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      ~articles,
      ~lastUpdated=?,
      ~curatorImage=?,
      ~changeRoute=?,
      ~collectionId: string,
      ~imageURL,
      ~cardHeight=?,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        onClick={
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute({j|/collection/$collectionId|j})
            | None => ()
            }
        }
        className={Styles.collectionCardContainer(~heightProp=cardHeight)}>
        {
          switch (linkComponent) {
          | Some(linkComponent) =>
            linkComponent(
              cardContent(
                ~imageURL,
                ~heading,
                ~collectionName,
                ~collectionDescription,
                ~curatorImage,
                ~lastUpdated,
              ),
            )
          | None =>
            cardContent(
              ~imageURL,
              ~heading,
              ~collectionName,
              ~collectionDescription,
              ~curatorImage,
              ~lastUpdated,
            )
          }
        }
        {
          switch (imageURL) {
          | Some(_) => ReasonReact.null
          | None => <Separator marginX=14 marginY=0 direction="horizontal" />
          }
        }
        <div className=Styles.collectionCardFooter>
          <CardCounter value=articles label="Articles" />
        </div>
      </div>
    </BaseCard>,
};

[@bs.deriving abstract]
type jsProps = {
  heading: string,
  collectionName: string,
  collectionDescription: string,
  collectionId: string,
  articles: string,
  lastUpdated: string,
  imageURL: Js.Nullable.t(string),
  changeRoute: string => unit,
  linkComponent: ReasonReact.reactElement => ReasonReact.reactElement,
  cardHeight: int,
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
      ~imageURL=jsProps->imageURLGet->Js.Nullable.toOption,
      ~cardHeight=jsProps->cardHeightGet,
      ~collectionDescription=jsProps->collectionDescriptionGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );