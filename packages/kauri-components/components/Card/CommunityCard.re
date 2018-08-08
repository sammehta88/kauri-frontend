let component = ReasonReact.statelessComponent("CommunityCard");

module Styles = {
  let image =
    Css.(style([height(px(80)), width(px(80)), borderRadius(px(4))]));

  let container =
    Css.(
      style([
        unsafe("padding", "11px 14px 11px 14px"),
        display(`flex),
        flexDirection(column),
        flex(1),
        textAlign(center),
      ])
    );

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(spaceBetween),
      ])
    );

  let content =
    Css.(
      style([
        display(`flex),
        alignItems(center),
        justifyContent(center),
        flexDirection(column),
        padding(px(7)),
        flex(1),
      ])
    );
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
          <CardCounter value=followers label="Followers" />
          <CardCounter value=articles label="Articles" />
          <CardCounter value=views label="Views" />
        </div>
      </div>
    </BaseCard>,
};