let component = ReasonReact.statelessComponent("ShareArticle");

module Styles = {
  let containerWidth = 70;
  let referenceContainer =
    Css.(style([display(`flex), width(px(containerWidth))]));

  let tooltipContainer =
    Css.(
      style([
        display(`flex),
        position(relative),
        padding2(~v=px(15), ~h=px(0)),
        width(px(containerWidth)),
        flexDirection(column),
        alignItems(center),
        background(white),
        marginTop(px(15)),
        selector("> div:not(:last-child)", [marginBottom(px(5))]),
        unsafe("boxShadow", "rgba(0, 0, 0, 0.1) 0px 2px 4px"),
        borderRadius(px(4)),
      ])
    );

  let tooltipArrow =
    Css.(
      style([
        unsafe("boxShadow", "rgba(0, 0, 0, 0.1) 0px 2px 4px"),
        position(absolute),
        zIndex(-1),
        top(`percent(-3.0)),
        width(px(14)),
        height(px(14)),
        background(white),
        transform(rotate(`deg(-45))),
        borderRadius(px(2)),
      ])
    );
};

let svgIcon =
  <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      fill="#0BA986"
      d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
      className=""
    />
  </svg>;

let make = (~url, ~title, ~pageType=ArticleAction.PublishedArticle, _children) => {
  ...component,
  render: _self =>
    <div className=Styles.referenceContainer>
      <ReactTippy
        trigger=`Click
        html={
          <div className=Styles.tooltipContainer>
            <div className=Styles.tooltipArrow />
            <ReactShare.LinkedinShareButton url title>
              <ReactShare.LinkedinIcon />
            </ReactShare.LinkedinShareButton>
            <ReactShare.TwitterShareButton url title>
              <ReactShare.TwitterIcon />
            </ReactShare.TwitterShareButton>
            /* <ReactShare.PinterestShareButton url title>
                 <ReactShare.PinterestIcon />
               </ReactShare.PinterestShareButton> */
            <ReactShare.RedditShareButton url title>
              <ReactShare.RedditIcon />
            </ReactShare.RedditShareButton>
            <ReactShare.HackerNewsShareButton url title>
              <ReactShare.HackerNewsIcon />
            </ReactShare.HackerNewsShareButton>
          </div>
        }
        position=`Bottom>
        <ArticleAction pageType svgIcon text="Share" />
      </ReactTippy>
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  url: string,
  title: string,
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (url, title) = jsProps->(urlGet, titleGet);
      make(~url, ~title, [||]);
    },
  );