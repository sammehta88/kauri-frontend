open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Outline Headings", ~decorators=[], ~_module, ());

myStory.add("Outline Header", () => <OutlineHeader />);
myStory.add("Outline Headings", () =>
  <OutlineHeadings
    headings=[|"Intro", "Turning Web3.js functions into JavaScript promises"|]
  />
);
myStory.add("Outline", () =>
  <Outline
    userId="0x1337"
    headings=[|"Intro", "Turning Web3.js functions into JavaScript promises"|]
    username="rej156"
  />
);