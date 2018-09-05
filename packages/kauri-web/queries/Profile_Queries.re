module AddUser = [%graphql
  {|
    query AddUser(
      $username: String,
      $email: String,
      $title: String,
      $website: String,
      $avatar: String,
      $social: Map_String_StringScalar
    ) {
      addUser(
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

module AddUserQuery = ReasonApollo.CreateQuery(AddUser);