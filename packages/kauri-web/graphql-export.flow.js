/* @flow */

declare type GraphQLResponseRoot = {
  data?: QUERY_ROOT | MUTATION_ROOT,
  errors?: Array<GraphQLResponseError>,
}

declare type GraphQLResponseError = {
  message: string, // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>,
  [propName: string]: any, // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number,
  column: number,
}

/**
  Query root type
*/
declare type QUERY_ROOT = {
  /** downvoteArticle */
  downvoteArticle: ?ArticleDTO,
  /** createRequest */
  createRequest: ?RequestDTO,
  getRequest: ?RequestDTO,
  getArticle: ?ArticleDTO,
  /** editRequest */
  editRequest: ?RequestDTO,
  /** flagRequest */
  flagRequest: ?RequestDTO,
  searchArticles: ?Page_ArticleDTO,
  /** finaliseArticle */
  finaliseArticle: ?ArticleDTO,
  searchRequests: ?Page_RequestDTO,
  /** upvoteArticle */
  upvoteArticle: ?ArticleDTO,
  /** submitArticle */
  submitArticle: ?ArticleDTO,
  /** upvoteRequest */
  upvoteRequest: ?RequestDTO,
  /** preApproveArticle */
  preApproveArticle: ?ArticleDTO,
  /** editArticle */
  editArticle: ?ArticleDTO,
  /** rejectArticle */
  rejectArticle: ?ArticleDTO,
  /** downvoteRequest */
  downvoteRequest: ?RequestDTO,
  getRequestComment: ?Array<CommentDTO>,
  /** approveArticle */
  approveArticle: ?ArticleDTO,
  getArticleComment: ?Array<CommentDTO>,
}

declare type ArticleMetadataDTO = {
  LICENSE?: string,
  LICENSE_URL?: string,
  SEO?: string,
  FOR_VERSION?: string,
}

declare type ArticleDTO = {
  article_id: ?string,
  total_vote: ?number,
  date_updated: ?any,
  versions: ?Array<DocumentDTO>,
  user_id: ?string,
  date_created: ?any,
  category: ?string,
  sub_category: ?string,
  tip: ?number,
  text: ?string,
  request_id: ?string,
  status: ?ArticleStatus,
  subject: ?string,
  user: ?UserDTO,
  content_hash: ?string,
  metadata: ?ArticleMetadataDTO,
}

declare type DocumentDTO = {
  comments: ?Array<CommentDTO>,
  text: ?string,
  version: ?number,
  date_created: ?any,
}

declare type CommentDTO = {
  comment_id: ?number,
  highlight_from: ?number,
  highlight_to: ?number,
  anchor_key: ?string,
  focus_key: ?string,
  comment: ?string,
  user_id: ?string,
  date_created: ?any,
  user: ?UserDTO,
}

declare type UserDTO = {
  user_id: ?string,
  username: ?string,
  user_email: ?string,
}

declare type ArticleStatus = 'IN_REVIEW' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

declare type RequestDTO = {
  date_updated: ?any,
  comments: ?Array<CommentDTO>,
  date_created: ?any,
  dead_line: ?number,
  /** bounty */
  bounty: ?number,
  /** subject */
  subject: ?string,
  total_flag: ?number,
  total_vote: ?number,
  total_submissions: ?number,
  user_id: ?string,
  /** text */
  text: ?string,
  /** category */
  category: ?string,
  content_hash: ?string,
  sub_category: ?string,
  request_id: ?string,
  is_flagged: ?boolean,
  /** status */
  status: ?RequestStatus,
  user: ?UserDTO,
}

declare type RequestStatus = 'CREATED' | 'OPENED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED' | 'IN_MODERATION_PERIOD'

declare type Page_ArticleDTO = {
  /** number */
  number: ?number,
  /** numberOfElements */
  numberOfElements: ?number,
  /** last */
  last: ?boolean,
  /** size */
  size: ?number,
  /** totalPages */
  totalPages: ?number,
  /** first */
  first: ?boolean,
  /** content */
  content: ?Array<ArticleDTO>,
  /** totalElements */
  totalElements: ?any,
  _type_: ?string,
}

declare type CategoryInput = 'metamask' | 'ethereum' | 'kauri'

declare type ArticleFilterInput = {
  category_in: Array<?CategoryInput>,
  date_created_gt: ?any,
  subject_ct: ?string,
  full_text: ?string,
  text_ct: ?string,
  request_id_eq: ?string,
  userId: ?string,
  user_id_eq: ?string,
  status_in: ?Array<ArticleStatusInput>,
  date_updated_lt: ?any,
  date_created_lt: ?any,
  dateUpdatedGreaterThan: ?any,
}

declare type ArticleStatusInput = 'PENDING' | 'PRE_APPROVED' | 'COMPLETED' | 'APPROVED' | 'REJECTED'

declare type DirectionInput = 'ASC' | 'DESC'

declare type Page_RequestDTO = {
  /** number */
  number: ?number,
  /** numberOfElements */
  numberOfElements: ?number,
  /** last */
  last: ?boolean,
  /** size */
  size: ?number,
  /** totalPages */
  totalPages: ?number,
  /** first */
  first: ?boolean,
  /** content */
  content: ?Array<RequestDTO>,
  /** totalElements */
  totalElements: ?any,
  _type_: ?string,
}

declare type RequestFilterInput = {
  category_in: ?Array<CategoryInput>,
  date_created_gt: ?any,
  subject_ct: ?string,
  full_text: ?string,
  text_ct: ?string,
  user_id_eq: ?string,
  status_in: ?Array<RequestStatusInput>,
  date_updated_lt: ?any,
  date_created_lt: ?any,
  dateUpdatedGreaterThan: ?any,
}

declare type RequestStatusInput =
  | 'CREATED'
  | 'OPENED'
  | 'IN_PROGRESS'
  | 'CLOSED'
  | 'CANCELLATION_IN_PROGRESS'
  | 'CANCELED'

/**
  Mutation root type
*/
declare type MUTATION_ROOT = {
  downvoteArticle: ?ArticleDTO,
  commentArticle: ?boolean,
  createRequest: ?RequestDTO,
  editRequest: ?RequestDTO,
  flagRequest: ?RequestDTO,
  finaliseArticle: ?ArticleDTO,
  upvoteArticle: ?ArticleDTO,
  submitArticle: ?ArticleDTO,
  upvoteRequest: ?RequestDTO,
  preApproveArticle: ?ArticleDTO,
  commentRequest: ?boolean,
  editArticle: ?ArticleDTO,
  rejectArticle: ?ArticleDTO,
  downvoteRequest: ?RequestDTO,
  approveArticle: ?ArticleDTO,
}
