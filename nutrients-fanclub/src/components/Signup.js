import Axios from "axios";
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

    const [errorMessages, setErrorMessages] = useState({});


    const signUpUser = (event) => {
        event.preventDefault();  // This will prevent the default action of the Link

        const userData = {
            username: username,
            password: password,
            email: email,
            favoriteRestaurant: favoriteRestaurant
        };

        // Store the user information
        Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_updadated_new/signupv3.php', userData)
            .then(response => {
                console.log(response.data);
                console.log("send success");
                // After success, you can programmatically navigate or just let the Link do its work
            })
            .catch(error => {
                console.log(error);
                // handle error scenario
                console.log("send fail")
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
                <Link to='/CSE442-542/2023-Fall/cse-442ae/build/login' onClick={signUpUser}>
                    <Bigbutton text="CREATE" />
                </Link>
                <Content_signup />
            </div>
        </div>
    );
}

export default Signup;
