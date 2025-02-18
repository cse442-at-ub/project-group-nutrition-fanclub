import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateInput = () => {
        let isValid = true;
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty.');
            isValid = false;
        }
        return isValid;
    };

    const submit = async (event) => {
        event.preventDefault();
        if (!validateInput()) return;

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username,
                password: password
            });
            if (response.data.status === 'success') {
                console.log('Login successful');

                // Set login status and role in localStorage
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('user_id', response.data.user.id);

                // Pass role to handleLogin
                handleLogin(response.data.user.role);

                // Redirect to the home page
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError('Failed to connect to the server.');
        }
    };

    return (
        <div className="app-container">
            <h1>Login</h1>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={submit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
