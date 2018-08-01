let component = ReasonReact.statelessComponent("BaseCard");

module Styles = {
  let card =
    Css.(
      [%css
        {|
        {
          display: flexBox;
          flex-direction: column;
          min-height: 270px;
          width: 290px;
          border-radius: 4px;
          background-color: #FFFFFF;
          cursor: pointer;
          box-shadow: 0 0 4px 0 rgba(0,0,0,0.11);
          transition-property: "all";
          transition-duration: 300;
      }
      :hover {
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.22);
      }
      |}
      ]
    )
    |> Css.style;
};

let make = (_children) => {
  ...component,
  render: _self =>
    <div className=Styles.card> (_children |> ReasonReact.array) </div>,
};