export interface RepoResponse {
  repository: Repository;
}
export interface Repository {
  name: string;
  description?: null;
  stargazers: StargazersOrForksOrWatchersOrIssues;
  forks: StargazersOrForksOrWatchersOrIssues;
  watchers: StargazersOrForksOrWatchersOrIssues;
  issues: StargazersOrForksOrWatchersOrIssues;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
  __typename: string;
}
export interface StargazersOrForksOrWatchersOrIssues {
  totalCount: number;
  __typename: string;
}
export interface Owner {
  login: string;
  __typename: string;
}
