let component = ReasonReact.statelessComponent("CommunityAvatar");

module Container =
  Styled.Div({
    type pageType = unit;
    let displayName = "CommunityProfileContainer";

    let style = _ =>
      Css.[
        display(`flex),
        alignItems(center),
        justifyContent(center),
        flexDirection(column),
        selector("> :first-child", [marginBottom(px(10))]),
        selector("> :nth-child(2)", [marginBottom(px(5))]),
        selector("> :nth-child(3)", [marginBottom(px(17))]),
      ];
  });

module CommunityName =
  Styled.H2({
    type pageType = unit;
    let displayName = "CommunityName";

    let style = _ =>
      Css.[
        color(white),
        fontSize(px(20)),
        fontWeight(500),
        margin(`zero),
      ];
  });

module CommunityWebsite =
  Styled.A({
    type pageType = unit;
    let displayName = "CommunityName";

    let style = _ =>
      Css.[
        color(white),
        fontSize(px(12)),
        fontWeight(700),
        textDecoration(`none),
        selector(":hover", [color(hex("0BA986"))]),
      ];
  });

let getCommunity = community =>
  switch (community) {
  | "metamask" => "MetaMask"
  | community => community->String.capitalize
  };

let stripWebsite = website => (website |> Js.String.split("://"))[1];
let assembleShareWebsiteURL = (~community, ~hostName) => {
  let hostName = Js.String.replace("api.", "", hostName);
    {j|https://$hostName/community/$community|j};
  };

let make = (~community, ~website, ~hostName, _children) => {
  ...component,
  render: _self =>
    <Container>
      <CommunityAvatar community />
      <CommunityName>
        community->getCommunity->ReasonReact.string
      </CommunityName>
      <CommunityWebsite href=website>
        website->stripWebsite->ReasonReact.string
      </CommunityWebsite>
      <ShareArticle
        pageType=CommunityProfile
        url={assembleShareWebsiteURL(~community, ~hostName)}
        title=community->String.capitalize
      />
    </Container>,
};
