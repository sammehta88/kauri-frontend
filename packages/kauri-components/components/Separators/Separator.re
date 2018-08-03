let component = ReasonReact.statelessComponent("HorizontalSeparator");

module Styles = {
  let horizontal =
    Css.(
      [%css
        {|
        {
            height: 2px;
            width: 100%;
        }
        |}
      ]
    );

  let vertical =
    Css.(
      [%css
        {|
      {
          width: 2px;
          height: 100%;
      }
      |}
      ]
    );

  let whiteColor = Css.([%css {| { background: #f2f2f2; } |}]);
  let lightGrayColor = Css.([%css {| { background: #ebebeb; } |}]);
  let getMarginStyle = my =>
    switch (my) {
    | Some(my) => Css.[marginTop(px(my)), marginBottom(px(my))]
    | None => Css.[marginTop(px(10)), marginBottom(px(10))]
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

let make = (~direction, ~color=White, ~my=?, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => {
    let directionStyle = getDirectionStyle(direction);
    let colorStyle = getColorStyle(color);
    let marginStyle = Styles.getMarginStyle(my);
    let separatedStyles =
      List.concat([colorStyle, directionStyle, marginStyle]) |. Css.style;
    <div className=separatedStyles />;
  },
};