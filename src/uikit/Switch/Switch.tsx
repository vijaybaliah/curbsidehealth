import classNames from 'classnames/bind';
import styles from './Switch.module.css';

const cx = classNames.bind(styles);

const Switch = () => {
  return (
    <label className={cx('switch')}>
      <input type="checkbox" className={cx('input')} />
      <span className={cx('slider', 'round')}></span>
    </label>
  );
};

export default Switch;
