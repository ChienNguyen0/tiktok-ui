import Button from '~/components/Button';
import classNames from 'classnames/bind';

import styles from './AccountItemPreview.module..scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItemPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1662436800&x-signature=4k3MU88YoZCggEWQbj3mkA7Mhrk%3D"
                    alt=""
                />
                <div>
                    <Button primary medium>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>theanh28entertainment</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Theanh28 Entertainment</p>
                <div className={cx('wrap-view')}>
                    <p className={cx('followers')}>
                        <strong>5M</strong>
                        <span className={cx('label')}>Followers</span>
                    </p>
                    <p className={cx('number-like')}>
                        <strong>10M</strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountItemPreview;
