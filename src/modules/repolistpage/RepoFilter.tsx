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

const handleValidate = (values: RepoListFilterForm) => {
  const errors: Partial<RepoListFilterForm> = {};
  if (!values.user) {
    errors.user = 'This field is required!!!';
  }
  if (!values.token) {
    errors.token = 'This field is required!!!';
  }
  return errors;
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
    setFilter({
      user: values.user,
      privacy: values.privacy,
    });
  };
  const requiredToken = localStorage.getItem('token');
  const formik = useFormik<RepoListFilterForm>({
    initialValues: {
      user: defaultUser,
      privacy: defaultVisbility,
      token: requiredToken ? requiredToken : '',
    },
    validate: handleValidate,
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
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div className={cx('main')}>
      <div>
        <label>
          set token
          <input
            type="text"
            value={formik.values.token}
            placeholder={'enter user token'}
            onChange={handleSetToken}
          />
        </label>
        {formik.errors.token && formik.touched.token && (
          <p className={cx('error')}>{formik.errors.token}</p>
        )}
      </div>
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
        {formik.errors.user && formik.touched.user && (
          <p className={cx('error')}>{formik.errors.user}</p>
        )}
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
          onClick={handleSubmit}
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
