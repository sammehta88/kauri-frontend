let component = ReasonReact.statelessComponent("Link");

module Style = {
  let base = colorProp =>
    Css.[textDecoration(`none), color(hex(colorProp)), cursor(`pointer)];
  let link = (colorProp, removeHoverColor) =>
    removeHoverColor
    ->Belt.Option.mapWithDefault(
        base(colorProp),
        _ =>
          List.append(
            Css.[
              selector(":hover", [color(hex(colorProp))]),
              selector("> *:hover", [color(hex(colorProp))]),
            ],
            base(colorProp),
          ),
      );
};

let handleClick = (routeChangeAction, href, event) => {
  event->ReactEvent.Mouse.preventDefault;
  event->ReactEvent.Mouse.preventDefault;
  switch (routeChangeAction) {
  | Some(routeChangeAction) => routeChangeAction(href)
  | None => ()
  };
};

let make =
    (
      ~className=?,
      ~removeHoverColor=?,
      ~href,
      ~routeChangeAction,
      ~color="1E2428",
      children,
    ) => {
  ...component,
  render: _self =>
    <a
      className=(
        className
        ->Belt.Option.mapWithDefault(
            Style.link(color, removeHoverColor),
            className =>
              List.append(className, Style.link(color, removeHoverColor)),
          )
        |> Css.style
      )
      href
      onClick=(handleClick(routeChangeAction, href))>
      ...children
    </a>,
};