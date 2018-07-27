open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Cards", ~decorators=[], ~_module, ());

myStory.add("Base Card", () =>
  <BaseCard> <Paragraph text="Some Content Here" /> </BaseCard>
);

myStory.add("Article Card", () =>
  <ArticleCard
    date="3 June 2099"
    title="This is a title, possibly should support two lines"
    content="This is the content body, should be longer of course. Like a Lorem Ipsum, Bacon Summit or something like that"
    tags=[|"test", "foo", "bar", "ethereum"|]
  />
);

myStory.add("Article Card with Image", () =>
  <ArticleCard
    date="3 June 2099"
    title="This is a title"
    content="This is the content body, should be longer of course. Like a Lorem Ipsum, Bacon Summit or something like that. This is the content body, should be longer of course. Like a Lorem Ipsum, Bacon Summit or something like that."
    imageURL="https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
    tags=[|"test", "foo", "bar", "ethereum"|]
  />
);