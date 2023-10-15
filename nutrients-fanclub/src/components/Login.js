import React from "react";
import Bigbutton_login from './Bigbutton_login';
import Content_login from './Content_login';
import Input_login from './Input_login';
import Settingsbutton from "./Settingsbutton";

function Login() {
    return (
        <div>
            <div className='app-container'>
                <Input_login placeholder="Username/Email address"/>
                <Input_login placeholder="Password" type="password"/>
                <Bigbutton_login/>
                <Content_login/>
                <Settingsbutton />
            </div>
        </div>
    );
}

export default Login;