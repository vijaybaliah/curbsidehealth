import { gql } from '@apollo/client';

export const REPOSITORIES_QUERY = gql`
  query repoList(
    $user: String!
    $orderBy: RepositoryOrder
    $cursor: String
    $privacy: RepositoryPrivacy
  ) {
    user(login: $user) {
      repositories(
        first: 10
        after: $cursor
        orderBy: $orderBy
        privacy: $privacy
      ) {
        edges {
          node {
            name
            url
            id
            isArchived
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
