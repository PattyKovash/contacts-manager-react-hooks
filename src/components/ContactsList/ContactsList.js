import React from 'react';
import ContactRow from '../ContactRow/ContactRow';
import css from './ContactsList.module.scss';
import cssRow from '../ContactRow/ContactRow.module.scss';

const contactsList = ({ contacts }) => {
    const content = contacts.map(({ id, name, email, phone }) => {
        return (
            <ContactRow
                key={id}
                id={id}
                name={name}
                email={email}
                phone={phone}
            />
        );
    });

    return (
        <div className={css.ContactsList}>
            <div className={`${cssRow.ContactRow} ${css.listHeader}`}>
                <div className={cssRow.rowName}>Name</div>
                <div className={cssRow.rowEmail}>Email</div>
                <div className={cssRow.rowPhone}>Phone</div>
                <div className={cssRow.controls}>&nbsp;</div>
            </div>
            {content}
        </div>
    );
};

export default contactsList;