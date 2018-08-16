type linkComponent = ReasonReact.reactClass;

let component = ReasonReact.statelessComponent("Link");

[@bs.deriving abstract]
type jsProps = {
  route: string,
  useAnchorTag: bool,
};

let make = (~linkComponent, ~route, ~useAnchorTag=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=linkComponent,
    ~props=
      jsProps(
        ~route,
        ~useAnchorTag=useAnchorTag->Belt.Option.getWithDefault(false),
      ),
    children,
  );