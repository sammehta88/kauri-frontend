let component = ReasonReact.statelessComponent("PostedDate");

module Styles = {
  let container =
    Css.(
      [%css
        {|
          {
            color: #FFFFFF;
            font-size: 12px;
            font-weight: 500;
          }
          > :last-child {
            margin-left: 12px;
            font-weight: 700;
          }
        |}
      ]
    )
    |> Css.style;
};

type dateType =
  | FromNow
  | Posted
  | Updated;
let getDateType = dateType =>
  switch (dateType) {
  | FromNow => "Posted "
  | Posted => "Posted "
  | Updated => "Updated "
  };

let parseDateField = (dateType, date_field) =>
  switch (dateType) {
  | FromNow =>
    MomentRe.Moment.(
      fromNow(MomentRe.moment(date_field), ~withoutSuffix=Some(false))
    )
  | Updated =>
    MomentRe.Moment.(
      fromNow(MomentRe.moment(date_field), ~withoutSuffix=Some(false))
    )

  | Posted =>
    MomentRe.Moment.(format("D MMMM YYYY", MomentRe.moment(date_field)))
  };
let make = (~dateType, ~date_field: string, _children) => {
  ...component, /* spread the template's other defaults into here  */
  render: _self =>
    Vrroom.(
      <div className=Styles.container>
        <span> (getDateType(dateType) |. String.uppercase |. text) </span>
        <span>
          (parseDateField(dateType, date_field) |. String.uppercase |. text)
        </span>
      </div>
    ),
};