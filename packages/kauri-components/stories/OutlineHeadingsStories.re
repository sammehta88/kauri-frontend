open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Outline Headings", ~decorators=[], ~_module, ());

myStory.add("Outline Header", () => <OutlineHeader />);
myStory.add("Outline Headings", () => <OutlineHeadings />);
myStory.add("Outline", () => <Outline />);