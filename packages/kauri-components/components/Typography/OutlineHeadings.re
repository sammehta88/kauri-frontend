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
            list-style-position: inside;
            padding-left: 0;
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
let make = _children => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <ul className=Styles.list>
      <li className=Styles.listItem>
        <span className=Styles.heading> ("hey" |. text) </span>
      </li>
      <li className=Styles.listItem>
        <span className=Styles.heading> ("hey2" |. text) </span>
      </li>
    </ul>,
};