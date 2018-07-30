open Vrroom;
let component = ReasonReact.statelessComponent("PersonalWebsite");

module Styles = {
  open Css;
  let website =
    [%css
      {|
      {
        color: #fff;
        font-size: 13px;
        font-weight: 300;
        font-style: normal;
        text-decoration: none;
        word-wrap: break-word;
       }
      |}
    ]
    |. style;
};

let make = (~website, _children) => {
  ...component,
  render: _self =>
    <a href=("https://" ++ website) className=Styles.website>
      (website |. text)
    </a>,
};

[@bs.deriving abstract]
type jsProps = {website: string};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~website=jsProps |. websiteGet, [||])
  );