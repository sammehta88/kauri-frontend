open Infix_Utilities;

let userIdGet = article =>
  article
  |? (article => article##author)
  |? (author => author##id)
  |> default("");

let usernameGet = article =>
  article
  |? (article => article##author)
  |? (author => author##name)
  |> default(
       article
       |? (article => article##author)
       |? (author => author##id)
       |> default("Unknown Writer")
       |> (
         userId =>
           String.sub(userId, 0, 11)
           ++ "..."
           ++ String.sub(userId, String.length(userId) - 13, 11)
       ),
     );

let dateUpdatedGet = article =>
  article
  |? (article => article##datePublished)
  |? (datePublished => Js.Json.decodeString(datePublished))
  |> default("")
  |> MomentRe.moment
  |> MomentRe.Moment.(fromNow(~withoutSuffix=Some(false)));

let keyGet = article =>
  article
  |? (article => article##id)
  |> default("")
  |> (
    articleId =>
      articleId
      ++ (article |? (x => x##version) |> default(0) |> string_of_int)
  );
let articleIdGet = article => article |? (x => x##id) |> default("");
let articleVersionGet = article => article |? (x => x##version) |> default(1);

let titleGet = article =>
  article |? (article => article##title) |> default("");

let contentGet = article =>
  article |? (article => article##content) |> default("");

type articleResource = {
  key: string,
  articleId: string,
  articleVersion: int,
  title: string,
  content: string,
  date: string,
  username: string,
  userId: string,
};

let make = article => {
  let (key, articleId, articleVersion, title, content, date, username, userId) =
    article
    ->(
        keyGet,
        articleIdGet,
        articleVersionGet,
        titleGet,
        contentGet,
        dateUpdatedGet,
        usernameGet,
        userIdGet,
      );
  {key, articleId, articleVersion, title, content, date, username, userId};
};

/* Extra getters  */

let articlesCountGet = response =>
  response##searchArticles
  |? (x => x##content)
  |> default([||])
  |> Array.length;