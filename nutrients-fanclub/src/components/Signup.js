import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bigbutton from './Bigbutton';
import Content_signup from "./Content_signup";
import Input_login from './Input_login';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [favoriteRestaurant, setFavoriteRestaurant] = useState("");
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        favoriteRestaurant: '',
        submit: ''
    });

    const signUpUser = () => {
        const userData = {
            username: username,
            password: password,
            email: email,
            favoriteRestaurant: favoriteRestaurant
        };

        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_updated/signup_storeinDB.php', userData)
            .then(response => {
                const response_json = JSON.parse(response.data.substring(1));
                if (response_json.status === 0) {
                    const error = response_json.errors;
                    let allErrors = {};
                    for (const field in error) {
                        allErrors[field] = error[field];
                    }
                    setErrors({ ...allErrors, submit: 'Unable to create account, please check all fields' });
                    console.log("Unable to create account, please check all fields");
                } else {
                    setErrors({
                        username: '',
                        email: '',
                        password: '',
                        favoriteRestaurant: '',
                        submit: ''
                    });
                    console.log("User registration successful!");
                    // Uncomment the next line if you want to navigate after successful registration
                    // navigate('/CSE442-542/2023-Fall/cse-442ae/build/login');
                }
            })
            .catch(error => {
                console.log(error);
                setErrors({ ...errors, submit: 'An error occurred. Please try again later.' });
                console.log("An error occurred. Please try again later.");
            });
    };

    return (
        <div>
            <div className='app-container' style={{ paddingTop: 150 }}>
                <span>
                    <Input_login placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input_login placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input_login placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input_login placeholder="Favorite Restaurant" value={favoriteRestaurant} onChange={(e) => setFavoriteRestaurant(e.target.value)} />
                </span>
                <Link to='/CSE442-542/2023-Fall/cse-442ae/build/login'><Bigbutton text="CREATE" onClick={signUpUser} /></Link>
                <Content_signup />
            </div>
        </div>
    );
}

export default Signup;
