import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Image from '~/Image';
import styles from './Header.module.scss';

import config from '~/config';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    CoinIcon,
    FeedbackIcon,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MenuIcon,
    MessageIcon,
    SettingIcon,
    UserIcon,
} from '~/icons';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    // handle logic
    const handleClickItem = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // handle change languages
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'View Profile',
            to: '/profile',
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <SettingIcon />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx(`wrapper`)}>
            <div className={cx(`inner`)}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="logo" />
                </Link>

                {/* search */}
                <Search />

                <div className={cx(`actions`)}>
                    {currentUser ? (
                        <>
                            <Button normal leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                <span>Upload</span>
                            </Button>

                            <Tippy delay={[0, 200]} content="Message" placement="bottom">
                                <button className={cx(`action-btn`)}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Notifications" placement="bottom">
                                <button className={cx(`action-btn`)}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button normal leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                <span>Upload</span>
                            </Button>

                            <Button primary to="/">
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleClickItem}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/8a41244aeedd2c7c904eda890ff3a85c~c5_100x100.jpeg?x-expires=1655971200&x-signature=DVMpPLOCq10Ml60R2wUoAC%2FdRUg%3D"
                                alt="ChienNguyen"
                                fallback="https://files.fullstack.edu.vn/f8-prod/user_avatars/11411/6293dbbb98925.jpg"
                            />
                        ) : (
                            <button className={cx('btn-more')}>
                                <MenuIcon />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
