module TabList = {
  let component = ReasonReact.statelessComponent("TabList");

  module Style = {
    let tabList = colorProp =>
      Css.(
        style([
          display(`flex),
          height(px(60)),
          flexDirection(row),
          alignItems(center),
          backgroundColor(hex(colorProp)),
          listStyleType(`none),
          unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
          selector(
            "> *",
            [cursor(`pointer), marginRight(px(20)), height(px(35))],
          ),
        ])
      );

    let activeTab = isActive =>
      isActive ?
        Css.(
          style([
            selector(
              ":after",
              [
                unsafe("content", "''"),
                background(hex("FFFFFF")),
                height(px(2)),
                marginTop(px(9)),
                display(`block),
              ],
            ),
          ])
        ) :
        Css.(style([]));
  };
  let make =
      (~setCurrentTabIndex, ~currentTabIndex, ~color="1e3d3b", children) => {
    ...component,
    render: _self =>
      <ul className=(Style.tabList(color))>
        (
          children
          ->Belt.Array.mapWithIndex(
              (i, child) =>
                ReasonReact.cloneElement(
                  <li
                    className=(Style.activeTab(currentTabIndex == i))
                    key=i->string_of_int
                  />,
                  ~props={"onClick": _ => setCurrentTabIndex(i)},
                  [|child|],
                ),
            )
          |> ReasonReact.array
        )
      </ul>,
  };
};

module PanelList = {
  let component = ReasonReact.statelessComponent("PanelList");

  let make = (~currentTabIndex, children) => {
    ...component,
    render: _self =>
      <div>
        (
          children
          |> Js.Array.filteri((_panel, i) => i === currentTabIndex)
          |> ReasonReact.array
        )
      </div>,
  };
};

module Tabs = {
  type state = {currentTabIndex: int};
  type action =
    | SetCurrentTabIndex(int);

  let component = ReasonReact.reducerComponent("Tabs");
  let make =
      (~tabs: ('a, int) => ReasonReact.reactElement, ~content, _children) => {
    ...component,
    initialState: () => {currentTabIndex: 0},
    reducer: (action, _state) =>
      switch (action) {
      | SetCurrentTabIndex(index) =>
        ReasonReact.Update({currentTabIndex: index})
      },
    render: self =>
      <div>
        (
          tabs(
            index => self.send(SetCurrentTabIndex(index)),
            self.state.currentTabIndex,
          )
        )
        (self.state.currentTabIndex |> content)
      </div>,
  };
};

module Tab = {
  let component = ReasonReact.statelessComponent("Tab");

  module Style = {
    open Css;
    let text = [fontSize(px(13)), fontWeight(700), color(hex("FFFFFF"))];
    let tab = style([selector("> *", text), ...text]);
  };

  let make = children => {
    ...component,
    render: _self => <span className=Style.tab> ...children </span>,
  };
};

module Panel = {
  module Style = {
    let panel =
      Css.(style([unsafe("padding", "0px calc((100vw - 1280px) / 2)")]));
  };
  let component = ReasonReact.statelessComponent("Panel");

  let make = children => {
    ...component,
    render: _self => <div className=Style.panel> ...children </div>,
  };
};