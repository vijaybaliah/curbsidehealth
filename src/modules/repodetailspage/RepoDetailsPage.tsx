import { useMutation, useQuery } from '@apollo/client';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RepoDetailsPage.module.css';
import Loader from '../../uikit/Loader';
import type { RepoResponse } from './repodetailspagegql/repodetails.types';
import {
  REPOSITORIES_ARCHIVE_MUTATION,
  REPOSITORY_QUERY,
} from './repodetailspagegql/repodetailspage.gql';

const cx = classNames.bind(styles);
const RepoDetailsPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    id = '',
    name,
    owner,
  } = useParams<{ owner: string; name: string; id: string }>();

  const navigate = useNavigate();
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

  const goBack = () => {
    navigate(-1);
  };
  const handleArchiveRepo = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirmation = () => {
    handleCloseConfirmation();
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
      <button onClick={goBack}>Go Back</button>
      <p>{name}</p>
      <p>Description: {repository.description}</p>
      <p>Created at: {repository.createdAt}</p>
      <p>issues: {repository.issues.totalCount}</p>

      <button onClick={handleArchiveRepo}>Archive</button>
      {showConfirmation && (
        <div className={cx('confirmation')}>
          <div className={cx('content')}>
            <p>Are you sure you want to arhive this repo</p>
            <div className={cx('action')}>
              <button
                onClick={handleCloseConfirmation}
                className={cx('action-item')}
              >
                cancel
              </button>
              <button
                onClick={handleConfirmation}
                className={cx('action-item')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RepoDetailsPage;
