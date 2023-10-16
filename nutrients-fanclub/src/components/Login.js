import React from "react";
import Bigbutton from './Bigbutton';
import Content_login from './Content_login';
import Input_login from './Input_login';

function Login() {
    return (
        <div>
            <div className='app-container'>
                <Input_login placeholder="Username/Email address"/>
                <Input_login placeholder="Password" type="password"/>
                <Bigbutton text="LOGIN" />
                <Content_login/>
            </div>
        </div>
    );
}

export default Login;