let component = ReasonReact.statelessComponent("SocialWebsiteIcon");

let calcHeight = height =>
  switch (Js.Nullable.toOption(height)) {
  | Some(height) => height
  | None => "20"
  };

let make = (~brand, ~height, _children) => {
  ...component,
  render: _self => {
    let height = calcHeight(height);
    <img
      style=(ReactDOMRe.Style.make(~filter="invert(100%)", ()))
      height
      width=height
      src={j|https://unpkg.com/simple-icons@latest/icons/$brand.svg|j}
    />;
  },
};

[@bs.deriving abstract]
type jsProps = {
  brand: string,
  height: Js.Nullable.t(string),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~brand=jsProps |. brandGet, ~height=jsProps |. heightGet, [||])
  );