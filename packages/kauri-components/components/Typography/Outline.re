module Styles = {
  let container = Css.(style([width(px(300)), marginTop(px(5))]));
  let heading =
    Css.(
      style([color(hex("1E2428")), fontSize(px(11)), fontWeight(700)])
    );
};
let component = ReasonReact.statelessComponent("Outline");
let make =
    (
      ~headings,
      ~username,
      /* ~pageType,  */
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      {
        switch (Array.length(headings)) {
        | 0 => ReasonReact.null
        | _ =>
          <Vrroom.Fragment>
            <OutlineHeader />
            <OutlineHeadings headings />
            <Separator marginY=20 direction="horizontal" color=LightGray />
          </Vrroom.Fragment>
        }
      }
      <OutlineHeader text="Author" />
      <UserWidgetSmall pageType=None username />
      <Separator marginY=20 direction="horizontal" color=LightGray />
    </div>,
};

[@bs.deriving abstract]
type jsProps = {
  headings: array(string),
  username: string,
  pageType: Js.Nullable.t(string),
};
let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    jsProps => {
      let (
        headings,
        username,
        /* pageType */
      ) =
        jsProps
        ->(
            headingsGet,
            usernameGet,
            /* pageTypeGet, */
          );
      /* let pageType = pageType->Js.Nullable.toOption; */
      make(
        ~headings,
        ~username,
        /* ~pageType, */
        [||],
      );
    },
  );