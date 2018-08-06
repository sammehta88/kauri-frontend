import gql from 'graphql-tag'

export const globalCollectionDetails = gql`
  mutation submitArticle(
    $article_id: String
    $request_id: String
    $text: String
    $subject: String
    $sub_category: String
    $category: String
    $metadata: Map_String_StringScalar
    $author_id: String
  ) {
    submitArticle(
      id: $article_id
      request_id: $request_id
      text: $text
      subject: $subject
      sub_category: $sub_category
      category: $category
      metadata: $metadata
      author_id: $author_id
      draft: false
    ) {
      hash
    }
  }
`;