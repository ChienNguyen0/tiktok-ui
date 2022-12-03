import PropTypes from 'prop-types';
import Button from '~/components/Button';
import classNames from 'classnames/bind';

import styles from './AccountItemPreview.module..scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItemPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div>
                    <Button primary medium>
                        Follow
                    </Button>
                </div>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                <div className={cx('wrap-view')}>
                    <p className={cx('followers')}>
                        <strong>{data.followers_count}</strong>
                        <span className={cx('label')}>Followers</span>
                    </p>
                    <p className={cx('number-like')}>
                        <strong>{data.likes_count}</strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

AccountItemPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItemPreview;
