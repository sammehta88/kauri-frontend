let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

let default = (a, b) =>
  switch (b) {
  | None => a
  | Some(b) => b
  };

let usernameGet = article =>
  article
  |? (article => article##user)
  |? (user => user##username)
  |> default(
       article
       |? (article => article##user)
       |? (user => user##user_id)
       |> default("Unknown Writer"),
     );

let dateUpdatedGet = article =>
  article
  |? (article => article##date_updated)
  |? (date_updated => Js.Json.decodeString(date_updated))
  |> default("")
  |> MomentRe.moment
  |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)));

let keyGet = article =>
  article
  |? (article => article##article_id)
  |> default("")
  |> (
    articleId =>
      articleId
      ++ (article |? (x => x##article_version) |> default(0) |> string_of_int)
  );
let articleIdGet = article => article |? (x => x##article_id) |> default("");
let articleVersionGet = article =>
  article |? (x => x##article_version) |> default(1);

let titleGet = article =>
  article |? (article => article##subject) |> default("");

let contentGet = article =>
  article |? (article => article##text) |> default("");

type articleResource = {
  key: string,
  articleId: string,
  articleVersion: int,
  title: string,
  content: string,
  date: string,
  username: string,
};

let make = article => {
  let (key, articleId, articleVersion, title, content, date, username) =
    article
    |. (
      keyGet,
      articleIdGet,
      articleVersionGet,
      titleGet,
      contentGet,
      dateUpdatedGet,
      usernameGet,
    );
  {key, articleId, articleVersion, title, content, date, username};
};

/* Extra getters  */

let articlesCountGet = response =>
  response##searchArticles
  |? (x => x##content)
  |> default([||])
  |> Array.length;