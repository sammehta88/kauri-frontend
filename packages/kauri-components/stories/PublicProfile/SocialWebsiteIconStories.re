open Main;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Social Website Icon", ~decorators=[], ~_module, ());

myStory.add("Github", () =>
  <SocialWebsiteIcon height=Js.Nullable.undefined brand="github" />
);
myStory.add("Twitter", () =>
  <SocialWebsiteIcon height=Js.Nullable.undefined brand="twitter" />
);

myStory.add("LinkedIn with height prop", () =>
  <SocialWebsiteIcon height=(Js.Nullable.return("30")) brand="linkedin" />
);

myStory.add("Social Websites", () =>
  <SocialWebsites>
    <SocialWebsiteIcon height=Js.Nullable.null brand="linkedin" />
    <SocialWebsiteIcon height=Js.Nullable.null brand="twitter" />
    <PersonalWebsite website="www.personalwebsite.com" />
  </SocialWebsites>
);