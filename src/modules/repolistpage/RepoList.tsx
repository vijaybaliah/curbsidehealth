import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { REPOSITORIES_QUERY } from './repolistgql/repolist.gql';
import RepoFilter from './RepoFilter';
import type { RepolistResponse } from './repolistgql/repolist.types';
const RepoList = () => {
  const [user, setUser] = useState('');
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
  const { loading, error, data } = useQuery(REPOSITORIES_QUERY, {
    variables: {
      user,
      orderBy: memoisedOrderBy,
    },
  });

  const typedData = data as RepolistResponse;
  console.log({
    loading,
    error,
    typedData,
  });

  const handleSetUserText = (value: string) => {
    setUser(value);
  };

  return (
    <>
      <RepoFilter
        handleSetUserText={handleSetUserText}
        setSortOption={setSortOption}
        sort={sort}
      />
      {typedData?.user?.repositories?.edges?.map((repoList) => {
        return <p key={repoList.node.url}>{repoList.node.name}</p>;
      })}
    </>
  );
};

export default RepoList;
