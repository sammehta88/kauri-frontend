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

type myarticle = {name: string};

let getArticle = article => article |? (x => x##article_id) |> default("");
let make = article => {name: getArticle(article)};