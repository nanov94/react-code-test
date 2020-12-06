import React, { Component } from 'react';

import s from './Header.module.scss';

class Header extends Component {
    render() {
        return (
            <div className={s.wrapHeader}>
                Users
            </div>
        );
    }
}

export default Header;
