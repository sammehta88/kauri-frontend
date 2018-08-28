open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Buttons", ~decorators=[], ~_module, ());

myStory.add("Twitter", () =>
  <ReactShare.TwitterShareButton
    url="https://edition.cnn.com/2018/07/26/asia/laos-dam-collapse-intl/index.html"
    title="Kauri">
    <ReactShare.TwitterIcon />
  </ReactShare.TwitterShareButton>
);

myStory.add("LinkedIn", () =>
  <ReactShare.LinkedinShareButton
    url="https://www.channelnewsasia.com/news/asia/singapore-scdf-officers-to-laos-relief-efforts-dam-collapse-10562862"
    title="Kauri">
    <ReactShare.LinkedinIcon />
  </ReactShare.LinkedinShareButton>
);

myStory.add("Pinterest", () =>
  <ReactShare.PinterestShareButton
    url="https://www.channelnewsasia.com/news/asia/singapore-scdf-officers-to-laos-relief-efforts-dam-collapse-10562862"
    title="Kauri">
    <ReactShare.PinterestIcon />
  </ReactShare.PinterestShareButton>
);

myStory.add("Reddit", () =>
  <ReactShare.RedditShareButton
    url="https://www.channelnewsasia.com/news/asia/singapore-scdf-officers-to-laos-relief-efforts-dam-collapse-10562862"
    title="Kauri">
    <ReactShare.RedditIcon />
  </ReactShare.RedditShareButton>
);

myStory.add("HackerNews", () =>
  <ReactShare.HackerNewsShareButton
    url="https://www.channelnewsasia.com/news/asia/singapore-scdf-officers-to-laos-relief-efforts-dam-collapse-10562862"
    title="Kauri">
    <ReactShare.HackerNewsIcon />
  </ReactShare.HackerNewsShareButton>
);