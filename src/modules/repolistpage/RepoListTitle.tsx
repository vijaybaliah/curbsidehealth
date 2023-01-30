import type { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './RepoListItem.module.css';
type Props = {
  children: ReactNode;
};

const cx = classNames.bind(styles);

const RepoListTitle = ({ children }: Props) => {
  return (
    <div className={cx('cell')}>
      <p className={cx('text')}>{children}</p>
    </div>
  );
};

export default RepoListTitle;
