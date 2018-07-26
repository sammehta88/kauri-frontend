open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Share", ~decorators=[], ~_module, ());

myStory.add("Facebook", () =>
  <ReactShare.FacebookShareButton
    url="https://www.facebook.com/donate/1937650849680964/" quote="Github">
    <ReactShare.FacebookIcon />
  </ReactShare.FacebookShareButton>
);

myStory.add("Twitter", () =>
  <ReactShare.TwitterShareButton
    url="https://www.Twitter.com/donate/1937650849680964/" quote="Github">
    <ReactShare.TwitterIcon />
  </ReactShare.TwitterShareButton>
);