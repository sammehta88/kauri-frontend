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

  let baseCollectionCardContainer =
    Css.[
      display(`flex),
      flexDirection(column),
      flex(1),
      textAlign(center),
      minWidth(px(262)),
    ];

  let collectionCardContainer = (~cardHeightProp) =>
    Css.(
      style(
        List.append(
          [maxHeight(px(cardHeightProp))],
          baseCollectionCardContainer,
        ),
      )
    );

  let collectionCardFooter = (~imageURL) =>
    Css.(
      style([
        display(`flex),
        flexDirection(column),
        alignItems(center),
        justifyContent(center),
        height(px(imageURL->Belt.Option.mapWithDefault(48, _ => 50))),
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
        flexDirection(`column),
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
        unsafe("padding", "17px 14px 7px 14px"),
        unsafe(
          "background",
          switch (image) {
          | Some(_) => "rgba(30,36,40,0.7)"
          | _ => "transparent"
          },
        ),
        selector("> a:first-child", [marginBottom(`auto)]),
      ])
    );

  let bottomCollectionCardContent =
    Css.(
      style([
        display(`flex),
        flexDirection(`column),
        alignItems(`center),
        selector("> :first-child", [marginBottom(px(11))]),
      ])
    );
};

let cardContent =
    (
      ~imageURL,
      ~heading,
      ~collectionName,
      ~collectionDescription,
      ~cardHeight,
    ) =>
  <>
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
      lineClamp={cardHeight > 290 ? 0 : 2}
      color={
        switch (imageURL) {
        | Some(_) => "FFFFFF"
        | None => "1E2428"
        }
      }
      text=collectionDescription
    />
  </>;

let publicProfile = (~imageURL, ~username, ~userId, ~profileImage) =>
  <UserWidgetSmall
    pageType=None
    color=imageURL->Belt.Option.mapWithDefault("1E2428", _ => "FFFFFF")
    username=
      username
      ->Belt.Option.getWithDefault(
          String.sub(userId, 0, 11)
          ++ "..."
          ++ String.sub(userId, String.length(userId) - 13, 11),
        )
  />;

let make =
    (
      ~heading="collection",
      ~collectionName,
      ~collectionDescription,
      ~articles,
      ~username,
      ~userId,
      ~lastUpdated=?,
      ~profileImage,
      ~changeRoute=?,
      ~collectionId: string,
      ~imageURL,
      ~cardHeight=290,
      ~linkComponent=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        className={Styles.collectionCardContainer(~cardHeightProp=cardHeight)}>
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
            {
              switch (linkComponent) {
              | Some(linkComponent) =>
                linkComponent(
                  cardContent(
                    ~imageURL,
                    ~heading,
                    ~collectionName,
                    ~cardHeight,
                    ~collectionDescription,
                  ),
                  {j|/collection/$collectionId|j},
                )
              | None =>
                cardContent(
                  ~imageURL,
                  ~heading,
                  ~collectionName,
                  ~cardHeight,
                  ~collectionDescription,
                )
              }
            }
            <div className=Styles.bottomCollectionCardContent>
              {
                switch (linkComponent) {
                | Some(linkComponent) =>
                  linkComponent(
                    publicProfile(
                      ~imageURL,
                      ~username,
                      ~userId,
                      ~profileImage,
                    ),
                    {j|/public-profile/$userId|j},
                  )
                | None =>
                  publicProfile(~imageURL, ~username, ~userId, ~profileImage)
                }
              }
              {
                switch (lastUpdated) {
                | Some(lastUpdated) =>
                  <Label
                    noMargin=true
                    text={
                      lastUpdated->String.lowercase
                      |> Js.String.includes("updated") ?
                        lastUpdated : "UPDATED " ++ lastUpdated
                    }
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
          {
            switch (imageURL) {
            | Some(_) => ReasonReact.null
            | None => <Separator marginX=14 marginY=0 direction="horizontal" />
            }
          }
        </div>
        <div className={Styles.collectionCardFooter(~imageURL)}>
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
  username: Js.Nullable.t(string),
  userId: string,
  articles: string,
  profileImage: Js.Nullable.t(string),
  lastUpdated: string,
  imageURL: Js.Nullable.t(string),
  changeRoute: string => unit,
  linkComponent:
    (ReasonReact.reactElement, string) => ReasonReact.reactElement,
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
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~profileImage=jsProps->profileImageGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~imageURL=jsProps->imageURLGet->Js.Nullable.toOption,
      ~cardHeight=jsProps->cardHeightGet,
      ~collectionDescription=jsProps->collectionDescriptionGet,
      ~linkComponent=jsProps->linkComponentGet,
      [||],
    )
  );