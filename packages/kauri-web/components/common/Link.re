type linkComponent = ReasonReact.reactClass;

let component = ReasonReact.statelessComponent("Link");

[@bs.deriving abstract]
type jsProps = {
  route: string,
  toSlug: Js.Nullable.t(string),
  useAnchorTag: bool,
};

let make = (~linkComponent, ~route, ~useAnchorTag=?, ~toSlug=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=linkComponent,
    ~props=
      jsProps(
        ~route,
        ~toSlug=toSlug->Belt.Option.getWithDefault(Js.Nullable.null),
        ~useAnchorTag=useAnchorTag->Belt.Option.getWithDefault(false),
      ),
    children,
  );