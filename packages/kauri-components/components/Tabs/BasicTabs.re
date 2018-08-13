module TabList = {
  let component = ReasonReact.statelessComponent("TabList");

  let className = Css.(style([display(`flex), flexDirection(row)]));
  let make = (~setCurrentTabIndex, children) => {
    ...component,
    didMount: _ => Js.log(children[0]),
    render: _self =>
      <div className>
        (
          children
          ->Belt.Array.mapWithIndex(
              (i, child) =>
                ReasonReact.cloneElement(
                  <div key=i->string_of_int />,
                  ~props={"onClick": _ => setCurrentTabIndex(i)},
                  [|child|],
                ),
            )
          |> ReasonReact.array
        )
      </div>,
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
  let make = (~tabs: 'a => ReasonReact.reactElement, ~content, _children) => {
    ...component,
    initialState: () => {currentTabIndex: 0},
    reducer: (action, _state) =>
      switch (action) {
      | SetCurrentTabIndex(index) =>
        ReasonReact.Update({currentTabIndex: index})
      },
    render: self =>
      <div>
        ((index => self.send(SetCurrentTabIndex(index))) |> tabs)
        (self.state.currentTabIndex |> content)
      </div>,
  };
};

module Tab = {
  let component = ReasonReact.statelessComponent("Tab");

  let make = children => {
    ...component,
    render: _self => <div> ...children </div>,
  };
};

module Panel = {
  let component = ReasonReact.statelessComponent("Panel");

  let make = children => {
    ...component,
    render: _self => <div> ...children </div>,
  };
};