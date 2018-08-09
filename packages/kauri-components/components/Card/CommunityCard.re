let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image =
    Css.(
      [%css
        {|
      {
        height: 80px;
        width: 80px;
        border-radius: 4px;
    }
    |}
      ]
    )
    |> Css.style;

  let container =
    Css.(
      [%css
        {|
    {
      padding: 11px 14px 11px 14px;
      display: flexBox;
      flex-direction: column;
      flex: 1;
      text-align: center;
      min-width: 262px;
  }
  |}
      ]
    )
    |> Css.style;

  let footer =
    Css.(
      [%css
        {|{
          display: flexBox;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 4px 14px;
        }|}
      ]
    )
    |> Css.style;

  let content =
    Css.(
      [%css
        {|{
          display: flexBox;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 7px;
          flex: 1;
      }|}
      ]
    )
    |> Css.style;
};

let make =
    (
      ~heading="community",
      ~communityName,
      ~communityDescription,
      ~followers,
      ~articles,
      ~views,
      ~communityLogo=?,
      ~changeRoute=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className=Styles.container>
        <Label text=heading />
        <div className=Styles.content>
          (
            switch (communityLogo) {
            | Some(string) => <img className=Styles.image src=string />
            | None => ReasonReact.null
            }
          )
          <Heading text=communityName />
          <Paragraph text=communityDescription />
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.footer>
          /* <CardCounter value=followers label="Followers" /> */
           <CardCounter value=articles label="Articles" /> </div>
      </div>
    </BaseCard>,
  /* <CardCounter value=views label="Views" /> */
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
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~changeRoute=jsProps |. changeRouteGet,
      ~heading=jsProps |. headingGet,
      ~communityName=jsProps |. communityNameGet,
      ~communityDescription=jsProps |. communityDescriptionGet,
      ~followers=jsProps |. followersGet,
      ~articles=jsProps |. articlesGet,
      ~views=jsProps |. viewsGet,
      ~communityLogo=jsProps |. communityLogoGet,
      [||],
    )
  );