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
                if (response.data.status == 1) {
                    console.log("send success");
                    // Handle successful registration. For instance, you might navigate the user to the login page or show a success message.
                } else if (response.data.status == 0) {
                    console.log("Error:", response.data.message);
                    console.log("Validation Issues:", response.data.errors);
                    // Handle the errors, for instance, show an error message to the user.
                }
            })
            .catch(error => {
                console.log(error);
                // Handle network errors or unexpected issues.
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
