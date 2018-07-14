[@bs.deriving abstract]
type reduxState = {
  hey: int,
  woo: string,
};

[@bs.deriving abstract]
type store = {getState: unit => reduxState};