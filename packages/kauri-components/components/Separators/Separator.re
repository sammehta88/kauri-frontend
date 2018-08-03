let component = ReasonReact.statelessComponent("HorizontalSeparator");

module Styles = {
  let horizontal =
    Css.(
      [%css
        {|
        {
            height: 2px;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
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

let make = (~direction, ~color=White, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self => {
    let directionStyle = getDirectionStyle(direction);
    let colorStyle = getColorStyle(color);
    <div className=(List.append(colorStyle, directionStyle) |> Css.style) />;
  },
};