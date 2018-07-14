open ReduxObservable.Store;
open ReduxObservable.Dependencies;

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
  let queryMethod = {
    "mutation": CreateRequestQuery.graphqlMutationAST,
    "variables": createRequestQuery##variables,
  };
  let subscriber = dependencies |. apolloSubscriber;
  subscriber([|"wow", "omg"|]);

  let (|?) = (a, b) =>
    switch (a) {
    | None => None
    | Some(a) => b(a)
    };

  ReduxObservable.Observable.(
    action
    |. ofType(stringOfActionType(ApproveArticle))
    |. tap(_x => Js.log(of1))
    /* |. tap(_x => Js.log(apolloClient##query(queryMethod))) */
    |. mergeMap(_x => fromPromise(apolloClient##mutate(queryMethod)))
    |. tap(response => {
         let possibleResponse = Js.Nullable.toOption(response##data);
         switch (possibleResponse) {
         | Some(data) =>
           let result = CreateRequest.parse(data);
           switch (result##createRequest |? (x => x##hash)) {
           | Some(x) => Js.log(x)
           | None => Js.log("lol")
           };
         | _ => Js.log(response##data)
         };
       })
    |. flatMap(x => of1(x))
  );
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