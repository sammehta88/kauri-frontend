module TabList = {
  let component = ReasonReact.statelessComponent("TabList");

  module Style = {
    let tabList = colorProp =>
      Css.(
        style([
          selector(
            "> *:not(:last-child)",
            [cursor(`pointer), marginRight(px(20))],
          ),
          selector(
            "@media(max-width: 500px)",
            [
              paddingLeft(px(10)),
              paddingRight(px(10)),
              selector("> * > *", [fontSize(px(11))]),
              selector("> * > * > *", [fontSize(px(11))]),
            ],
          ),
          display(`flex),
          height(px(50)),
          flexDirection(row),
          alignItems(center),
          backgroundColor(hex(colorProp)),
          listStyleType(`none),
          unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
        ])
      );
  };
  let make = (~color="1e3d3b", children) => {
    ...component,
    render: _self => <ul className={Style.tabList(color)}> ...children </ul>,
  };
};

module PanelList = {
  let component = ReasonReact.statelessComponent("PanelList");

  let make = children => {
    ...component,
    render: _self => <div> ...children </div>,
  };
};

module Tabs = {
  type state = {currentTabName: string};
  type action =
    | SetCurrentTabName(string);

  let component = ReasonReact.reducerComponent("Tabs");
  let make =
      (
        ~defaultTabName,
        ~tabs: ('a, string) => ReasonReact.reactElement,
        ~content,
        _children,
      ) => {
    ...component,
    initialState: () => {currentTabName: defaultTabName},
    reducer: (action, _state) =>
      switch (action) {
      | SetCurrentTabName(index) =>
        ReasonReact.Update({currentTabName: index})
      },
    render: self =>
      <div>
        {
          tabs(
            index => self.send(SetCurrentTabName(index)),
            self.state.currentTabName,
          )
        }
        {self.state.currentTabName |> content}
      </div>,
  };
};

module Tab = {
  let component = ReasonReact.statelessComponent("Tab");

  module Style = {
    open Css;

    let text = [fontSize(px(13)), fontWeight(700), color(hex("FFFFFF"))];
    let tab = [
      display(`flex),
      alignItems(center),
      height(px(50)),
      position(relative),
      selector("> *", text),
      ...text,
    ];
    let activeTab = isActive =>
      isActive ?
        style(
          List.append(
            [
              selector(
                ":after",
                [
                  unsafe("content", "''"),
                  position(absolute),
                  background(hex("0BA986")),
                  height(px(4)),
                  bottom(`pt(0)),
                  left(`pt(0)),
                  right(`pt(0)),
                  display(`block),
                ],
              ),
            ],
            tab,
          ),
        ) :
        style(tab);
  };

  let make = (~setCurrentTabName, ~currentTabName, ~name, children) => {
    ...component,
    render: _self =>
      <div className={Style.activeTab(currentTabName == name)}>
        <span onClick={_ => setCurrentTabName(name)}> ...children </span>
      </div>,
  };
};

module Panel = {
  module Style = {
    let panel = isActive =>
      Css.(
        style([
          unsafe("padding", "0px calc((100vw - 1280px) / 2)"),
          isActive ? display(`block) : display(`none),
        ])
      );
  };
  let component = ReasonReact.statelessComponent("Panel");

  let make = (~name, ~currentTabName, children) => {
    ...component,
    render: _self =>
      <section className={Style.panel(name == currentTabName)}>
        ...children
      </section>,
  };
};

module Badge = {
  let component = ReasonReact.statelessComponent("Badge");

  module Style = {
    let text =
      Css.(
        style([
          display(`flex),
          alignItems(center),
          fontSize(px(13)),
          fontWeight(700),
          color(hex("FFFFFF")),
          cursor(`text),
        ])
      );
  };

  let make = children => {
    ...component,
    render: _self =>
      <div className=Tab.Style.tab->Css.style>
        <span className=Style.text> ...children </span>
      </div>,
  };
};