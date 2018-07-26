open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover", () => <Tooltip />);