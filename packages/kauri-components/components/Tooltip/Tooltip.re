open Vrroom;

[@bs.deriving abstract]
type options = {
  placement: string,
  title: Dom.element,
  html: bool,
};

[@bs.new] [@bs.module "tooltip.js"]
external initTooltip : (Dom.element, options) => unit = "default";

type t;
[@bs.module "tooltip.js"] external hey : t = "default";

type state = {
  isOpen: bool,
  mySectionRef: ref(option(Dom.element)),
};
type action =
  | Click;

[@bs.val]
external createElement : string => Dom.element = "document.createElement";

[@bs.set]
external setInnerHtml : (Dom.element, string) => unit = "innerHTML";

[@bs.get] external firstChild : Dom.element => Dom.element = "";

let component = ReasonReact.reducerComponent("MyPanel");

let make = children => {
  let setSectionRef = (theRef, {ReasonReact.state}) =>
    state.mySectionRef := Js.Nullable.toOption(theRef);
  {
    ...component,
    didMount: self => {
      let title =
        ReactDOMServerRe.renderToString(
          ReasonReact.createDomElement(
            "div",
            ~props=Js.Obj.empty(),
            children,
          ),
        );
      let divDomNode = createElement("div");
      divDomNode |. setInnerHtml(title);
      switch (self.state.mySectionRef^) {
      | Some(x) =>
        initTooltip(
          x,
          options(
            ~placement="bottom",
            ~title=divDomNode |. firstChild,
            ~html=true,
          ),
        )

      | None => Js.log(" no ref")
      };
    },
    initialState: () => {isOpen: false, mySectionRef: ref(None)},
    reducer: (action, state) =>
      switch (action) {
      | Click => ReasonReact.NoUpdate
      },
    render: self =>
      <span ref=(self.handle(setSectionRef))> ("Share" |. text) </span>,
  };
};