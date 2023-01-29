export interface RepolistResponse {
  user: User;
}
export interface User {
  repositories: Repositories;
  __typename: string;
}
export interface Repositories {
  edges?: EdgesEntity[] | null;
  pageInfo: PageInfo;
  __typename: string;
}
export interface EdgesEntity {
  node: RepoNode;
  __typename: string;
}
export interface RepoNode {
  name: string;
  url: string;
  __typename: string;
}
export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  __typename: string;
}

export type RepositoryOrderField = 'CREATED_AT' | 'NAME' | 'PUSHED_AT' | '';
export interface RepoSortOptionsType {
  label: string;
  value: RepositoryOrderField;
}
