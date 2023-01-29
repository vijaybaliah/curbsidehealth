import { gql } from '@apollo/client';

export const REPOSITORIES_QUERY = gql`
  query repoList($user: String!, $orderBy: RepositoryOrder, $cursor: String) {
    user(login: $user) {
      repositories(first: 10, after: $cursor, orderBy: $orderBy) {
        edges {
          node {
            name
            url
            id
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
