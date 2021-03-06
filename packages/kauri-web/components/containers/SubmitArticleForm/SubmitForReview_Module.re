open Infix_Utilities;

exception NoHashFound;
exception NoResponseData;

module SubmitForReview = {
  let actionType = "SUBMIT_FOR_REVIEW";

  [@bs.deriving abstract]
  type payload = {
    id: string,
    article_version: int,
    category: Js.Nullable.t(string),
  };

  [@bs.deriving abstract]
  type action = {
    [@bs.as "type"]
    type_: string,
    payload,
  };
};

let submitForReviewAction =
    (payload: SubmitForReview.payload): SubmitForReview.action =>
  SubmitForReview.action(~type_=SubmitForReview.actionType, ~payload);

let submitForReviewEpic =
    (
      action: SubmitForReview.action,
      _store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    ->(ofType(SubmitForReview.actionType))
    ->(
        switchMap(submitForReviewAction => {
          let (apolloClient, subscriber) =
            dependencies
            ->(
                ReduxObservable.Dependencies.apolloClientGet,
                ReduxObservable.Dependencies.subscribeToOffchainEvent,
              );

          let (resourceID, article_version, category) =
            submitForReviewAction
            ->SubmitForReview.payloadGet
            ->SubmitForReview.(idGet, article_versionGet, categoryGet);

          let category = category->Js.Nullable.toOption;

          let submitForReviewMutation =
            Article_Queries.SubmitForReview.make(
              ~id=resourceID,
              ~article_version,
              (),
            );

          fromPromise(
            apolloClient##mutate({
              "mutation": Article_Queries.SubmitForReviewMutation.graphqlMutationAST,
              "variables": submitForReviewMutation##variables,
              "fetchPolicy": Js.Nullable.undefined,
            }),
          )
          ->(
              map(response => {
                let possibleResponse = Js.Nullable.toOption(response##data);
                switch (possibleResponse) {
                | Some(data) =>
                  let result = Article_Queries.SubmitForReview.parse(data);
                  switch (result##submitForReview |? (x => x##hash)) {
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
              map(
                (
                  offchainEventResponse: ReduxObservable.Dependencies.OffchainEvent.response,
                ) =>
                ReduxObservable.Dependencies.OffchainEvent.(
                  dataGet(offchainEventResponse)
                  ->submitArticleResponseGet
                  ->versionGet
                )
              )
            )
          ->(
              flatMap(_ => {
                let trackSubmitForReviewPayload =
                  App_Module.trackMixPanelPayload(
                    ~event="Offchain",
                    ~metaData=
                      App_Module.trackMixPanelMetaData(
                        ~resource="article",
                        ~resourceID,
                        ~resourceVersion=string_of_int(article_version),
                        ~resourceAction="submit for review draft article",
                      ),
                  );
                let trackSubmitForReviewAction =
                  App_Module.trackMixPanelAction(trackSubmitForReviewPayload);

                let notificationType =
                  App_Module.notificationTypeToJs(`Success);
                let showSubmitForReviewNotificationPayload =
                  App_Module.showNotificationPayload(
                    ~notificationType,
                    ~message="Article submitted",
                    ~description=
                      "Your draft article has been submitted for review or published if it's a personal article!",
                  );

                let showSubmitForReviewNotificationAction =
                  App_Module.showNotificationAction(
                    showSubmitForReviewNotificationPayload,
                  );

                of3(
                  trackSubmitForReviewAction,
                  showSubmitForReviewNotificationAction,
                  App_Module.routeChangeAction(
                    App_Module.route(
                      ~slug1=ArticleId(resourceID),
                      ~slug2=ArticleVersionId(article_version),
                      ~routeType=
                        category
                        ->Belt.Option.mapWithDefault(
                            App_Module.ArticlePublished, _ =>
                            App_Module.ArticleSubmitted
                          ),
                    ),
                  ),
                );
              })
            );
        })
      )
  );