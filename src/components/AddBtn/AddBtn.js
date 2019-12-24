import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import css from './AddBtn.module.scss';

const addBtn = (props) => {
    return (
        <Fragment>
            <Link
                to="/contacts/new"
                className={css.AddBtn}
            >Add Contact
            </Link>
        </Fragment>
    );
};

export default addBtn;