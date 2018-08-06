let component = ReasonReact.statelessComponent("ArticleAction");

module Styles = {
  let getWidth = text =>
    switch (text) {
    | "Share" => Css.px(75)
    | _ => Css.px(200)
    };
  let container = textProp =>
    Css.(
      style([
        display(flexBox),
        width(getWidth(textProp)),
        marginBottom(px(10)),
        alignItems(center),
        cursor(`pointer),
        selector("> :first-child", [marginRight(px(9))]),
        selector("> svg", [width(px(16)), height(px(16))]),
      ])
    );

  let text =
    Css.(
      [%css
        {|
          {
            font-size: 11px;
            font-weight: 500;
          }
      |}
      ]
      |> style
    );
};

let make = (~svgIcon, ~text, ~handleClick=?, _children) => {
  ...component,
  render: _self =>
    <div
      className=(Styles.container(text))
      onClick=(
        _event =>
          switch (handleClick) {
          | Some(handleClick) => handleClick()
          | None => ()
          }
      )>
      svgIcon
      <span className=Styles.text>
        (text |. String.uppercase |. Vrroom.text)
      </span>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  handleClick: unit => unit,
  svgIcon: ReasonReact.reactElement,
  text: string,
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (handleClick, svgIcon, text) =
        jsProps |. (handleClickGet, svgIconGet, textGet);
      make(~handleClick, ~svgIcon, ~text, [||]);
    },
  );