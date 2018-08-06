import gql from 'graphql-tag'

export const globalCollectionDetails = gql`
    query collection($id: String) {
        collection(id: $id) {
            id,
            name,
            date_created,
            description,
            owner {
                username
            }
            sections {
                name
                description
                article_id
                articles {
                    article_id,
                    article_version,
                    user_id,
                    date_created,
                    request_id,
                    status,
                    tip,
                    text
                    subject
                }
            }
        }
    }
`;