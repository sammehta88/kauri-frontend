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
          selector("> a:first-of-type", [height(`percent(100.0))]),
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
          selector("> a:first-of-type", [height(`percent(100.0))]),
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
      ~username,
      ~userId,
      ~collectionName,
      ~profileImage,
      ~collectionDescription,
      ~curatorImage,
      ~lastUpdated,
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
    profileImage={
      switch (profileImage) {
      | Some(image) => image
      | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
      }
    }
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
      ~curatorImage=?,
      ~profileImage,
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
      <div className={Styles.collectionCardContainer(~heightProp=cardHeight)}>
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
                    ~username,
                    ~userId,
                    ~collectionDescription,
                    ~profileImage,
                    ~curatorImage,
                    ~lastUpdated,
                  ),
                  {j|/collection/$collectionId|j},
                )
              | None =>
                cardContent(
                  ~imageURL,
                  ~heading,
                  ~username,
                  ~userId,
                  ~collectionName,
                  ~profileImage,
                  ~collectionDescription,
                  ~curatorImage,
                  ~lastUpdated,
                )
              }
            }
            {
              switch (linkComponent) {
              | Some(linkComponent) =>
                linkComponent(
                  publicProfile(~imageURL, ~username, ~userId, ~profileImage),
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
                  text={"UPDATED " ++ lastUpdated}
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
          {
            switch (imageURL) {
            | Some(_) => ReasonReact.null
            | None => <Separator marginX=14 marginY=0 direction="horizontal" />
            }
          }
        </div>
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