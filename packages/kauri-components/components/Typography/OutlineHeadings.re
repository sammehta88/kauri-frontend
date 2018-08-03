open Vrroom;
open Webapi.Dom;
[@bs.val] external setTimeout : (unit => unit, int) => unit = "";

type windowLocation;
[@bs.val] external windowLocation : windowLocation = "window.location";
[@bs.set] external setLocationHash : (windowLocation, string) => unit = "hash";

module Styles = {
  let hey = `none;
  let listItem =
    Css.(
      [%css
        {|
           {
              color: #0BA986;
              font-size: 11px;
              list-style-position: outside;
              padding-left: 0px;
           }
        |}
      ]
    )
    |> Css.style;

  let list =
    Css.(
      [%css
        {|
         {
              padding-left: 16px;
         }
      |}
      ]
    )
    |> Css.style;

  let heading =
    Css.(
      [%css
        {|
          {
            color: #1E2428;
            font-size: 14px;
            font-weight: 500;
          }
       |}
      ]
    )
    |> Css.style;
};

let handleClick = (event, heading) => {
  ReactEventRe.Mouse.preventDefault(event);
  let headingLowerCasedWithNoSpacesOrSpecialChars =
    heading
    |> Revamp.replace({| |}, _ => "")
    |> Revamp.replace({|\W|_|}, _letter => "")
    |> String.lowercase;
  let headerDomElement =
    Document.getElementById(
      headingLowerCasedWithNoSpacesOrSpecialChars,
      document,
    );

  switch (headerDomElement) {
  | Some(domElement) =>
    Element.scrollIntoViewWithOptions(
      {"behavior": "smooth", "block": "start"},
      domElement,
    );
    setTimeout(
      () =>
        windowLocation
        |. setLocationHash(headingLowerCasedWithNoSpacesOrSpecialChars),
      700,
    );
  | None => ()
  };
};
let component = ReasonReact.statelessComponent("OutlineHeading");
let make = (~headings: array(string), _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <ul className=Styles.list>
      (
        headings
        |. Belt.Array.mapWithIndex((index, heading) =>
             <li
               onClick=(event => handleClick(event, heading))
               key=(heading ++ string_of_int(index))
               className=Styles.listItem>
               <span className=Styles.heading> (heading |. text) </span>
             </li>
           )
        |. ReasonReact.array
      )
    </ul>,
};