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
  version: int,
  content_hash: string,
  category: string,
};

type actionType =
  | ApproveArticle;

let stringOfActionType = actionType =>
  switch (actionType) {
  | ApproveArticle => "TRACK_ANALYTICS"
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
  approveArticleAction(~type_=stringOfActionType(ApproveArticle), ~payload);

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

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($id: String, $article_version: Int, $signature: String) {
      approveArticle(id: $id, article_version: $article_version, signature: $signature) {
         hash
        }
    }
  |}
];

module ApproveArticleQuery = ReasonApollo.CreateQuery(ApproveArticle);
let approveArticleQuery =
  ApproveArticle.make(~id="993d89122c124b9aba49e07f41c21752", ());
[@bs.val] external studentAges : string = "subscriber";

let approveArticleEpic =
    (action: approveArticleAction, _store: store, dependencies: dependencies) => {
  let apolloClient = dependencies |. apolloClientGet;
  let subscriber = dependencies |. subscribeToOffchainEvent;
  let queryMethod = {
    "mutation": CreateRequestQuery.graphqlMutationAST,
    "variables": createRequestQuery##variables,
    /* interesting.. */
    "fetchPolicy": Js.Nullable.undefined,
  };
  let queryMethodTo = {
    "query": CreateRequestQuery.graphqlMutationAST,
    "variables": createRequestQuery##variables,
    /* interesting.. */
    "fetchPolicy": Js.Nullable.return("network-only"),
  };
  ReduxObservable.Observable.(
    action
    |. ofType(stringOfActionType(ApproveArticle))
    |. switchMap(_action =>
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
         |. mergeMap(hash => fromPromise(subscriber([|hash|])))
         |. mergeMap(_hash =>
              fromPromise(apolloClient##query(queryMethodTo))
            )
         /* idk; works */
         |. flatMapTo(of3({"a": 1}, {"f": 2}, {"w": 3}))
         |. mapTo({"heyt": "wow"})
         |. catch(err => of1(err))
       )
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