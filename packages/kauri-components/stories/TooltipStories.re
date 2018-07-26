open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover", () =>
  <Tooltip>
    <span> (ReasonReact.string("hey")) </span>
    <span> (ReasonReact.string("hey")) </span>
  </Tooltip>
);