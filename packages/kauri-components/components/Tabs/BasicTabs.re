module Tabs = {
  let component = ReasonReact.statelessComponent("Tabs");

  let make = children => {
    ...component,
    render: self => <div> ...children </div>,
  };
};

module TabList = {
  type state = {currentTabIndex: int};
  type action =
    | SetCurrentTabIndex(int);
  let component = ReasonReact.reducerComponent("TabList");

  let make = children => {
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
          children
          ->Belt.Array.mapWithIndex(
              (i, child) =>
                ReasonReact.cloneElement(
                  <div key=i->string_of_int />,
                  ~props={"onClick": _ => self.send(SetCurrentTabIndex(i))},
                  [|child|],
                ),
            )
          |> ReasonReact.array
        )
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

module PanelList = {
  let component = ReasonReact.statelessComponent("PanelList");

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