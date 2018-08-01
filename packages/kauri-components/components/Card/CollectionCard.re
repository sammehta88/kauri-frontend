let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {

  let image =
    Css.(
      [%css
        {|
      {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        margin-top: 6px;
    }
    |}
      ]
    )
    |> Css.style;

  let container =
    Css.([%css {|
    {
      padding: 11px 14px 11px 14px;
      display: flexBox;
      flex-direction: column;
      flex: 1;
      text-align: center;
  }
  |}])
    |> Css.style;

  let footer =
    Css.(
      [%css
        {|{
          display: flexBox;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
          padding: 7px 7px 0px 7px;
          flex: 1;
      }|}
    ]
  )
  |> Css.style;
};

let make =
    (
        ~heading="collection",
        ~collectionName,
        ~collectionDescription,
        ~upvotes,
        ~articles,
        ~followers,
        ~lastUpdated=?,
        ~curatorImage=?,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div className=Styles.container>
        <Label text=heading />
        <div className=Styles.content>
            <Heading text=collectionName />
            <Paragraph text=collectionDescription />
            (
                switch (curatorImage) {
                | Some(string) => <img className=Styles.image src=string />
                | None => ReasonReact.null
                }
            )
            (
                switch (lastUpdated) {
                | Some(string) => <Label text=string />
                | None => ReasonReact.null
                }
            )
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.footer>
            <CardCounter value=upvotes label="upvotes" />
            <CardCounter value=articles label="Articles" />
            <CardCounter value=followers label="Followers" />
        </div>
      </div>
    </BaseCard>,
};