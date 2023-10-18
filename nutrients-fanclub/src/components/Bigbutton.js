import React from 'react';
import './Bigbutton.css';

function Bigbutton({ text, onClick }) {
    return (
        <button onClick={onClick} className="login-btn">
            {text}
        </button>
    );
}

export default Bigbutton;
