[@bs.module "../../../kauri-web/components/common/DescriptionRow.js"]
/* /Users/rej156/Documents/kauri-frontend/packages/kauri-web/components/common/DescriptionRow.js */
external descriptionRow : ReasonReact.reactClass = "default";

[@bs.deriving abstract]
type requestRecord = {text: string};

[@bs.deriving abstract]
type jsProps = {
  [@bs.as "record"]
  record_: requestRecord,
};

let make = (~content, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=descriptionRow,
    ~props=jsProps(~record_=requestRecord(~text=content)),
    children,
  );