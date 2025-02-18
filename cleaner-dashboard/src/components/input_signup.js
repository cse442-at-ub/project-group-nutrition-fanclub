import React from 'react';
import './Input_login.css';

function Input_signup({ type, placeholder, name, value, onChange }) {
    return (
        <div className="input-container">
            <input
                className="input-field"
                type={type || 'text'}
                placeholder={placeholder}
                name={name}  // Important to bind form data
                value={value} // For controlled input
                onChange={onChange} // For handling changes
            />
        </div>
    );
}

export default Input_signup;
