open Main;

let _module = [%bs.raw "module"];

let myStory = createStory(~title="Tabs", ~decorators=[], ~_module, ());

myStory.add("Basic", () =>
  BasicTabs.(
    <Tabs>
      <TabList>
        <Tab> <p> "Tab Name"->ReasonReact.string </p> </Tab>
        <Tab> <p> "Tab Name2"->ReasonReact.string </p> </Tab>
      </TabList>
      <PanelList>
        <Panel> <p> "Content"->ReasonReact.string </p> </Panel>
        <Panel> <p> "Content2"->ReasonReact.string </p> </Panel>
      </PanelList>
    </Tabs>
  )
);