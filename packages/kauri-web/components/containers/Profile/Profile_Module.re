open Infix_Utilities;

exception NoHashFound;
exception NoResponseData;

module Profile = {
  [@bs.deriving abstract]
  type addUserPayload = {
    username: option(string),
    email: option(string),
    title: option(string),
    website: option(string),
    avatar: option(string),
    social: option(Js.Json.t),
  };

  [@bs.deriving abstract]
  type addUserAction = {
    [@bs.as "type"]
    type_: string,
    payload: addUserPayload,
  };

  let addUserActionType = "AddUser";

  let createAddUserAction = (payload: addUserPayload): addUserAction =>
    addUserAction(~type_=addUserActionType, ~payload);
};

let addUserEpic =
    (
      action: Profile.addUserAction,
      _store,
      _dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    ->(ofType(Profile.addUserActionType))
    ->(switchMap(_profileAction => of1(1)))
  );