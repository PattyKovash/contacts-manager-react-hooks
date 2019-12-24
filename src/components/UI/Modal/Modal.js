import React, { Fragment } from 'react';
import css from './Modal.module.scss';

const modal = (props) => {
    return (
        <Fragment>
            {props.show
            ? <div className={css.modalBg} onClick={props.clickHandler}></div>
            : null}
            <div
                className={css.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                <div>
                    {props.children}
                </div>
            </div>

        </Fragment>
    );
};

export default modal;