import { gql } from '@apollo/client';

export const REPOSITORY_CREATE_MUTATION = gql`
  mutation createRepo(
    $name: String!
    $description: String
    $visibility: RepositoryVisibility!
  ) {
    createRepository(
      input: { name: $name, description: $description, visibility: $visibility }
    ) {
      repository {
        name
        description
        isPrivate
        createdAt
      }
    }
  }
`;
