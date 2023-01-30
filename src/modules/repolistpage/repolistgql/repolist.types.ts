export interface RepolistResponse {
  user: User;
}
export interface User {
  repositories: Repositories;
  __typename: string;
}
export interface Repositories {
  edges: EdgesEntity[];
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
  id: string;
  isArchived: boolean;
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

export interface RepoListFilter {
  user: string;
}

export interface RepoListVariables {
  user: string;
  nameFilter?: string;
  orderBy: {
    field: string;
    direction: string;
  };
  cursor?: string;
}
