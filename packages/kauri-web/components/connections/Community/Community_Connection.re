let component = ReasonReact.statelessComponent("CommunityConnection");

let make = (~id, ~hostName, _children) => {
  ...component,
  render: _self => {
    open Community_Queries;
    let getCommunityQuery = GetCommunity.make(~id, ());
    <GetCommunityQuery variables=getCommunityQuery##variables>
      ...{
           ({result}) =>
             switch (result) {
             | Loading => <Loading />
             | Error(error) =>
               <div> {ReasonReact.string(error##message)} </div>
             | Data(response) =>
               open Community_Resource;
               let {website, name: category} =
                 Community_Resource.make(response##getCommunity);
               <Community website category hostName />;
             }
         }
    </GetCommunityQuery>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  category: string,
  hostName: string,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~id=jsProps->categoryGet, ~hostName=jsProps->hostNameGet, [||])
  );