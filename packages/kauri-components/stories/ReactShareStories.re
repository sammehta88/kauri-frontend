open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Share", ~decorators=[], ~_module, ());

myStory.add("Hover", () =>
  <ReactShare.FacebookShareButton
    url="https://www.facebook.com/donate/1937650849680964/" quote="Github">
    <ReactShare.FacebookIcon />
  </ReactShare.FacebookShareButton>
);