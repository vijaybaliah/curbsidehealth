import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Loader from '../../uikit/Loader';
import type { RepoResponse } from './repodetailspagegql/repodetails.types';
import {
  REPOSITORIES_ARCHIVE_MUTATION,
  REPOSITORY_QUERY,
} from './repodetailspagegql/repodetailspage.gql';

const RepoDetailsPage = () => {
  const {
    id = '',
    name,
    owner,
  } = useParams<{ owner: string; name: string; id: string }>();
  const [archiveRepo, { error, loading }] = useMutation(
    REPOSITORIES_ARCHIVE_MUTATION,
  );
  const { data: repoData, loading: repoLoading } = useQuery<RepoResponse>(
    REPOSITORY_QUERY,
    {
      variables: {
        name,
        owner,
      },
    },
  );
  const handleArchiveRepo = () => {
    archiveRepo({
      variables: { id },
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading || repoLoading) {
    return <Loader />;
  }

  if (!repoData) return null;
  const { repository } = repoData;

  return (
    <div>
      <p>{name}</p>
      <p>Description: {repository.description}</p>
      <p>Created at: {repository.createdAt}</p>
      <p>issues: {repository.issues.totalCount}</p>
      <button onClick={handleArchiveRepo}>Archive</button>
    </div>
  );
};
export default RepoDetailsPage;
