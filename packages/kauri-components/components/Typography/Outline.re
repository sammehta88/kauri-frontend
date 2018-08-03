module Styles = {
  let container = Css.([%css {| { width: 300px; } |}]) |> Css.style;
  let heading =
    Css.(
      [%css
        {|
           {
              color: #1E2428;
              font-size: 11px;
              font-weight: 700;
            }
         |}
      ]
    )
    |> Css.style;
};
let component = ReasonReact.statelessComponent("Outline");
let make = (~headings, ~username, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    <div className=Styles.container>
      (
        switch (Array.length(headings)) {
        | 0 => ReasonReact.null
        | _ =>
          <Vrroom.Fragment>
            <OutlineHeader />
            <OutlineHeadings headings />
            <Separator my=20 direction="horizontal" color=LightGray />
          </Vrroom.Fragment>
        }
      )
      <OutlineHeader text="Author" />
      <Author username />
      <Separator my=20 direction="horizontal" color=LightGray />
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  headings: array(string),
  username: string,
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (headings, username) = jsProps |. (headingsGet, usernameGet);
      make(~headings, ~username, [||]);
    },
  );