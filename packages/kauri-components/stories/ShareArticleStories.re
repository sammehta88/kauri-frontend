open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Article", ~decorators=[], ~_module, ());

myStory.add("Click for dropdown", () =>
  <div
    className="DummyContainerForTippy"
    style=(ReactDOMRe.Style.make(~display="flex", ~width="100%", ()))>
    <ShareArticle />
  </div>
);