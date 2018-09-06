import gql from 'graphql-tag'

export const getMyProfile = gql`
  query getMyProfile {
    getMyProfile {
      id,
      name,
      email,
      title,
      website,
      avatar,
      social
    }
  }
`