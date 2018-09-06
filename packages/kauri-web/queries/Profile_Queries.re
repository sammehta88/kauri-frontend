module AddUser = [%graphql
  {|
    mutation saveUser(
      $username: String,
      $email: String,
      $title: String,
      $website: String,
      $avatar: String,
      $social: Map_String_StringScalar
    ) {
      saveUser (
        username: $username,
        email: $email
        title: $title,
        website: $website,
        avatar: $avatar,
        social: $social
      ) {
        hash
      }
    }
  |}
];

module AddUserMutation = ReasonApollo.CreateMutation(AddUser);