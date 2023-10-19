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

    const signUpUser = () => {
        const userData = {
            username: username,
            password: password,
            email: email,
            favoriteRestaurant: favoriteRestaurant
        };

        // Store the user information
        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_updated/signup_storeinDB.php', userData)
            .then(response => {
                console.log(response.data);
                // handle success scenario
            })
            .catch(error => {
                console.log(error);
                // handle error scenario
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
