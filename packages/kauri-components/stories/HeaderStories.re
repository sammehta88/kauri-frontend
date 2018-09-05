open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Headers", ~decorators=[], ~_module, ());

myStory.add("Collection Header", () =>
  <CollectionHeader
    name="Test collection"
    description="Test description for a fake collection"
    userId="0x32048jdwk298he"
    username={Some("0x32048jdwk298he")}
    updated="1 day ago"
    url="test.com"
  />
);

myStory.add("Community Header", () =>
  <CommunityHeader>
    <CommunityProfile
      hostName="beta.kauri.io"
      community="metamask"
      website="https://metamask.io"
    />
  </CommunityHeader>
);