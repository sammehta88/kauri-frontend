[@bs.module "react-tippy"]
external reactTooltip : ReasonReact.reactClass = "Tooltip";

[@bs.deriving jsConverter]
type trigger = [ | [@bs.as "click"] `Click | [@bs.as "mouseenter"] `Hover];

[@bs.deriving abstract]
type jsProps = {
  html: ReasonReact.reactElement,
  trigger: string,
};

let make = (~html, ~trigger, children) => {
  let triggerString = triggerToJs(trigger);
  ReasonReact.wrapJsForReason(
    ~reactClass=reactTooltip,
    ~props=jsProps(~html, ~trigger=triggerString),
    children,
  );
};