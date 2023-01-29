import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RepoFilter.module.css';
import { repoSortOptions } from './repoListConstants';
import { RepoListFilter } from './repolistgql/repolist.types';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<RepoListFilter>>;
  sort: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

const cx = classNames.bind(styles);
const RepoFilter = ({ setFilter, sort, setSortOption }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSearchText(event.target.value);
  };

  const handleFilterClick = () => {
    setFilter({
      user: searchText,
    });
  };

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={cx('search')}>
      <input
        type={'text'}
        onChange={handleTextChange}
        placeholder={'enter github user name'}
      />
      <button onClick={handleFilterClick}>Filter</button>
      <select value={sort} onChange={handleSortChange} className={cx('sort')}>
        {repoSortOptions.map((repoOption) => {
          return (
            <option value={repoOption.value} key={repoOption.value}>
              {repoOption.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default RepoFilter;
