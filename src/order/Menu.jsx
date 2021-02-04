import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Menu.css';

const MenuItem = memo(function MenuItem(props) {
    const { onPress, title, value, active } = props;
    return (
        <li
            className={classnames({ active })}
            onClick={() => {
                onPress(value);
            }}
        >
            {title}
        </li>
    );
});
MenuItem.prototypes = {
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
};

const Menu = memo(props => {
    const { show, options, onPress, hideMenu } = props;
    return (
        <div>
            {show && (
                <div className="menu-mask" onClick={() => hideMenu()}></div>
            )}
            <div className={classnames('menu', { show })}>
                <div className="menu-title"></div>
                <ul>
                    {options &&
                        options.map(option => {
                            return (
                                <MenuItem
                                    key={option.value}
                                    onPress={onPress}
                                    {...option}
                                ></MenuItem>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
});

Menu.prototypes = {
    show: PropTypes.bool.isRequired,
    options: PropTypes.array,
    onPress: PropTypes.func,
    hideMenu: PropTypes.func.isRequired,
};

export default Menu;
