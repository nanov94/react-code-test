import React, { PureComponent } from 'react';

import s from './Loading.module.scss';

class Loading extends PureComponent {
    render() {
        return (
            <div className={s.wrapLoading}>
                <div className={s.firstPulsatingCircle}></div>
                <div className={s.secondPulsatingCircle}></div>
                <div className={s.smallCircle}></div>
            </div >
        );
    }
}

export default Loading;
