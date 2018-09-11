import gql from 'graphql-tag'

export const Community = gql`
  fragment Community on CommunityDTO {
    id 
    name
  }
`
