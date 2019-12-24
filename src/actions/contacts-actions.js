import httpClient from '../httpClient';

// Get Contacts records
const fetchContacts = function fetchContacts(curState, dispatch) {
    httpClient.get('/contacts')
    .then((resp) => {

        // Update Contact records state
        dispatch('UPDATE_CONTACTS_LIST', resp.data);
    })
    .catch((err) => (dispatch('UPDATE_ERR_MSG', err)));

    // Update loading state while waiting for records
    return { loading: true };
}

// Create Contact
const createContact = function createContact(curState, payload) {
    httpClient.post('/contacts', {
        data: payload[0]
    })
    .then((resp) => {
        console.log({resp});
        payload[1]('FETCH_CONTACTS', payload[1]);
    })
    .catch((err) => (payload[1](
        'UPDATE_ERR_MSG',
        'An error occurred while processing your request.'
    )));

    // Update loading state while waiting for records
    return { loading: true };
};

// Remove Contact record
const deleteContact = function deleteContact(curState, payload) {
    httpClient.delete(`/contacts/${payload[0]}`)
    .then((resp) => {
        payload[1]('FETCH_CONTACTS', payload[1]);
    })
    .catch((err) => (payload[1](
        'UPDATE_ERR_MSG',
        'An error occurred while processing your request.'
    )));

    // Update loading state while waiting for records
    return { loading: true };
}

// Update contacts state
const updateContactsList = function updateContactsList(curState, payload) {
    return { contacts: payload, loading: false }
};


// Update error message state
const updateErrMsg = function updateErrMsg(curState, msg) {
    return { errMsg: msg, loading: false };
}

// Reset error message state
const clearError = function clearError(curState) { return { errMsg: null } };

// Update success message state
const updateSuccessMsg = function updateSuccessMsg(curState, msg) {
    return { errMsg: msg, loading: false };
}

// Reset success message state
const clearSuccess = function clearSuccess(curState) { return { successMsg: null } };

const actions = {
    FETCH_CONTACTS: fetchContacts,
    CREATE_CONTACT: createContact,
    DELETE_CONTACT: deleteContact,
    UPDATE_CONTACTS_LIST: updateContactsList,
    UPDATE_ERR_MSG: updateErrMsg,
    CLEAR_ERROR: clearError,
    UPDATE_SUCCESS_MSG: updateSuccessMsg,
    CLEAR_SUCCESS: clearSuccess
};

export default actions;