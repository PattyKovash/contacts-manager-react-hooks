import React, { Fragment, useEffect } from 'react';
import ContactsList from '../../components/ContactsList/ContactsList';
import Modal from '../../components/UI/Modal/Modal';
import useStore, { removeListener } from '../../hooks-store/contacts-store';

const Contacts = (props) => {
    const [state, dispatch] = useStore();
    const { contacts } = state;

    useEffect(() => {
        dispatch('FETCH_CONTACTS', dispatch);
    }, []);

    const modalCloseHandler = () => {
        dispatch('CLEAR_ERROR');

        return () => {
            removeListener(dispatch);
        };
    };

    const modalContent = () => {
        let iconClass =
            state.errMsg
            ? 'fa-exclamation-triangle'
            : state.successMsg
            ? 'fa-check-circle'
            : null;
        
        let headerMsg =
            state.errMsg
            ? 'ERROR'
            : state.successMsg
            ? 'SUCCESS'
            : null;

        let modalContent = (
            <div>
                <h1>
                    <i className={`fas ${iconClass}`}></i>
                    <span>{headerMsg}</span>
                </h1>
                <p>{state.errMsg ? state.errMsg : state.successMsg}</p>
            </div>
        );

        return modalContent;
    }

    return (
        <Fragment>
            <Modal
                show={state.errMsg || state.successMsg}
                clickHandler={modalCloseHandler}
            >
                {modalContent()}
            </Modal>
            <ContactsList contacts={contacts}/>
        </Fragment>
    );
};

export default Contacts;