open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Cards", ~decorators=[], ~_module, ());

myStory.add("Base Card", () => <BaseCard>
<Paragraph text="Some Content Here" />
</BaseCard>);
myStory.add("Article Card", () => <ArticleCard />);