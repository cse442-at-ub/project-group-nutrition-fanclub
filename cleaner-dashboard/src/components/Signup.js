import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Bigbutton from './Bigbutton';
import Content_signup from "./Content_signup";
import Input_signup from "./input_signup";

import './style.css';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        favorite_restaurant: ''
    });
    const [feedback, setFeedback] = useState({
        message: '',
        errors: {}
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/signupFinal.php', formData);
            const data = response.data;
            if (data.status === 1) {
                setFeedback({
                    message: data.message,
                    errors: {}
                });
                console.log("send success");
                navigate('/CSE442-542/2023-Fall/cse-442ae/build/login');  // Navigate after a successful signup
            } else {
                setFeedback({
                    message: data.message,
                    errors: data.errors
                });
            }
        } catch (err) {
            console.error("An error occurred:", err);
            setFeedback({
                message: 'An error occurred. Please try again.',
                errors: {}
            });
        }
    };

    return (
        <div className='app-container' style={{ paddingTop: 150 }}>
            <form onSubmit={handleSubmit}>
                <Input_signup
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {feedback.errors.username && <div className="error-message" style={{color: 'red'}}>{feedback.errors.username}</div>}

                <Input_signup
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {feedback.errors.email && <div className="error-message" style={{color: 'red'}}>{feedback.errors.email}</div>}

                <Input_signup
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {feedback.errors.password && <div className="error-message" style={{color: 'red'}}>{feedback.errors.password}</div>}

                <Input_signup
                    placeholder="Location"
                    name="favorite_restaurant"
                    value={formData.favorite_restaurant}
                    onChange={handleChange}
                />
                {feedback.errors.favorite_restaurant && <div className="error-message">{feedback.errors.favorite_restaurant}</div>}

                <Bigbutton text="CREATE" />
            </form>

            {feedback.message && <div className="feedback" style={{color: 'red'}}>{feedback.message}</div>}
            <Content_signup />
        </div>
    );
}

export default Signup;
