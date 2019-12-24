import { useState, useEffect } from 'react';
import contactsActions from '../actions/contacts-actions';

// Initial contact state
let contactsState = {
    selectedContact: {},
    contacts: [],
    loading: false,
    errMsg: null,
    successMsg: null
};
// Register useEffect callbacks
let listeners = [];
// Used by dispatch to update state
let actions = contactsActions;

// Removes target listener.
export const removeListener = function removeListener(target) {
    listeners = listeners.filter((listener) => listener !== target);
};

// Custom hook to handle global Contacts state
const useStore = () => {
    const setState = useState(contactsState)[1];

    const dispatch = (actionType, payload) => {

        // console.log({actionType});
        // console.log({payload});
        const newState = actions[actionType](contactsState, payload);

        console.log({newState});

        contactsState = { ...contactsState, ...newState };

        listeners.forEach((listener) => listener(contactsState));
    };

    useEffect(() => {
        listeners.push(setState);

        return () => {
            removeListener(setState);
        };
    }, [setState]);

    return [contactsState, dispatch];
};


export default useStore;