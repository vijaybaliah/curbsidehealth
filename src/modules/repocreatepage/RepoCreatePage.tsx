import classNames from 'classnames/bind';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import Loader from '../../uikit/Loader/Loader';
import { REPOSITORY_CREATE_MUTATION } from './repocreatepagegql/repocreatepage.gql';
import { CreateFormType } from './repocreatepagegql/repocreatepage.types';
import { REPO_VISIBILITY_OPTIONS } from './repoCreateContants';
import styles from './RepoCreatePage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
const RepoCreatePage = () => {
  const [createRepo, { error, loading, data, reset }] = useMutation(
    REPOSITORY_CREATE_MUTATION,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate('/curbsidehealth');
    }
    return () => {
      reset();
    };
  }, [data]);

  const handleFormSubmit = (values: CreateFormType) => {
    createRepo({
      variables: values,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      visibility: 'PUBLIC',
    },
    onSubmit: handleFormSubmit,
  });

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className={cx('main')}>
      {loading && <Loader />}
      <h2 className={cx('center')}>Create New Repo</h2>
      <form onSubmit={formik.handleSubmit} className={cx('form')}>
        <input
          placeholder="Enter repo name"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          className={cx('field')}
        />
        <input
          placeholder="Enter repo description"
          value={formik.values.description}
          onChange={formik.handleChange('description')}
          className={cx('field')}
        />
        <select
          value={formik.values.visibility}
          onChange={formik.handleChange('visibility')}
          className={cx('field')}
        >
          {REPO_VISIBILITY_OPTIONS.map((repoOption) => {
            return (
              <option key={repoOption.value} value={repoOption.value}>
                {repoOption.label}
              </option>
            );
          })}
        </select>
        <button type="submit" className={cx('field', 'submit')}>
          submit
        </button>
      </form>
    </div>
  );
};

export default RepoCreatePage;
