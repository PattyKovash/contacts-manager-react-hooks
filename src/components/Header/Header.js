import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AddBtn from '../AddBtn/AddBtn';
import css from './Header.module.scss';

const header = (props) => {
  return (
    <Fragment>
        <header className={css.Header}>
            <Link
                to="/"
                className={css.title}
            >Contacts
            </Link>

            <AddBtn />
        </header>
    </Fragment>
  );
}

export default header;
