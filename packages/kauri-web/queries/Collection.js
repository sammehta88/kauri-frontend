import gql from 'graphql-tag'

export const globalCollectionDetails = gql`
  query collection($id: String) {
    collection(id: $id) {
      id
      name
      background
      date_updated
      date_created
      description
      owner {
        user_id
        username
      }
      sections {
        name
        description
        article_id
        articles {
          article_id
          article_version
          user {
            user_id
            username
          }
          date_created
          request_id
          status
          tip
          text
          subject
        }
      }
    }
  }
`

export const getCollectionForAnalytics = gql`
  query getCollectionForAnalytics($id: String) {
    collection(id: $id) {
      id
      name
      background
      date_updated
      date_created
      description
      owner {
        user_id
        username
      }
      sections {
        name
        description
        article_id
        articles {
          article_id
          article_version
          user_id
          request_id
          date_created
          date_updated
          tip
          status
          subject
          sub_category
          category
          content_hash
          user {
            user_id
            username
          }
          metadata
        }
      }
    }
  }
`
