import React from 'react';
import './Input_login.css';

function Input_login(props) {
    return (
        <div className="input-container">
            <input className="input-field" type={props.type || 'text'} placeholder={props.placeholder} />
        </div>
    );
}

export default Input_login;
