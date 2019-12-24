import React from 'react';
import useStore from '../../hooks-store/contacts-store';
import ContactIcon from '../UI/ContactIcon/ContactIcon';
import css from './ContactRow.module.scss';

const ContactRow = ({ id, name, email, phone }) => {
    const dispatch = useStore()[1];

    const deleteContact = () => {
        dispatch('DELETE_CONTACT', [id, dispatch]);
    };

    return (
        <div className={css.ContactRow}>
            <div className={css.rowName}>
                <ContactIcon initial={name[0]} contactName={name} />
            </div>
            <div className={css.rowEmail}>{email}</div>
            <div className={css.rowPhone}>{phone}</div>
            <div className={css.controls}>
                <p>
                    <i className="fas fa-edit"></i>
                </p>
                <p onClick={deleteContact}>
                    <i className="fas fa-trash"></i>
                </p>
            </div>
        </div>
    );
};

export default ContactRow;