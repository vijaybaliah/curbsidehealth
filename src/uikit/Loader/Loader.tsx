import classNames from 'classnames/bind';
import styles from './Loader.module.css';

const cx = classNames.bind(styles);
const Loader = () => {
  return (
    <div className={cx('container')} data-testid="loader">
      <div className={cx('loading')}>
        <div className={cx('inner')}></div>
        <div className={cx('inner')}></div>
      </div>
    </div>
  );
};

export default Loader;
