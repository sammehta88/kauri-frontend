import gql from 'graphql-tag'

export const Article = gql`
  fragment Article on ArticleDTO {
    id
    version
    title
    content
    dateCreated
    datePublished
    status
    attributes
    contentHash
    checkpoint
    vote {
      totalVote
    }
    author {
      id
      name
    }
    comments {
      content {
        author {
          id
          name
        }
        posted
        body
      }
      totalPages
      totalElements
    }
    resourceIdentifier {
      id
      type
      version
    }
  }
`

export const submitArticle = gql`
  mutation submitArticle(
    $article_id: String
    $text: String
    $subject: String
    $metadata: Map_String_StringScalar,
    $version: Int
  ) {
    submitArticle(
      id: $article_id
      content: $text
      title: $subject
      attributes: $metadata
      version: $version
    ) {
      hash
    }
  }
`

export const commentArticle = gql`
  mutation commentArticle(
    $comment: String
    $highlight_from: Int
    $highlight_to: Int
    $article_id: String
    $article_version: Int
    $anchor_key: String
    $focus_key: String
  ) {
    commentArticle(
      comment: $comment
      highlight_from: $highlight_from
      highlight_to: $highlight_to
      id: $article_id
      version: $article_version
      anchor_key: $anchor_key
      focus_key: $focus_key
    ) {
      hash
    }
  }
`

export const getArticle = gql`
  query getArticle($id: String, $version: Int, $published: Boolean = false) {
    getArticle(id: $id, version: $version, published: $published) {
      ...Article
    }
  }

  ${Article}
`

export const getArticleForAnalytics = gql`
  query getArticle($id: String, $version: Int, $published: Boolean = false) {
    getArticle(id: $id, version: $version, published: $published) {
      id
      version
      title
      dateCreated
      datePublished
      status
      attributes
      contentHash
      checkpoint
      vote {
        totalVote
      }
      author {
        id
        name
      }
      resourceIdentifier {
        id
        type
        version
      }
    }
  }
`

export const editArticle = gql`
  mutation editArticleVersion($article_id: String, $article_version: Int, $text: String, $subject: String) {
    editArticle(id: $article_id, version: $article_version, content: $text, title: $subject) {
      hash
    }
  }
`

export const searchApprovedArticles = gql`
  query searchApprovedArticles($size: Int = 500, $text: String, $category: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: { full_text: $text, status_in: [PUBLISHED], category_in: [$category] }
    ) {
      totalElements
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        comments {
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
        }
        user {
          user_id
          username
        }
      }
    }
  }
`

export const globalSearchApprovedCategoryArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $category: String) {
    searchArticles(
      size: $size
      dir: DESC
      filter: { category_in: [$category], status_in: [PUBLISHED], latest_version: true }
    ) {
      totalElements
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        comments {
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
        }
      }
    }
  }
`

export const globalSearchApprovedArticles = gql`
  query globalSearchApprovedArticles($size: Int = 500, $text: String) {
    searchArticles(size: $size, dir: DESC, filter: { full_text: $text, status_in: [PUBLISHED], latest_version: true }) {
      totalElements
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        status
        category
        sub_category
        subject
        text
        comments {
          date_created
          comment
          highlight_from
          highlight_to
          anchor_key
          focus_key
        }
      }
    }
  }
`

export const searchPersonalSubmittedArticles = gql`
  query searchPersonalSubmittedArticles($size: Int = 500, $userId: String) {
    searchArticles(size: $size, dir: DESC, filter: { user_id_eq: $userId }) {
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        status
        category
        sub_category
        subject
        comments {
          date_created
        }
        user {
          username
          user_id
        }
      }
    }
  }
`

export const searchPendingArticles = gql`
  query searchPendingArticles($size: Int = 500, $filter: ArticleFilterInput) {
    searchArticles(size: $size, dir: DESC, filter: $filter) {
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        content_hash
        status
        category
        sub_category
        subject
        comments {
          date_created
        }
        user {
          username
          user_id
        }
      }
      totalElements
    }
  }
`

export const getTotalArticlesCount = gql`
  query getTotalArticlesCount($category: String) {
    searchArticles(filter: { category_in: [$category], status_in: [PUBLISHED] }) {
      totalElements
    }
  }
`

export const totalArticlesCount = gql`
  query totalArticlesCount($filter: ArticleFilterInput) {
    searchArticles(filter: $filter) {
      totalElements
    }
  }
`

export const rejectArticle = gql`
  mutation rejectArticle($article_id: String, $article_version: Int, $rejection_cause: String) {
    rejectArticle(id: $article_id, version: $article_version, rejection_cause: $rejection_cause) {
      hash
    }
  }
`

export const searchPublishedArticleHistory = gql`
  query searchPublishedArticleHistory($userId: String, $categories: [String]) {
    searchArticles(filter: { category_in: $categories, status_in: [PUBLISHED], moderator_eq: $userId }) {
      content {
        id
        version
        user_id
        request_id
        date_created
        date_updated
        tip
        text
        status
        category
        sub_category
        subject
        comments {
          date_created
        }
        user {
          username
        }
      }
      totalElements
    }
  }
`

export const storeArticleOwnershipSignature = gql`
  mutation storeArticleOwnershipSignature($id: String, $signature: String) {
    storeArticleOwnershipSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const storeArticleValidationSignature = gql`
  mutation storeArticleValidationSignature($id: String, $signature: String) {
    storeArticleValidationSignature(id: $id, signature: $signature) {
      hash
    }
  }
`

export const deleteArticleComment = gql`
  mutation deleteArticleComment($article_id: String, $comment_id: Int) {
    deleteArticleComment(id: $article_id, comment_id: $comment_id) {
      hash
    }
  }
`
