open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Separators", ~decorators=[], ~_module, ());

myStory.add("Separator", () => <BaseCard> <Separator /> </BaseCard>);