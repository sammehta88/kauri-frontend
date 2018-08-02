open Vrroom;

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
let component = ReasonReact.statelessComponent("OutlineHeading");
let make = (~headings: array(string), _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <ul className=Styles.list>
      (
        headings
        |. Belt.Array.mapWithIndex((index, heading) =>
             <li
               key=(heading ++ string_of_int(index))
               className=Styles.listItem>
               <span className=Styles.heading> (heading |. text) </span>
             </li>
           )
        |. ReasonReact.array
      )
    </ul>,
};