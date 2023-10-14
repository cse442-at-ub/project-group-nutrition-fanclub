import React from "react";
import './Navbar_login.css'

function Navbar_login(props) {
    return (
        <div className="navbar-login">
            <div className="navbar-login-left">
                <span className="navbar-title">UGRUB</span>
            </div>
            <div className="navbar-login-right"> 
            <span className="navbar-text">Dark</span>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                </label>
                <button className="home-button">HOME</button>
                <button className="login-button">LOG IN</button>
            </div>
        </div>
    );
}

export default Navbar_login;