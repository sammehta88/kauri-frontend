open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Article", ~decorators=[], ~_module, ());

myStory.add("Click for dropdown", () =>
  <div
    className="DummyContainerForTippy"
    style=(ReactDOMRe.Style.make(~display="flex", ~width="100%", ()))>
    <ShareArticle
      linkedInURL="https://www.facebook.com/donate/1937650849680964/"
      linkedInTitle="Kauri"
      twitterURL="https://www.facebook.com/donate/1937650849680964/"
      twitterTitle="Kauri"
      facebookURL="https://www.facebook.com/donate/1937650849680964/"
      facebookQuote="Kauri"
    />
  </div>
);