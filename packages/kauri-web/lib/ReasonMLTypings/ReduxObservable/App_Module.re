/* ShowNotificationAction */
[@bs.deriving jsConverter]
type notificationType = [
  | [@bs.as "success"] `Success
  | [@bs.as "info"] `Info
  | [@bs.as "warning"] `Warning
  | [@bs.as "error"] `Error
];

[@bs.deriving abstract]
type showNotificationPayload = {
  notificationType: string,
  message: string,
  description: string,
};

[@bs.deriving abstract]
type showNotificationAction = {
  [@bs.as "type"]
  type_: string,
  payload: showNotificationPayload,
};

let showErrorNotificationPayload =
  showNotificationPayload(
    ~notificationType=notificationTypeToJs(`Error),
    ~message="Submission error",
    ~description="Please try again",
  );

let showErrorNotificationAction = _err =>
  showNotificationAction(
    ~type_="SHOW_NOTIFICATION",
    ~payload=showErrorNotificationPayload,
  );

let showNotificationAction = payload =>
  showNotificationAction(~type_="SHOW_NOTIFICATION", ~payload);

/* RouteChangeAction */

type routeType =
  | Back
  | ArticleApproved;

let route = (~routeType: routeType, ~slug: option(string)=?) =>
  switch (routeType, slug) {
  | (ArticleApproved, Some(slug)) =>
    "/article" ++ slug ++ "/article-approved"
  | (Back, None) => "back"
  | _ => ""
  };

[@bs.deriving abstract]
type routeChangeAction = {
  [@bs.as "type"]
  type_: string,
  payload: string,
};

let routeChangeAction = (payload: string) =>
  routeChangeAction(~type_="ROUTE_CHANGE", ~payload);