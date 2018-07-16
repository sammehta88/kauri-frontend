open ReduxObservable.Store;
open ReduxObservable.Dependencies;

exception NoHashFound;
exception NoResponseData;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

[@bs.deriving abstract]
type approveArticlePayload = {
  id: string,
  article_version: int,
};

[@bs.deriving abstract]
type reduxAction = {
  [@bs.as "type"]
  type_: string,
};

[@bs.deriving abstract]
type approveArticleAction = {
  [@bs.as "type"]
  type_: string,
  payload: approveArticlePayload,
};

let approveArticleAction =
    (payload: approveArticlePayload)
    : approveArticleAction =>
  approveArticleAction(~type_="APPROVE_ARTICLE", ~payload);

module CreateRequest = [%graphql
  {|
  mutation(
    $bounty: Float
    $subject: String
    $text: String
    $category: String
    $dead_line: Date
    $sub_category: String
  ) {
    createRequest(
      bounty: $bounty
      subject: $subject
      text: $text
      category: $category
      dead_line: $dead_line
      sub_category: $sub_category
    ) {
      hash
    }
  }
|}
];

module CreateRequestQuery = ReasonApollo.CreateMutation(CreateRequest);

let createRequestQuery =
  CreateRequest.make(
    ~bounty=1.0,
    ~subject="lol",
    ~text=
      "{\"markdown\":\"dasasd\",\"html\":\"<p>dasasd</p>\",\"draftEditorState\":{\"_immutable\":{\"allowUndo\":true,\"currentContent\":{\"entityMap\":{},\"blockMap\":{\"frtqs\":{\"key\":\"frtqs\",\"type\":\"unstyled\",\"text\":\"dasasd\",\"characterList\":[{\"style\":[],\"entity\":null},{\"style\":[],\"entity\":null},{\"style\":[],\"entity\":null},{\"style\":[],\"entity\":null},{\"style\":[],\"entity\":null},{\"style\":[],\"entity\":null}],\"depth\":0,\"data\":{}}},\"selectionBefore\":{\"anchorKey\":\"frtqs\",\"anchorOffset\":0,\"focusKey\":\"frtqs\",\"focusOffset\":0,\"isBackward\":false,\"hasFocus\":true},\"selectionAfter\":{\"anchorKey\":\"frtqs\",\"anchorOffset\":6,\"focusKey\":\"frtqs\",\"focusOffset\":6,\"isBackward\":false,\"hasFocus\":true}},\"decorator\":null,\"directionMap\":{\"frtqs\":\"LTR\"},\"forceSelection\":false,\"inCompositionMode\":false,\"inlineStyleOverride\":null,\"lastChangeType\":\"insert-characters\",\"nativelyRenderedContent\":null,\"redoStack\":[],\"selection\":{\"anchorKey\":\"frtqs\",\"anchorOffset\":6,\"focusKey\":\"frtqs\",\"focusOffset\":6,\"isBackward\":false,\"hasFocus\":false},\"treeMap\":{\"frtqs\":[{\"start\":0,\"end\":6,\"decoratorKey\":null,\"leaves\":[{\"start\":0,\"end\":6}]}]},\"undoStack\":[{\"entityMap\":{},\"blockMap\":{\"frtqs\":{\"key\":\"frtqs\",\"type\":\"unstyled\",\"text\":\"\",\"characterList\":[],\"depth\":0,\"data\":{}}},\"selectionBefore\":{\"anchorKey\":\"frtqs\",\"anchorOffset\":0,\"focusKey\":\"frtqs\",\"focusOffset\":0,\"isBackward\":false,\"hasFocus\":false},\"selectionAfter\":{\"anchorKey\":\"frtqs\",\"anchorOffset\":0,\"focusKey\":\"frtqs\",\"focusOffset\":0,\"isBackward\":false,\"hasFocus\":false}}]}}}",
    ~category="kauri",
    ~dead_line="1531842285127" |. Js.Json.parseExn,
    /* Js.Json.parseExn(string_of_float(Js.Date.now())) */
    ~sub_category="general",
    (),
  );

module GetArticle = [%graphql
  {|
    query getArticle($article_id: String) {
      getArticle(id: $article_id) {
        article_id
        user_id
        request_id
        date_created
        date_updated
        text
        tip
        status
        subject
        sub_category
        category
        content_hash
        comments {
          comment_id
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
          user {
            username
          }
        }
        user {
          user_id
          username
        }
        metadata
      }
    }
  |}
];

module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

let getArticleQuery = GetArticle.make(~article_id="XYZ", ());

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($id: String!, $article_version: Int!, $signature: String!) {
      approveArticle(id: $id, article_version: $article_version, signature: $signature) {
         hash
        }
    }
  |}
];

module ApproveArticleMutation = ReasonApollo.CreateMutation(ApproveArticle);
[@bs.val] external studentAges : string = "subscriber";

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) => {
  let apolloClient = dependencies |. apolloClientGet;
  let subscriber = dependencies |. subscribeToOffchainEvent;
  let resourceID = action |. payloadGet |. idGet;
  let article_version = action |. payloadGet |. article_versionGet;
  let signature = "";
  let approveArticleMutation =
    ApproveArticle.make(
      ~id="993d89122c124b9aba49e07f41c21752",
      ~article_version,
      ~signature,
      (),
    );

  let queryMethod = {
    "mutation": ApproveArticleMutation.graphqlMutationAST,
    "variables": approveArticleMutation##variables,
    /* interesting.. */
    "fetchPolicy": Js.Nullable.undefined,
  };
  let queryMethodTo = {
    "query": GetArticleQuery.graphqlQueryAST,
    "variables": getArticleQuery##variables,
    /* interesting.. */
    "fetchPolicy": Js.Nullable.return("network-only"),
  };

  ReduxObservable.Observable.(
    action
    |. ofType("APPROVE_ARTICLE")
    |. switchMap(action => {
         open Mixpanel_Module;
         let metaData = {
           "resource": "article",
           "resourceID": resourceID,
           "resourceAction": "approve article",
         };
         let trackApproveArticlePayload =
           trackMixPanelPayload(~event="Offchain", ~metaData);
         let trackApproveArticleAction =
           trackMixPanelAction(trackApproveArticlePayload);
         open App_Module;
         let notificationType = notificationTypeToJs(`Success);
         let showApproveArticleNotificationPayload =
           showNotificationPayload(
             ~notificationType,
             ~message="Article approved",
             ~description=
               "This approved article now needs to be published by the author",
           );

         let showApproveArticleNotificationAction =
           showNotificationAction(showApproveArticleNotificationPayload);

         fromPromise(apolloClient##mutate(queryMethod))
         |. map(response => {
              let possibleResponse = Js.Nullable.toOption(response##data);
              switch (possibleResponse) {
              | Some(data) =>
                let result = CreateRequest.parse(data);
                switch (result##createRequest |? (x => x##hash)) {
                | Some(hash) => hash
                | None => raise(NoHashFound)
                };
              | _ => raise(NoResponseData)
              };
            })
         |. tap(x => {
              Js.log(x);
              x;
            })
         |. mergeMap(hash => fromPromise(subscriber([|hash|])))
         |. tap(x => {
              Js.log(x);
              x;
            })
         |. mergeMap(_hash =>
              fromPromise(apolloClient##query(queryMethodTo))
            )
         |. tap(x => {
              Js.log(x);
              x;
            })
         /* idk; works */
         |. flatMapTo(
              of3(
                trackApproveArticleAction,
                showApproveArticleNotificationAction,
                routeChangeAction(
                  route(~routeType=ArticleApproved, ~slug=resourceID),
                ),
              ),
            )
         /* |. mapTo({"heyt": "wow"}) */
         |. catch(err => {
              Js.log(err);
              of1(showErrorNotificationAction(err));
            });
       })
  );
  /* |. catch(err => of1(err)) */
  /* |. mergeMap({ data: { approveArticle: { hash } } }) => fromPromise(subscriber(x |. type_))) */
  /* |. mapTo(reduxAction(~type_="HEY")) */
  /* |. flatMap(x => fromPromise(Js.Promise.resolve(1))) */
  /* |. flatMap(x => of1(x |. payload))
     |. mergeMap(x => of1(x |. version)) */
};
/* let signature = ...Some genius , */
/* let hey = action |. payloadGet; */
/* let state = store.getState(); */
/* let me = dependencies |. driverJSGet |. getDriver(2); */