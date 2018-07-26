open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tooltip", ~decorators=[], ~_module, ());

myStory.add("Hover with children text", () =>
  <Tooltip>
    <span> (ReasonReact.string("hey")) </span>
    <span> (ReasonReact.string("hey")) </span>
  </Tooltip>
);

myStory.add("Hover with facebook share button", () =>
  <Tooltip>
    <ReactShare.FacebookShareButton
      url="https://www.facebook.com/donate/1937650849680964/" quote="Github">
      <ReactShare.FacebookIcon />
    </ReactShare.FacebookShareButton>
  </Tooltip>
);