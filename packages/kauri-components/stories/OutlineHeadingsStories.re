open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Outline Headings", ~decorators=[], ~_module, ());

myStory.add("Outline Header", () => <OutlineHeader />);
myStory.add("Outline Headings", () =>
  <OutlineHeadings headings=[|"hey", "ooh"|] />
);
myStory.add("Outline", () => <Outline headings=[|"hey", "wow"|] />);