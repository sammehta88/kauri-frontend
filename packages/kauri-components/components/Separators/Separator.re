let component = ReasonReact.statelessComponent("Separator");

module Styles = {
  let horizontal = Css.[height(px(2)), width(`percent(100.0))];

  let vertical = Css.[width(px(2)), height(`percent(100.0))];

  let whiteColor = [Css.background(Css.hex("F2F2F2"))];
  let lightGrayColor = [Css.background(Css.hex("EBEBEB"))];
  let getMarginStyle = (marginY, marginX) =>
    switch (marginY, marginX) {
    | (None, Some(marginX)) =>
      Css.[
        paddingTop(px(0)),
        paddingBottom(px(0)),
        paddingRight(px(marginX)),
        paddingLeft(px(marginX)),
      ]
    | (Some(marginY), None) =>
      Css.[
        paddingTop(px(marginY)),
        paddingBottom(px(marginY)),
        paddingLeft(px(0)),
        paddingRight(px(0)),
      ]
    | (Some(marginY), Some(marginX)) =>
      Css.[
        paddingTop(px(marginY)),
        paddingBottom(px(marginY)),
        paddingLeft(px(marginX)),
        paddingRight(px(marginX)),
      ]
    | (None, None) => Css.[margin(px(10))]
    };
};

let getDirectionStyle = d =>
  switch (d) {
  | "horizontal" => Styles.horizontal
  | "vertical" => Styles.vertical
  | _ => Styles.horizontal
  };

type color =
  | LightGray
  | White;

let getColorStyle = color =>
  switch (color) {
  | LightGray => Styles.lightGrayColor
  | White => Styles.whiteColor
  };

let make = (~direction, ~color=White, ~marginY=?, ~marginX=?, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => {
    let directionStyle = getDirectionStyle(direction);
    let colorStyle = getColorStyle(color);
    let marginStyle = Styles.getMarginStyle(marginY, marginX);
    let separatedStyles =
      List.concat([colorStyle, directionStyle])->Css.style;
    <div className=marginStyle->Css.style>
      <div className=separatedStyles />
    </div>;
  },
};