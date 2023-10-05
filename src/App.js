import React, { useState } from 'react';
import './App.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
            <header style={{ backgroundColor: '#2E6F57' }}>
                <span>UGRUB</span>
                <div class="button-container">
                    <label class="darkmode-label">Dark
                    <div className="toggle" onClick={toggleDarkMode}></div>
                    </label>    
                    <button class="home-button">HOME</button>
                    <button class="login-button">LOG IN</button>
                </div>
            </header>
            <main>
                <input placeholder="Usename/Email address" />
                <input type="password" placeholder="Password" />
                <button className="login-btn">LOGIN</button>
                <div>
                    <span>Not registered? </span><a href="#">Create an account</a>
                </div>
                <div>
                    <a href="#">Forget Password?</a>
                </div>
            </main>
        </div>
    );
}

export default App;