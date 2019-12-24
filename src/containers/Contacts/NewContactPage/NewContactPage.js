import React from 'react';
import ContactForm from '../../../components/ContactForm/ContactForm';
import css from './NewContactPage.module.scss';

const newContactPage = (props) => {
    return (
        <div className={css.container}>
            <ContactForm />
        </div>
    );
};

export default newContactPage;