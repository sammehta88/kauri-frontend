/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query | Mutation;
  errors?: Array<GraphQLResponseError>;
}

declare type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

/**
  Query root type
*/
declare type Query = {
  GetCuratedList: ?CuratedListDTO;
  editArticleVersion: ?MutationResponse;
  addUser: ?MutationResponse;
  submitArticleVersion: ?MutationResponse;
  createCuratedList: ?MutationResponse;
  submitResource: ?MutationResponse;
  GetComment: ?Page_CommentDTO;
  addResourceToCuratedList: ?MutationResponse;
  removeResource: ?MutationResponse;
  GetMyProfile: ?UserDTO;
  GetArticle: ?ArticleDTO;
  approveResource: ?MutationResponse;
  addComment: ?MutationResponse;
  vote: ?MutationResponse;
  approveArticle: ?MutationResponse;
  GetUser: ?PublicUserDTO;
  SearchCommunities: ?Page_CommunityDTO;
  GetCollection: ?CollectionDTO;
  GetAllCuratedList: ?Array<CuratedListDTO>;
  resource: ?AbstractResourceDTO;
  removeCuratedList: ?MutationResponse;
  publishArticle: ?MutationResponse;
  resources: ?Array<AbstractResourceDTO>;
  SearchCollections: ?Page_CollectionDTO;
  GetCommunity: ?CommunityDTO;
  addHeaderToCuratedList: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  submitNewArticle: ?MutationResponse;
  SearchArticles: ?Page_ArticleDTO;
  GetArticleProof: ?ArticleProof;
  submitArticle: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  checkpointArticles: ?MutationResponse;
  CountVote: ?VoteStatDTO;
  createCollection: ?MutationResponse;
}

declare type CuratedListDTO = {
  dateCreated: ?any;
  description: ?string;
  featured: ?boolean;
  header: ?AbstractResourceDTO;
  headerId: ?ResourceIdentifier;
  id: ?string;
  name: ?string;
  owner: ?PublicUserDTO;
  ownerId: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  resources: ?Array<AbstractResourceDTO>;
  resourcesId: ?Array<ResourceIdentifier>;
}

declare type PublicUserDTO = {
  avatar: ?string;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  website: ?string;
}

declare type ResourceIdentifier = {
  id: ?string;
  type: ?ResourceType;
  version: ?number;
}

declare type ResourceType = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type AbstractResourceDTO = CuratedListDTO | PublicUserDTO | CommentDTO | UserDTO | ArticleDTO | CommunityDTO | CommunityMemberDTO | CollectionDTO;

declare type MutationResponse = {
  hash: ?string;
  message: ?string;
  success: ?boolean;
}

declare type ResourceIdentifierInput = {
  id: ?string;
  type: ?ResourceTypeInput;
  version: ?number;
}

declare type ResourceTypeInput = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type Page_CommentDTO = {
  content: ?Array<CommentDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommentDTO = {
  author: ?PublicUserDTO;
  authorId: ?string;
  body: ?string;
  id: ?string;
  parent: ?AbstractResourceDTO;
  parentId: ?ResourceIdentifier;
  posted: ?any;
  resourceIdentifier: ?ResourceIdentifier;
}

declare type Sort = {

}

declare type DirectionInput = "ASC" | "DESC";

declare type UserDTO = {
  avatar: ?string;
  email: ?string;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  website: ?string;
}

declare type ArticleDTO = {
  attributes: ?any;
  author: ?PublicUserDTO;
  authorId: ?string;
  checkpoint: ?string;
  comments: ?Page_CommentDTO;
  content: ?string;
  contentHash: ?string;
  dateCreated: ?any;
  datePublished: ?any;
  id: ?string;
  owner: ?AbstractResourceDTO;
  ownerId: ?ResourceIdentifier;
  resourceIdentifier: ?ResourceIdentifier;
  signature: ?string;
  status: ?ArticleStatus;
  title: ?string;
  version: ?number;
  vote: ?VoteStatDTO;
}

declare type ArticleStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type VoteStatDTO = {
  parentId: ?ResourceIdentifier;
  totalVote: ?any;
}

declare type Page_CommunityDTO = {
  content: ?Array<CommunityDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommunityDTO = {
  approved: ?Array<AbstractResourceDTO>;
  approvedId: ?Array<ResourceIdentifier>;
  avatar: ?string;
  creator: ?PublicUserDTO;
  creatorId: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
  members: ?Array<CommunityMemberDTO>;
  membersId: ?any;
  metadataLocator: ?string;
  name: ?string;
  pending: ?Array<AbstractResourceDTO>;
  pendingId: ?Array<ResourceIdentifier>;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  status: ?CommunityStatus;
  website: ?string;
}

declare type CommunityMemberDTO = {
  avatar: ?string;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  role: ?CommunityPermission;
  social: ?any;
  title: ?string;
  website: ?string;
}

declare type CommunityPermission = "ADMIN" | "CURATOR";

declare type CommunityStatus = "CLOSED" | "CREATED" | "OPENED";

declare type CommunityFilterInput = {
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  nameContain: ?string;
  dateCreatedLessThan: ?any;
  fullText: ?string;
  dateCreatedGreaterThan: ?any;
}

declare type CollectionDTO = {
  background: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
  name: ?string;
  owner: ?PublicUserDTO;
  ownerId: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  sections: ?Array<SectionDTO>;
  vote: ?VoteStatDTO;
}

declare type SectionDTO = {
  description: ?string;
  name: ?string;
  resources: ?Array<AbstractResourceDTO>;
  resourcesId: ?Array<ResourceIdentifier>;
}

declare type Page_CollectionDTO = {
  content: ?Array<CollectionDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CollectionFilterInput = {
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  ownerIdEqual: ?string;
  descriptionContains: ?string;
  dateCreatedLessThan: ?any;
  nameContains: ?string;
  fullText: ?string;
  dateCreatedGreaterThan: ?any;
}

declare type Page_ArticleDTO = {
  content: ?Array<ArticleDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type ArticleFilterInput = {
  idEquals: ?string;
  checkpointEquals: ?string;
  ownerEquals: ?string;
  dateCreatedLessThan: ?any;
  ownerIdEquals: ?string;
  statusIn: ?Array<ArticleStatusInput>;
  fullText: ?string;
  dateCreatedGreaterThan: ?any;
  authorIdEquals: ?string;
  latestVersion: ?boolean;
}

declare type ArticleStatusInput = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type ArticleProof = {
  articleLeafHash: ?string;
  checkpointHash: ?string;
  checkpointMerkleRoot: ?string;
  proofHashes: ?Array<string>;
}

declare type SectionDTOInput = {
  resourcesId: ?Array<ResourceIdentifierInput>;
  description: ?string;
  name: ?string;
}

/**
  Mutation root type
*/
declare type Mutation = {
  EditArticleVersion: ?MutationResponse;
  getEvent: ?boolean;
  AddResourceToCuratedList: ?MutationResponse;
  Vote: ?MutationResponse;
  AddComment: ?MutationResponse;
  ApproveResource: ?MutationResponse;
  CreateCommunity: ?MutationResponse;
  AddUser: ?MutationResponse;
  SubmitNewArticle: ?MutationResponse;
  PublishArticle: ?MutationResponse;
  CreateCollection: ?MutationResponse;
  CreateCuratedList: ?MutationResponse;
  SubmitResource: ?MutationResponse;
  SubmitArticle: ?MutationResponse;
  ApproveArticle: ?MutationResponse;
  ComposeCollection: ?MutationResponse;
  SubmitArticleVersion: ?MutationResponse;
  AddHeaderToCuratedList: ?MutationResponse;
  CheckpointArticles: ?MutationResponse;
  RemoveResource: ?MutationResponse;
  RemoveResourceFromCuratedList: ?MutationResponse;
  RemoveCuratedList: ?MutationResponse;
  RejectArticle: ?MutationResponse;
}

/**
  Subscription root type
*/
declare type Subscription = {
  GetEvent: ?boolean;
}