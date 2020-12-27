import PropTypes from 'prop-types';
import { FC } from 'react';
import { isMobileView } from '../../utils/screen';

import s from './ListItem.module.scss';

interface ListItemProps {
    additionalInfo: string;
    title: string;
    img: string;
}

const ListItem: FC<ListItemProps> = ({ additionalInfo, title, img }) => {
    const isMobile = isMobileView();

    return (
        <div className={s.wrapListItem}>
            <div className={isMobile ? s.imgMobile : ''}>
                <img src={img} alt='' />
            </div>
            <div className={s.wrapInfo}>
                <div>{title}</div>
                {additionalInfo && <div>{additionalInfo}</div>}
            </div>
        </div >
    );
}

ListItem.propTypes = {
    additionalInfo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
}

export default ListItem;