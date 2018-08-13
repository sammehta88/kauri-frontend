open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tabs", ~decorators=[], ~_module, ());

myStory.add("Basic", () =>
  BasicTabs.(
    <Tabs
      tabs=(
        (setCurrentTabIndex, currentTabIndex) =>
          <TabList currentTabIndex setCurrentTabIndex>
            <Tab> "All"->String.uppercase->ReasonReact.string </Tab>
            <Tab>
              "General Articles"->String.uppercase->ReasonReact.string
            </Tab>
            <Tab> "Tutorials"->String.uppercase->ReasonReact.string </Tab>
          </TabList>
      )
      content=(
        currentTabIndex =>
          <PanelList currentTabIndex>
            <Panel> <p> "Content"->ReasonReact.string </p> </Panel>
            <Panel> <p> "Content2"->ReasonReact.string </p> </Panel>
            <Panel> <p> "Content3"->ReasonReact.string </p> </Panel>
          </PanelList>
      )
    />
  )
);