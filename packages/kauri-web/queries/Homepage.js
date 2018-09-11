import gql from 'graphql-tag'
import { Article } from './Article'
import { Collection } from './Collection'
import { Community } from './Community'
import { User } from './User'

export const HomePageQuery = gql`
  query getAllCuratedList {
    getAllCuratedList { 
      id 
      name 
      description
      featured
      dateCreated
      owner {
         id 
         name 
      }
      header {
        ...Article
        ...Collection
        ...Community
        ...User
      } 
      resources {
        ...Article
        ...Collection
        ...Community
        ...User      
      }
    } 
  }

  ${Article}
  ${Collection}
  ${Community}
  ${User}
`
