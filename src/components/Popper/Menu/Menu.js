import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import styles from './menu.module.scss';
import MenuItem from './MenuItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const currentItem = history[history.length - 1];

    const renderItems = () => {
        return currentItem.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            // handle
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleSliceMenu = () => setHistory((prev) => prev.slice(0, 1));

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <Tippy
            // visible
            interactive
            delay={[0, 400]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx(`menu-list`)} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx(`menu-popper`)}>
                        {history.length > 1 && <Header title={currentItem.title} onBack={handleBack} />}
                        <div className={cx(`menu-body`)}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={handleSliceMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
