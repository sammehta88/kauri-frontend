module Styles = {
  let trimMultiline =
    Css.[
      unsafe("display", "-webkit-box"),
      unsafe("WebkitBoxOrient", "vertical"),
      overflow(`hidden),
    ];

  let baseHeading = (~sizeProp, ~colorProp) =>
    Css.[
      fontSize(px(sizeProp)),
      fontWeight(500),
      margin2(~v=px(6), ~h=px(0)),
      color(hex(colorProp)),
      textTransform(capitalize),
    ];
  let heading = (~colorProp, ~sizeProp, ~lineClamp) =>
    Css.(
      style(
        lineClamp
        ->Belt.Option.mapWithDefault(baseHeading(~colorProp, ~sizeProp), _ =>
            List.append(trimMultiline, baseHeading(~colorProp, ~sizeProp))
          ),
      )
    );
};
let component = ReasonReact.statelessComponent("Heading");
let make = (~lineClamp=?, ~text, ~color="1E2428", ~size=20, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <h3
      className={Styles.heading(~colorProp=color, ~sizeProp=size, ~lineClamp)}
      style=
        lineClamp
        ->Belt.Option.mapWithDefault(ReactDOMRe.Style.make(), lineClamp =>
            ReactDOMRe.Style.unsafeAddProp(
              ReactDOMRe.Style.make(),
              "WebkitLineClamp",
              lineClamp->string_of_int,
            )
          )>
      {ReasonReact.string(text)}
    </h3>,
};