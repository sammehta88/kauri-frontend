import gql from 'graphql-tag'

export const getUserForAnalytics = gql`
  query getUser($userId: String) {
    getUser(id: $userId) {
      user_id
      username
    }
  }
`
