import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bigbutton from './Bigbutton';
import Content_signup from "./Content_signup";
import Input_login from './Input_login';

import './style.css';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [favoriteRestaurant, setFavoriteRestaurant] = useState("");
    const [errors, setErrors] = useState({});
    const [genericError, setGenericError] = useState('');

    const navigate = useNavigate('/CSE442-542/2023-Fall/cse-442ae/build/login');
    //dddd

    const signUpUser = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password,
            email: email,
            favoriteRestaurant: favoriteRestaurant
        };

        Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/signupFinal.php', userData)//final scripts
            .then(response => {
                if (response.data.status === 1) {
                    console.log("send success");
                    setErrors({}); // Clear any errors
                } else if (response.data.status === 0) {
                    console.log("Error:", response.data.message);
                    setErrors(response.data.errors);
                }
            })
            // .catch(error => {
            //     console.log(error, 'catch the hoop');
            //     setGenericError('Something went wrong. Please try again.');
            // });
    };

    return (
        <div>
            <div className='app-container' style={{ paddingTop: 150 }}>
                {genericError && <div className="error-message">{genericError}</div>}
                <form onSubmit={signUpUser}>
                    <Input_login placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <div className="error-message">{errors.username}</div>}

                    <Input_login placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="error-message">{errors.email}</div>}

                    <Input_login placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <Input_login placeholder="Favorite Restaurant" value={favoriteRestaurant} onChange={(e) => setFavoriteRestaurant(e.target.value)} />
                    {errors.favoriteRestaurant && <div className="error-message">{errors.favoriteRestaurant}</div>}

                    <Bigbutton text="CREATE" />
                </form>
                <Content_signup />
            </div>
        </div>
    );
}

export default Signup;