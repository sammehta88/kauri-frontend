type themeConfig;
[@bs.deriving abstract]
type communityConfig = {
  primaryColor: string,
  bordercolor: string,
  homepageURL: string,
  description: string,
};
[@bs.get_index]
external getCommunityConfig: (themeConfig, string) => communityConfig = "";