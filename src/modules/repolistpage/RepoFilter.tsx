import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RepoFilter.module.css';
import { repoSortOptions } from './repoListConstants';

type Props = {
  handleSetUserText: (value: string) => void;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
};

const cx = classNames.bind(styles);
const RepoFilter = ({ handleSetUserText, setSortOption, sort }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    handleSetUserText(searchText);
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
      <button onClick={handleSearchClick}>search</button>
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
