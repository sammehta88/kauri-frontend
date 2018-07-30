open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Profile", ~decorators=[], ~_module, ());

myStory.add("Metadata", () =>
  <Profile.Container>
    <ProfileAvatar
      avatarURL="https://pbs.twimg.com/profile_images/904695589572632576/Wl3HbVK0_400x400.jpg"
    />
    <Profile.Metadata>
      <Username username="@rej156" />
      <FullName fullName="Eric Juta" />
      <Blurb blurb="Frontend Software Engineer at Kauri" />
      <SocialWebsites>
        <SocialWebsiteIcon height=Js.Nullable.null brand="linkedin" />
        <SocialWebsiteIcon height=Js.Nullable.null brand="twitter" />
        <PersonalWebsite website="www.personalwebsite.com" />
      </SocialWebsites>
      <Attributions>
        <ProfileBadges header="Badges">
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
          />
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
          />
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
          />
        </ProfileBadges>
        <ProfileBadges header="Contributor">
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/github.svg"
          />
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/spotify.svg"
          />
          <ProfileBadge
            badgeURL="https://unpkg.com/simple-icons@latest/icons/linkedin.svg"
          />
        </ProfileBadges>
      </Attributions>
    </Profile.Metadata>
  </Profile.Container>
);