export const getAllCuratedList = (payload, maxResult, filter) => ({
    query: `query getAllCuratedList { getAllCuratedList  { id name header {
        ... on TopicDTO {
          id
          type
        }
        ... on CollectionDTO {
          id
          type
          name
        }
        ... on ArticleDTO {
          article_id
          type
        }
        ... on RequestDTO {
          request_id
          type
        }
      } description owner_id featured resources { type ... on TopicDTO { id } ... on RequestDTO { request_id user_id user {user_id, username} request_id date_created date_updated bounty subject category sub_category short_description text status total_vote total_flag total_submissions is_flagged metadata comments {comment_id comment} content_hash metadata  } ... on ArticleDTO { article_id, article_version, subject, user_id, date_created, request_id,  tip, text } ... on CollectionDTO { id name description date_created owner_id  sections { name description article_id articles { article_id, article_version, user_id, date_created, request_id,  tip, text  } }  } }  } } `,
    variables: {},
    operationName: "getAllCuratedList"
});

export const createCuratedList = (payload, maxResult, filter) => ({
    query: "mutation createCuratedList($name: String, $description: String, $featured: Boolean, $resources: [ResourceDTOInput]) { createCuratedList (name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
    variables: payload,
    operationName: "createCuratedList"
});

export const editCuratedList = (payload, maxResult, filter) => ({
    query: "mutation createCuratedList($id: String, $name: String, $description: String, $featured: Boolean, $resources: [ResourceDTOInput]) { createCuratedList (id: $id, name: $name, description: $description, featured: $featured, resources: $resources) {hash}    }",
    variables: payload,
    operationName: "createCuratedList"
});

export const removeCuratedList = (payload, maxResult, filter) => ({
    query: "mutation removeCuratedList($id: String) { removeCuratedList (id: $id) {hash} }",
    variables: payload,
    operationName: "removeCuratedList"
});

export const addResourceToCuratedList = (payload, maxResult, filter) => ({
    query: "mutation addResourceToCuratedList($id: String,  $resource: ResourceDTOInput) { addResourceToCuratedList (id: $id, resource: $resource) {hash}    }",
    variables: payload,
    operationName: "addResourceToCuratedList"
});

export const removeResourceFromCuratedList = (payload, maxResult, filter) => ({
    query: "mutation removeResourceFromCuratedList($id: String, $resource: ResourceDTOInput) { removeResourceFromCuratedList (id: $id, resource: $resource) {hash} }",
    variables: payload,
    operationName: "removeResourceFromCuratedList"
});

export const addHeaderToCuratedList = (payload, maxResult, filter) => ({
    query: "mutation addHeaderToCuratedList($id: String, $resource: ResourceDTOInput) { addHeaderToCuratedList (id: $id, resource: $resource) {hash}    }",
    variables: payload,
    operationName: "addHeaderToCuratedList"
});
