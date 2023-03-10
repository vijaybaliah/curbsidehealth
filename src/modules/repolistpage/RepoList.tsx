import { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useQuery } from '@apollo/client';
import { REPOSITORIES_QUERY } from './repolistgql/repolist.gql';
import RepoFilter from './RepoFilter';
import type {
  RepoListFilter,
  RepolistResponse,
  RepoListVariables,
} from './repolistgql/repolist.types';
import RepoListItem from './RepoListItem';
import Loader from '../../uikit/Loader/Loader';
import RepoListTitle from './RepoListTitle';
import styles from './RepoList.module.css';

const cx = classNames.bind(styles);
const RepoList = () => {
  const [filter, setFilter] = useState<RepoListFilter>({
    user: 'vijaycurbsidehealth',
    privacy: 'PUBLIC',
  });
  const [sort, setSortOption] = useState('NAME');

  const memoisedOrderBy = useMemo(() => {
    let dir = 'DESC';
    if (sort === 'NAME') {
      dir = 'ASC';
    }
    return {
      field: sort,
      direction: dir,
    };
  }, [sort]);
  const { loading, error, data, fetchMore, refetch } = useQuery<
    RepolistResponse,
    RepoListVariables
  >(REPOSITORIES_QUERY, {
    variables: {
      user: filter.user,
      privacy: filter.privacy,
      orderBy: memoisedOrderBy,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const repositories = data?.user?.repositories?.edges ?? [];
  const { endCursor = '', hasNextPage } =
    data?.user?.repositories?.pageInfo ?? {};

  const handleLoadMore = () => {
    fetchMore<RepolistResponse, RepoListVariables>({
      variables: {
        user: filter.user,
        privacy: filter.privacy,
        cursor: endCursor,
        orderBy: memoisedOrderBy,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          user: {
            ...prev.user,
            repositories: {
              ...prev.user.repositories,
              edges: [
                ...prev.user.repositories.edges,
                ...fetchMoreResult.user.repositories.edges,
              ],
              pageInfo: fetchMoreResult.user.repositories.pageInfo,
            },
          },
        };
      },
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {loading && <Loader />}
      <RepoFilter
        setFilter={setFilter}
        setSortOption={setSortOption}
        sort={sort}
        defaultUser={filter.user}
        defaultVisbility={filter.privacy}
      />
      <div className={cx('row')}>
        <RepoListTitle>Name</RepoListTitle>
        <RepoListTitle>Is Archieved</RepoListTitle>
        <RepoListTitle>Actions</RepoListTitle>
      </div>
      {repositories.map((repoList) => {
        return (
          <RepoListItem
            owner={filter.user}
            key={repoList.node.url}
            id={repoList.node.id}
            name={repoList.node.name}
            isArchived={repoList.node.isArchived}
          />
        );
      })}
      {hasNextPage && <button onClick={handleLoadMore}>Load More</button>}
    </>
  );
};

export default RepoList;
