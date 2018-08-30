let component = ReasonReact.statelessComponent("PullRight");

module Style = {
  let pullRight = Css.(style([marginLeft(`auto), cursor(`auto)]));
};

let make = children => {
  ...component,
  render: _self => <div className=Style.pullRight> ...children </div>,
};