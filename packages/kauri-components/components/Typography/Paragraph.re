let component = ReasonReact.statelessComponent("Paragraph");

module Styles = {
  let baseParagraph = (~colorProp, ~sizeProp) =>
    Css.[
      fontSize(px(sizeProp)),
      margin2(~v=px(10), ~h=px(0)),
      fontWeight(400),
      color(hex(colorProp)),
    ];

  let trimMultiline = (~lineClamp) =>
    Css.[
      unsafe("display", "-webkit-box"),
      unsafe("-webkit-box-orient", "vertical"),
      overflow(`hidden),
    ];
  let paragraph = (~colorProp, ~sizeProp, ~lineClamp) =>
    Css.(
      style(
        lineClamp
        ->Belt.Option.mapWithDefault(
            baseParagraph(~colorProp, ~sizeProp), lineClamp =>
            List.append(
              trimMultiline(~lineClamp),
              baseParagraph(~colorProp, ~sizeProp),
            )
          ),
      )
    );
};

let make = (~lineClamp=?, ~text, ~color="1E2428", ~size=14, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div
      className={
        Styles.paragraph(~colorProp=color, ~sizeProp=size, ~lineClamp)
      }
      style=
        lineClamp
        ->Belt.Option.mapWithDefault(ReactDOMRe.Style.make(), lineClamp =>
            ReactDOMRe.Style.unsafeAddProp(
              ReactDOMRe.Style.make(),
              "-webkit-line-clamp",
              lineClamp->string_of_int,
            )
          )>
      {ReasonReact.string(text)}
    </div>,
};