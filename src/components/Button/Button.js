import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './button.module.scss';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Button({
    to,
    href,
    primary = false,
    normal = false,
    outline = false,
    rounded = false,
    medium = false,
    large = false,
    menuItem = false,
    leftIcon,
    className,
    rightIcon,
    children,
    onClick,
    disabled,
    ...passProps
}) {
    let Comp = 'button';

    const props = { onClick, ...passProps };

    // remove event listener when button is disabled
    if (disabled) {
        Object.keys(disabled).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        normal,
        outline,
        rounded,
        medium,
        large,
        disabled,
        menuItem,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx(`icon`)}>{leftIcon}</span>}
            <span className={cx(`title`)}>{children}</span>
            {rightIcon && <span className={cx(`icon`)}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    normal: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    menuItem: PropTypes.bool,
    leftIcon: PropTypes.node,
    className: PropTypes.string,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

export default Button;
