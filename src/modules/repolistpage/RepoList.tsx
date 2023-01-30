import { useState, useMemo } from 'react';
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
const RepoList = () => {
  const [filter, setFilter] = useState<RepoListFilter>({
    user: '',
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
  const { loading, error, data, fetchMore } = useQuery<
    RepolistResponse,
    RepoListVariables
  >(REPOSITORIES_QUERY, {
    variables: {
      user: filter.user,
      orderBy: memoisedOrderBy,
    },
  });

  const repositories = data?.user?.repositories?.edges ?? [];
  const { endCursor = '', hasNextPage } =
    data?.user?.repositories?.pageInfo ?? {};
  console.log({
    loading,
    error,
  });

  const handleLoadMore = () => {
    fetchMore<RepolistResponse, RepoListVariables>({
      variables: {
        user: filter.user,
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

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <RepoFilter
        setFilter={setFilter}
        setSortOption={setSortOption}
        sort={sort}
      />
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
