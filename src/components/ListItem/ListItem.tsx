import React, { Component } from 'react';
import { isMobileView } from '../../utils/screen';

import s from './ListItem.module.scss';

interface ListItemProps {
    additionalInfo: string;
    title: string;
    img: string;
}

interface ListItemState {
    isMobileView: boolean;
}

class ListItem extends Component<ListItemProps, ListItemState> {
    constructor(props: ListItemProps) {
        super(props);

        this.state = {
            isMobileView: isMobileView(),
        }
    }

    render() {
        const { additionalInfo, title, img } = this.props;
        const { isMobileView } = this.state;

        return (
            <div className={s.wrapListItem}>
                <div className={isMobileView ? s.imgMobile : ''}>
                    <img src={img} />
                </div>
                <div className={s.wrapInfo}>
                    <div>{title}</div>
                    {additionalInfo && <div>{additionalInfo}</div>}
                </div>
            </div >
        );
    }
}

export default ListItem;