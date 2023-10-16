import React from 'react';
import './Bigbutton.css';

function Bigbutton(props) {
    return (
        <button className="login-btn">
            {props.text}
        </button>
    );
}

export default Bigbutton;
