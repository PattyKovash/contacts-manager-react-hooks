import React, { useState } from 'react';
import useStore from '../../hooks-store/contacts-store';
import css from './ContactForm.module.scss';

const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email && regex.test(email);
};

const validatePhone = (phone) => {
    return phone && /^[0-9\+\s-]{8,13}$/.test(phone);
};

const formValidation = (field, value) => {
    const fieldOpts = formFieldsConfig[field]

    if (fieldOpts) {
        let { required, validate } = fieldOpts;
        if ((required && !value) || (validate && !validate(value))) {
            return false;
        } else {
            return true;
        }
    }
}

const formFieldsConfig = {
    name: {
        label: 'Full Name',
        icon: 'user-circle',
        required: true,
        fieldType: 'input',
        validateMsg: 'Please enter your name.',
        fieldAttr: {
            type: 'text',
            placeholder: 'Enter your full name'
        },
        valid: false,
        fieldVal: null
    },
    email: {
        label: 'Email',
        icon: 'envelope',
        require: true,
        validate: validateEmail,
        validateMsg: 'Please enter a valid email. Ex: myemail@mydomain.com',
        fieldType: 'input',
        fieldAttr: {
            type: 'text',
            placeholder: 'Ex: myemail@mydomain.com'
        },
        valid: false,
        fieldVal: null
    },
    phone: {
        label: 'Phone',
        icon: 'phone-alt',
        require: true,
        validate: validatePhone,
        validateMsg: 'Please enter a valid phone number. Only numbers are allows.',
        fieldType: 'input',
        fieldAttr: {
            type: 'text',
            placeholder: 'Ex: 111-222-3333'
        },
        valid: false,
        fieldVal: null
    }
};

const ContactForm = (props) => {
    const [state, setState] = useState(formFieldsConfig);
    const dispatch = useStore()[1];

    const changeHandler = (event) => {
        const target = event.target;
        const value = target ? target.value : '';
        const field = target ? target.getAttribute('name') : '';
        let newState = {...state};
        newState.fieldVal = value;

        if (formValidation(field, value)) {
            newState[field].valid = true;
            target.parentNode.classList.remove(css.invalid);
        } else {
            newState[field].valid = false;
            target.parentNode.classList.add(css.invalid);
        }

        setState(newState);
    };


    const submitHandler = (event) => {
        console.log("in submit handler");
        event.preventDefault();
        const payload = {};

        const errors = Object.keys(formFieldsConfig).reduce((acc, field) => {
            const { valid, validateMsg, fieldVal } = formFieldsConfig[field];

            if (!valid) {
                acc.push(<li>{validateMsg}</li>);
            } else {
                payload[field] = fieldVal;
            }

            return acc;
        }, []);

        console.log({errors});

        if (errors.length) {

        } else {
            dispatch('CREATE_CONTACT', [payload, dispatch]);
        }
    };


const formContent = Object.keys(formFieldsConfig).map((field) => {
    const {
        label,
        require,
        fieldAttr,
        validateMsg,
        icon
    } = formFieldsConfig[field];

    return (
        <div className={css.fieldGroup} key={field}>
            <div className={css.label}>
                {icon ? <i className={`fa fa-${icon}`}></i> : null}
                <label htmlFor={field}>{label}</label>
            </div>
            <div className={css.input} title={validateMsg}>
                <input
                    name={field}
                    required={require}
                    title={validateMsg}
                    onBlur={changeHandler}
                    onChange={changeHandler}
                    {...fieldAttr}
                />
            </div>
        </div>
    );
});

    return (
        <div className={css.ContactForm}>
            <div className={css.errors}></div>
            <h1 className={css.header}>Create New Contact</h1>
            <form noValidate onSubmit={submitHandler}>
                {formContent}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;