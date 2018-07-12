type observable('a);

[@bs.module "rxjs"] external of1 : 'a => observable('a) = "of";

[@bs.send] external ofType : ('a, string) => 'a = "";

/* [@bs.send] external mergeMap : ('t, 't => 'b) => t('b) = ""; */
[@bs.module "rxjs"]
external fromPromise : Js.Promise.t('a) => observable('a) = "";

[@bs.send] external filter : ('a, 'b => bool) => 'b = "";

[@bs.send] external flatMap : ('a, 'a => observable('b)) => 'b = "";

[@bs.send] external mergeMap : ('a, 'a => observable('b)) => 'b = "";

/* let hello = a => */
/* a |. ofType |. flatMap(x => x / 2) |. flatMap(y => y + a) |. mergeMap(x => x); */
let what =
  fromPromise(Js.Promise.resolve([1, 2]))
  |. filter(x => x === "hey")
  |. flatMap(x => of1(String.uppercase(x)))
  |. mergeMap(x => fromPromise(Js.Promise.resolve(x ++ "HEY")))
  |. flatMap(x => of1(int_of_string(x)));

/* Redux deps */