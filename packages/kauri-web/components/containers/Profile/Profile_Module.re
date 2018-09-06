open Infix_Utilities;

exception NoHashFound;
exception NoResponseData;

module Profile = {
  [@bs.deriving abstract]
  type saveUserPayload = {
    username: Js.Nullable.t(string),
    email: Js.Nullable.t(string),
    title: Js.Nullable.t(string),
    website: Js.Nullable.t(string),
    avatar: Js.Nullable.t(string),
    social: Js.Nullable.t(Js.Json.t),
  };

  [@bs.deriving abstract]
  type saveUserAction = {
    [@bs.as "type"]
    type_: string,
    payload: saveUserPayload,
  };

  let saveUserActionType = "saveUser";

  let createsaveUserAction = (payload: saveUserPayload): saveUserAction =>
    saveUserAction(~type_=saveUserActionType, ~payload);
};

let saveUserEpic =
    (
      action: Profile.saveUserAction,
      store: ReduxObservable.Store.store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    ->(ofType(Profile.saveUserActionType))
    ->switchMap(profileAction => {
        let payload = profileAction->Profile.payloadGet;
        let apolloClient =
          dependencies->ReduxObservable.Dependencies.apolloClientGet;
        let subscriber =
          dependencies->ReduxObservable.Dependencies.subscribeToOffchainEvent;

        let username = payload->Profile.usernameGet |> Js.Nullable.toOption;
        let email = payload->Profile.emailGet |> Js.Nullable.toOption;
        let avatar = payload->Profile.avatarGet |> Js.Nullable.toOption;
        let title = payload->Profile.titleGet |> Js.Nullable.toOption;
        let website = payload->Profile.websiteGet |> Js.Nullable.toOption;
        let social = payload->Profile.socialGet |> Js.Nullable.toOption;

        let saveUserMutation =
          Profile_Queries.SaveUser.makeWithVariables({
            "username": username,
            "email": email,
            "avatar": avatar,
            "title": title,
            "website": website,
            "social": social,
          });

        fromPromise(
          apolloClient##mutate({
            "mutation": Profile_Queries.SaveUserMutation.graphqlMutationAST,
            "variables": saveUserMutation##variables,
            "fetchPolicy": Js.Nullable.undefined,
          }),
        )
        ->(
            map(response => {
              let possibleResponse = Js.Nullable.toOption(response##data);
              switch (possibleResponse) {
              | Some(data) =>
                let result = Profile_Queries.SaveUser.parse(data);
                switch (result##saveUser |? (x => x##hash)) {
                | Some(hash) => hash
                | None => raise(NoHashFound)
                };
              | _ => raise(NoResponseData)
              };
            })
          )
        ->(flatMap(hash => fromPromise(subscriber(hash))))
        ->(tap(_ => apolloClient##resetStore()))
        ->(
            flatMap(_ => {
              let reduxStoreState =
                (store |> ReduxObservable.Store.getStateGet)();

              let userId =
                reduxStoreState
                ->ReduxObservable.Store.appGet
                ->ReduxObservable.Store.userIdGet;

              let trackSaveUserPayload =
                App_Module.trackMixPanelPayload(
                  ~event="Offchain",
                  ~metaData=
                    App_Module.trackMixPanelMetaData(
                      ~resource="user",
                      ~resourceID=userId,
                      ~resourceVersion="n/a",
                      ~resourceAction="add user",
                    ),
                );
              let trackSaveUserAction =
                App_Module.trackMixPanelAction(trackSaveUserPayload);

              let notificationType =
                App_Module.notificationTypeToJs(`Success);

              let showSaveUserNotificationPayload =
                App_Module.showNotificationPayload(
                  ~notificationType,
                  ~message="User details updated",
                  ~description="Your user details have now been updated!",
                );

              let showSaveUserNotificationAction =
                App_Module.showNotificationAction(
                  showSaveUserNotificationPayload,
                );

              of2(trackSaveUserAction, showSaveUserNotificationAction);
            })
          );
      })
  );