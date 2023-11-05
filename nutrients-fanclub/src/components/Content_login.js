import React from 'react';
import { Link } from 'react-router-dom';
import './Content_login.css';

function Content_login() {
    return (
        <div className="word">
            <p>
                Not registered? <Link to="/CSE442-542/2023-Fall/cse-442ae/build/signup">Create an account</Link>
            </p>
            <p>
            <Link to="/CSE442-542/2023-Fall/cse-442ae/build/Reset">
                <a href='#'>Forgot Password?</a>
            </Link>
            </p>
        </div>
    );
}

export default Content_login;
