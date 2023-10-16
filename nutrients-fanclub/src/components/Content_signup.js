import React from 'react';
import { Link } from 'react-router-dom';
import './Content_login.css';

function Content_signup() {
    return (
        <div className="word">
            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
}

export default Content_signup;
