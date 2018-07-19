let component = ReasonReact.statelessComponent("ArticleCard");

module Styles = {
  let card =
    Css.(
      [%css
        {|
        {
          display: flexBox;
          flex-direction: column;
          padding-top: 11px;
          padding-bottom: 11px;
          border-radius: 4px;
          box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.11);
          background: rgb(255, 255, 255);
      }
      |}
      ]
    )
    |> Css.style;
};

let make = _children => {
  ...component,
  render: _self =>
    <BaseCard>
      <Label text="Posted 3 June 2018 " />
      <Heading text="This should be a two line heading" />
      <Paragraph
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <Separator />
    </BaseCard>,
};