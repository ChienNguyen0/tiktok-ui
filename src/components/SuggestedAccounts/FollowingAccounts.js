import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function FollowingAccounts({ label, data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}> {label} </p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            <p className={cx('more-btn')}>See More</p>
        </div>
    );
}

FollowingAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default FollowingAccounts;
