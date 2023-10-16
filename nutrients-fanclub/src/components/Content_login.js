import React from 'react';
import { Link } from 'react-router-dom';
import './Content_login.css';

function Content_login() {
    return (
        <div className="word">
            <p>
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
            <p>
                <a href='#'>Forgot Password?</a>
            </p>
        </div>
    );
}

export default Content_login;
