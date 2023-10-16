import React from "react";
import Bigbutton from './Bigbutton';
import Content_signup from "./Content_signup";
import Input_login from './Input_login';
import Settingsbutton from "./Settingsbutton";

function Signup() {
    return (
        <div>
            <div className='app-container' style={{paddingTop: 225}}>
                <span>
                    <Input_login placeholder="Username"/>
                    <Input_login placeholder="Email address"/>
                    <Input_login placeholder="Password" type="password"/>
                    <Input_login placeholder="Confirm Password" type="password"/>
                    <Input_login placeholder="Favorite Restaurant"/>    
                    <Input_login placeholder="Academic Year" type="number"/>
                </span>
                <Bigbutton text="CREATE" />
                <Content_signup />
                <Settingsbutton />
            </div>
        </div>
    );
}

export default Signup;