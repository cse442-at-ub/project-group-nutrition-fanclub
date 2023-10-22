import React from 'react';
import './Input_login.css';

function Input_login(props) {
    const { type = 'text', placeholder, value, onChange } = props;
    return (
        <div className="input-container">
            <input className="input-field" 
                   type={type} 
                   placeholder={placeholder} 
                   value={value}
                   onChange={onChange}/>
        </div>
    );
}

export default Input_login;
