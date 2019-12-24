import React from 'react';
import css from './ContactIcon.module.scss';

const contactIcon = ({ initial, contactName }) => {
    return (
        <div className={css.ContactIcon}>
            <div className={css.ContactIcon__icon}>{initial}</div>
            <div>{contactName}</div>
        </div>
    );
};

export default React.memo(contactIcon);