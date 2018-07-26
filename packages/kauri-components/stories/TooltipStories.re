open Main;
open Vrroom;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover with children text", () =>
  <ReactTippy
    trigger=`Hover
    html={
      <ReactShare.FacebookShareButton
        url="https://www.facebook.com/donate/1937650849680964/"
        quote="Github">
        <ReactShare.FacebookIcon />
      </ReactShare.FacebookShareButton>
    }>
    <span> ("Share" |. text) </span>
  </ReactTippy>
);
myStory.add("Hover with facebook share button", () =>
  <ReactTippy
    trigger=`Click
    html={
      <ReactShare.FacebookShareButton
        url="https://www.facebook.com/donate/1937650849680964/"
        quote="Github">
        <ReactShare.FacebookIcon />
      </ReactShare.FacebookShareButton>
    }>
    <span> ("Share" |. text) </span>
  </ReactTippy>
);