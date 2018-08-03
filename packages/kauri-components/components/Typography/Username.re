let component = ReasonReact.statelessComponent("Username");

module Styles = {
  let username =
    Css.(
      [%css
        {|
          {
            font-size: 12px;
            font-weight: 700;
            color: #1E2428;
        }
        |}
      ]
    )
    |> Css.style;
};
let make = (~text, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <span className=Styles.username> (ReasonReact.string(text)) </span>,
};