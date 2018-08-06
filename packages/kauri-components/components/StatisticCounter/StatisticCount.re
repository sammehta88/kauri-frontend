module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        flexDirection(`column),
        alignItems(`center),
        maxWidth(px(150)),
      ])
    );
  let count =
    Css.(
      style([
        color(hex("ffffff")),
        fontSize(px(20)),
        fontWeight(500),
        margin(px(0)),
        marginBottom(px(6)),
      ])
    );
  let statistic =
    Css.(
      style([color(hex("ffffff")), fontSize(px(11)), fontWeight(700)])
    );
};
let component = ReasonReact.statelessComponent("Heading");

let make = (~statistic, ~count, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    Vrroom.(
      <div className=Styles.container>
        <h3 className=Styles.count> (count |. text) </h3>
        <span className=Styles.statistic>
          (statistic |> String.uppercase |> text)
        </span>
      </div>
    ),
};