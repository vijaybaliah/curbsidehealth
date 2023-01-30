import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import styles from './RepoFilter.module.css';
import { repoSortOptions } from './repoListConstants';
import {
  RepoListFilter,
  RepoListFilterForm,
} from './repolistgql/repolist.types';
import { REPO_VISIBILITY_OPTIONS } from '../repocreatepage/repoCreateContants';
import { useNavigate } from 'react-router-dom';
import { client } from '../../utils/apolloClient';

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
  const handleFormSubmit = (values: RepoListFilterForm) => {
    console.log('</form>: ', values);

    setFilter({
      user: values.user,
      privacy: values.privacy,
    });
  };

  const formik = useFormik<RepoListFilterForm>({
    initialValues: {
      user: defaultUser,
      privacy: defaultVisbility,
      token: '',
    },
    onSubmit: handleFormSubmit,
  });
  const navigate = useNavigate();

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSortOption(event.target.value);
  };

  const handleNavigateToCreate = () => {
    navigate('/repo/create');
  };

  const handleSetToken: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    localStorage.setItem('token', event.target.value);
    client.resetStore();
    formik.handleChange('token')(event);
    // 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
  };

  return (
    <div className={cx('main')}>
      <label>
        set token
        <input
          type="text"
          value={formik.values.token}
          onChange={handleSetToken}
        />
      </label>
      <div className={cx('filter')}>
        <label>
          User Name:
          <input
            type={'text'}
            onChange={formik.handleChange('user')}
            placeholder={'enter github user name'}
            value={formik.values.user}
            className={cx('field')}
          />
        </label>
        <label>
          Visibility:
          <select
            value={formik.values.privacy}
            onChange={formik.handleChange('privacy')}
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
        <button
          type={'submit'}
          onClick={() => formik.handleSubmit()}
          className={cx('field', 'submit')}
        >
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
