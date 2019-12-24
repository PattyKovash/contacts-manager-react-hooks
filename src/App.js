import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import NewContactPage from './containers/Contacts/NewContactPage/NewContactPage';
import Contacts from './containers/Contacts/Contacts';
import css from './App.module.scss';

const app = () => {
  return (
    <div className={css.App}>
      <Header />
      <main className={css.main}>
        <Route
          exact
          path="/"
          component={Contacts}
        />
        <Route
          exact
          path="/contacts/new"
          component={NewContactPage}
        />
      </main>
    </div>
  );
}

export default app;
