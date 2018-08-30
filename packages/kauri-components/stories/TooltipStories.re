open Main;
open Vrroom;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover with children text", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Hover
    html={
      <ReactShare.LinkedinShareButton
        url="https://www.Linkedin.com/donate/1937650849680964/" title="Kauri">
        <ReactShare.LinkedinIcon />
      </ReactShare.LinkedinShareButton>
    }>
    <span> "Share"->text </span>
  </ReactTippy>
);
myStory.add("Click with Linkedin share button", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Click
    html={
      <ReactShare.LinkedinShareButton
        url="https://www.Linkedin.com/donate/1937650849680964/" title="Kauri">
        <ReactShare.LinkedinIcon />
      </ReactShare.LinkedinShareButton>
    }>
    <span> "Share"->text </span>
  </ReactTippy>
);

myStory.add("Click with Linkedin and twitter share button", () =>
  <ReactTippy
    position=`Bottom
    trigger=`Click
    html={
      <div>
        <ReactShare.LinkedinShareButton
          url="https://www.Linkedin.com/donate/1937650849680964/"
          title="Kauri">
          <ReactShare.LinkedinIcon />
        </ReactShare.LinkedinShareButton>
        <ReactShare.TwitterShareButton
          url="https://www.Linkedin.com/donate/1937650849680964/"
          title="Kauri">
          <ReactShare.TwitterIcon />
        </ReactShare.TwitterShareButton>
      </div>
    }>
    <span> "Share"->text </span>
  </ReactTippy>
);