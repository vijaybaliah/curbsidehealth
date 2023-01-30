import { gql } from '@apollo/client';

export const REPOSITORY_QUERY = gql`
  query RepoDetailsQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      description
      stargazers {
        totalCount
      }
      forks {
        totalCount
      }
      watchers {
        totalCount
      }
      issues(states: OPEN) {
        totalCount
      }
      createdAt
      updatedAt
      owner {
        login
      }
    }
  }
`;

export const REPOSITORIES_ARCHIVE_MUTATION = gql`
  mutation ArchiveRepo($id: ID!) {
    archiveRepository(input: { repositoryId: $id }) {
      repository {
        name
        url
        id
      }
    }
  }
`;
