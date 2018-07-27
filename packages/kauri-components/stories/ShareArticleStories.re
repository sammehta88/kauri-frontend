open Main;
open Vrroom;

let _module = [%bs.raw "module"];

let myStory =
  createStory(~title="Share Article", ~decorators=[], ~_module, ());

module Styles = {
  let container =
    Css.(
      [%css
        {|
            {
              display: flexBox;
              justify-content: center;
              width: 60px;
            }
            > :first-child {
              margin-right: 9px;
            }
        |}
      ]
      |> style
    );

  let tooltipContainer =
    Css.(
      [%css
        {|
        {
          display: flexBox;
          flex-direction: column;
          padding-top: 5px;
        }
        > div {
          margin-bottom: 3px;
        }
    |}
      ]
      |> style
    );

  let icon =
    Css.(
      [%css
        {|
          {
            height: 16px;
            width: 16px;
          }
      |}
      ]
      |> style
    );

  let text =
    Css.(
      [%css
        {|
          {
            color: white;
            font-size: 11px;
            font-weight: 500;
          }
      |}
      ]
      |> style
    );
};

let iconToReplace =
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className=Styles.icon>
    <path
      fill="#0BA986"
      d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
      className=""
    />
  </svg>;

myStory.add("Click for dropdown", () =>
  <div
    className="DummyContainerForTippy"
    style=(ReactDOMRe.Style.make(~display="flex", ~width="100%", ()))>
    <ReactTippy
      trigger=`Click
      html={
        <div className=Styles.tooltipContainer>
          <ReactShare.LinkedinShareButton
            url="https://www.facebook.com/donate/1937650849680964/"
            title="Kauri">
            <ReactShare.LinkedinIcon />
          </ReactShare.LinkedinShareButton>
          <ReactShare.TwitterShareButton
            url="https://www.facebook.com/donate/1937650849680964/"
            title="Kauri">
            <ReactShare.TwitterIcon />
          </ReactShare.TwitterShareButton>
          <ReactShare.FacebookShareButton
            url="https://www.facebook.com/donate/1937650849680964/"
            quote="Kauri">
            <ReactShare.FacebookIcon />
          </ReactShare.FacebookShareButton>
        </div>
      }
      position=`Bottom>
      <div className=Styles.container>
        iconToReplace
        <span className=Styles.text>
          ("Share" |. String.uppercase |. text)
        </span>
      </div>
    </ReactTippy>
  </div>
);