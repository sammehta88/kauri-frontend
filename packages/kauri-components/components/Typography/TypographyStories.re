open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Typography", ~decorators=[], ~_module, ());

myStory.add("Heading", () => <Heading text="Title for something" />);
myStory.add("Paragraph", () => <Paragraph text="paragraph text" />);
myStory.add("Label", () => <Label text="label text" />);