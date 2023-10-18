import React, { useState } from "react";
import Bigbutton from './Bigbutton';
import Content_login from './Content_login';
import Input_login from './Input_login';
import axios from 'axios';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        let isValid = true;

        if (username.includes(' ') || username.includes('#') || 
        username.includes('!') || username.includes('$') || username.includes('%') || username.includes('^') ||
        username.includes('&') || username.includes('*') || username.includes('(') || username.includes(')')) {
            setUsernameError('You cannot use special characters as a username');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length > 26 || password.includes(' ')) {
            setPasswordError('The password length cannot exceed 26 characters, and you cannot use spaces in the password.');
            isValid = false;
        }else {
            setPasswordError('');
        }

        return isValid;
    }


    const submit = async() => {
        if (validateInput()) {
            try {
                const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_updated/newlogin.php', {username, password});

                if (response.data === 'Login successfully') {
                    console.log('Login successfully');
                    window.location.href = '/CSE442-542/2023-Fall/cse-442ae/build/signup'
                    setError('');
                } else {
                    setError('Make sure you have the correct username/email and password');
                    setUsername('');
                    setPassword('');
                }
            } catch (error) {}
        }
    }


    return (
        <div>
            <div className='app-container'>
                {error && <div style={{color: 'red'}}>{error}</div>}

                <Input_login placeholder="Username/Email address"
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}
                             />
                {usernameError && <div style={{color: 'red'}}>{usernameError}</div>}


                <Input_login placeholder="Password" 
                             type="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             />
                {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}
                <Bigbutton text="LOGIN" onClick={submit}/>
                <Content_login/>
            </div>
        </div>
    );
}

export default Login;