import React, { useState } from "react";
import Bigbutton from './Bigbutton';
import Content_login from './Content_login';
import Input_login from './Input_login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const determineType = (input) => {
        const emailRegex = /\S+@\S+\.\S+/;  
        return emailRegex.test(input) ? "email" : "username";
    };

    const validateInput = () => {
        let isValid = true;

        if (content.includes(' ') || content.includes('#') || 
        content.includes('!') || content.includes('$') || content.includes('%') || content.includes('^') ||
        content.includes('&') || content.includes('*') || content.includes('(') || content.includes(')')) {
            setUsernameError('You cannot use special characters as a username or email');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length > 26 || password.includes(' ')) {
            setPasswordError('The password length cannot exceed 26 characters, and you cannot use spaces in the password.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    }

    const submit = async () => {
        if (validateInput()) {
            const type = determineType(content);

            try {
                const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/newlogin.php', {
                    type,
                    content,
                    password
                });
                if (response.data.status === 'success') {
                    console.log('Login successfully');

                    handleLogin();

                    if (type === "email") {
                        localStorage.setItem('userEmail', content);
                    } else if (response.data.email) {
                        localStorage.setItem('userEmail', response.data.email);
                    }

                    navigate('/CSE442-542/2023-Fall/cse-442ae/build/');
                    setError('');
                } else {
                    setError('Make sure you have the correct username/email and password');
                    setContent('');
                    setPassword('');
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        }
    }

    return (
        <div>
            <div className='app-container'>
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <Input_login placeholder="Username/Email address"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}

                <Input_login placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                <Bigbutton text="LOGIN" onClick={submit} />
                <Content_login />
            </div>
        </div>
    );
}

export default Login;
