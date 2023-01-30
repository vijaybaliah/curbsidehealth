import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './RepoListItem.module.css';

const cx = classNames.bind(styles);
type Props = {
  name: string;
  id: string;
  isArchived: boolean;
  owner: string;
};

const RepoListItem = ({ name, id, isArchived, owner }: Props) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/repo/${owner}/${name}/${id}`);
  };
  return (
    <div className={cx('row')}>
      <div className={cx('cell')}>
        <p className={cx('text')}>{name}</p>
      </div>
      <div className={cx('cell')}>
        {isArchived && <p className={cx('text')}>archived</p>}
      </div>
      <div className={cx('cell')}>
        <button onClick={handleNavigation}>Details</button>
      </div>
    </div>
  );
};

export default RepoListItem;
