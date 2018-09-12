module GetArticle = [%graphql
  {|
    query getArticle($article_id: String!, $version: Int!) {
      getArticle(id: $article_id, version: $version) {
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
    }
  |}
];

module GetArticleQuery = ReasonApollo.CreateQuery(GetArticle);

module ApproveArticle = [%graphql
  {|
    mutation approveArticle($article_id: String!, $version: Int!, $signature: String!) {
      approveArticle(id: $article_id, version: $version, signature: $signature) {
         hash
      }
    }
  |}
];

module ApproveArticleMutation = ReasonApollo.CreateMutation(ApproveArticle);

module DraftArticle = [%graphql
  {|
    mutation submitArticle($id: String, $subject: String, $text: String, $metadata: Map_String_StringScalar) {
      submitArticle (id: $id, title: $subject, content: $text, attributes: $metadata) {
        hash
      }
    }
  |}
];

module DraftArticleMutation = ReasonApollo.CreateMutation(DraftArticle);

module PublishArticle = [%graphql
  {|
    mutation publishArticle($id: String, $version: Int, $owner: ResourceIdentifierInput, $signature: String) {
      publishArticle (id: $id, version: $version, owner: $owner, signature: $signature) {
        hash
      }
    }
  |}
];

module PublishArticleMutation = ReasonApollo.CreateMutation(PublishArticle);

module SearchPersonalArticles = [%graphql
  {|
    query searchPersonalArticles($userId: String) {
       searchArticles (filter: { ownerIdEquals: $userId } ) {
          content {
             id, version, title, content, dateCreated, datePublished, author {
                id, name }
                 status, attributes, contentHash, checkpoint, vote { totalVote }, comments { content { posted author { id, name }, body }, totalPages, totalElements  }
                 resourceIdentifier { type, id, version } } totalPages totalElements }
                }

  |}
];

module SearchPersonalArticlesQuery =
  ReasonApollo.CreateQuery(SearchPersonalArticles);

module GetArticles = [%graphql
  {|
    query searchArticles {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true }) {
            content {
              id, version, title, content, dateCreated, datePublished, author {
                id, name }
                 status, attributes, contentHash, checkpoint, vote { totalVote }, comments { content { posted author { id, name }, body }, totalPages, totalElements  }
                 resourceIdentifier { type, id, version }             }
            totalPages
            totalElements
        }
    }
|}
];

module GetArticlesQuery = ReasonApollo.CreateQuery(GetArticles);

module SearchCommunityArticles = [%graphql
  {|
    query searchCommunityArticles($category: String) {
        searchArticles (filter: { status_in: [PUBLISHED], latestBersion: true, categoryIn: [$category] }) {
            content {
              id, version, title, content, dateCreated, datePublished
              author {
                id
                 name
              }
              status, attributes, contentHash, checkpoint,
               vote { totalVote },
               comments {
                 content { posted author { id, name }, body }, totalPages, totalElements
              }
              resourceIdentifier { type, id, version }
            }
            totalPages
            totalElements
        }
    }
  |}
];

module SearchCommunityArticlesQuery =
  ReasonApollo.CreateQuery(SearchCommunityArticles);

module CommunityArticlesCount = [%graphql
  {|
    query communityArticlesCount($category: String) {
        searchArticles (filter: { status_in: [PUBLISHED], latest_version: true, category_in: [$category] }) {
            content {
              id
            }
            totalElements
        }
    }
  |}
];

module CommunityArticlesCountQuery =
  ReasonApollo.CreateQuery(CommunityArticlesCount);