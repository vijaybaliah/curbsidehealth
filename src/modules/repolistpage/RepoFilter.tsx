import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RepoFilter.module.css';
import { repoSortOptions } from './repoListConstants';
import { RepoListFilter } from './repolistgql/repolist.types';
import { REPO_VISIBILITY_OPTIONS } from '../repocreatepage/repoCreateContants';
import { useNavigate } from 'react-router-dom';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<RepoListFilter>>;
  sort: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  defaultVisbility: string;
  defaultUser: string;
};

const cx = classNames.bind(styles);
const RepoFilter = ({
  setFilter,
  sort,
  setSortOption,
  defaultVisbility,
  defaultUser,
}: Props) => {
  const [searchText, setSearchText] = useState(defaultUser);
  const [visibility, setVisibility] = useState(defaultVisbility);
  const navigate = useNavigate();

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSearchText(event.target.value);
  };

  const handleFilterClick = () => {
    setFilter({
      user: searchText,
      privacy: visibility,
    });
  };

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSortOption(event.target.value);
  };

  const handleVisibilityChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setVisibility(event.target.value);
  };

  const handleNavigateToCreate = () => {
    navigate('/repo/create');
  };
  return (
    <div className={cx('main')}>
      <div className={cx('filter')}>
        <label>
          User Name:
          <input
            type={'text'}
            onChange={handleTextChange}
            placeholder={'enter github user name'}
            value={searchText}
            className={cx('field')}
          />
        </label>
        <label>
          Visibility:
          <select
            value={visibility}
            onChange={handleVisibilityChange}
            className={cx('field')}
          >
            {REPO_VISIBILITY_OPTIONS.map((visible) => {
              return (
                <option value={visible.value} key={visible.value}>
                  {visible.label}
                </option>
              );
            })}
          </select>
        </label>
        <button onClick={handleFilterClick} className={cx('field', 'submit')}>
          Filter
        </button>
        <label>
          Sort By
          <select
            value={sort}
            onChange={handleSortChange}
            className={cx('field')}
          >
            {repoSortOptions.map((repoOption) => {
              return (
                <option value={repoOption.value} key={repoOption.value}>
                  {repoOption.label}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleNavigateToCreate}>Create New Repo</button>
      </div>
    </div>
  );
};

export default RepoFilter;
