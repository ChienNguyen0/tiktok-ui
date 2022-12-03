import classNames from 'classnames/bind';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import { HomeIcon, HomeActiveIcon, FollowingIcon, FollowingActiveIcon, LiveIcon, LiveActiveIcon } from '~/icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as followService from '~/services/followService';
import * as userService from '~/services/userService';
import { useEffect, useState } from 'react';
import FollowingAccounts from '~/components/SuggestedAccounts/FollowingAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: 5 })
            .then((data) => {
                setSuggestedUsers((prevAccounts) => [...prevAccounts, ...data]);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        followService
            .getFollowers({ page: 1 })
            .then((res) => {
                setFollowingUsers(res);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <aside className={cx(`wrapper`)}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} />
            <FollowingAccounts label="Following accounts" data={followingUsers} />
        </aside>
    );
}

export default Sidebar;
