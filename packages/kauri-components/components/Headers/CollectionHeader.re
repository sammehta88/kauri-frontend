[@bs.deriving abstract]
type jsProps = {
  date: string,
  name: string,
  description: string,
  username: Js.Nullable.t(string),
  userId: string,
  profileImage: string,
  updated: string,
  routeChangeAction: string => unit,
};

let component = ReasonReact.statelessComponent("CollectionHeader");

module Styles = {
  let container =
    Css.(
      style([
        display(`flex),
        width(`percent(100.0)),
        flexDirection(row),
        media(
          "only screen and (max-width: 500px)",
          [flexDirection(column), padding(px(10))],
        ),
      ])
    );

  let leftSide =
    Css.(style([display(`flex), flex(3), flexDirection(column)]));

  let rightSide =
    Css.(
      style([
        display(`flex),
        flex(1),
        alignItems(`center),
        flexDirection(column),
      ])
    );
};

let make =
    (
      ~routeChangeAction=?,
      ~name,
      ~description,
      ~username,
      ~userId,
      ~profileImage=?,
      ~updated,
      _children,
    ) => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <div className=Styles.leftSide>
        <PostedDate date_field=updated dateType=PostedDate.Updated />
        <Heading size=28 text=name color="ffffff" />
        <Paragraph size=16 text=description color="ffffff" />
      </div>
      <div className=Styles.rightSide>
        <Label text="Curator" color="ffffff" />
        <UserWidgetSmall
          pageType=None
          username=username->Belt.Option.getWithDefault(userId)
          color="ffffff"
        />
      </div>
    </div>,
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~routeChangeAction=jsProps->routeChangeActionGet,
      ~name=jsProps->nameGet,
      ~description=jsProps->descriptionGet,
      ~username=jsProps->usernameGet->Js.Nullable.toOption,
      ~userId=jsProps->userIdGet,
      ~profileImage=jsProps->profileImageGet,
      ~updated=jsProps->updatedGet,
      [||],
    )
  );