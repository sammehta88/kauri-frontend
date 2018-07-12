[@bs.deriving abstract]
type reduxState = {
  hey: int,
  woo: string,
};

type store = {getState: unit => reduxState};