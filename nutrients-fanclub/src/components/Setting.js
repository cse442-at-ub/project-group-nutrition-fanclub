import React, { useState, useEffect } from 'react';
import './Setting.css'; 
import SettingImage from './Setting_image';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Setting() {
    const initialData = JSON.parse(localStorage.getItem('userData')) || {};
    const [data, setData] = useState(initialData);
    const defaultImagePath = initialData.image_path || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFLklEQVR4nO2a328VRRSAv6KlEGoM6h+AgFRiCwQCRYKJUQsiBB4kwfjgE1rf1AfE+geoKIRKtD74pNYIVt8UNEhMCsRQlQeDUYo/qsQXbQlSqlSa1kxybnJzcvbemd3ZvSXZL5lkc++cc3Znds85c2agpKSkpKQkb9qAbuAt4ATwE3AJ+E/aJfnN/dcnfZdxg7MCOABcBGZStt+B/aLrhqAJ2AqczvDQSe0U8IjYmJWsAc7k8OC6fQWsZhYxD+gFpmrc9BXgU2AvsE18wkKgWdpC+W2b9DkKjNfQ52wdBFoa/fBLgbMJNzkNfAI8mvJG3cDulIGbTrDxLbCEBnEvMJbw4IeB9oi2OoAPEwZhFOikYDYBV42b+RG4P0e7DwDnDbvuXrooiHUJD/8u0FqA/fnA24b9CWBDEd/8mPHK76F4XjB8w1/A4rwMzjMcnruB3QE6msWx9QM/yJs0Ltf98p/r48uTxiB8nVd06DVeu5CZ3wEMe8T5Yenry15Dh8seoyc5U8rIO56yc4CXA5MdN6sviawP7yn568AqItFkZHjO2y/wlA99+OrmBsGHVuPtcqlzFLYas+Mb6nYY3+i/ksWtk0FcINe98p+2td3T1oPGAG4mAqeVUpfk+NBszMpvdRKkDlkBap/g6xgHlOwgGVlpzMg9nrI7jZn3yQ7dIFxTsk6XDyuMNy5TRnpAKXO5vS/9Sta99r68rmSdk/PlqJJ9lQxcTDkTiKOsll0bINtpOF1fdinZEVLSZixpQxKMK0o+JE2+xbAdkirrVN1lsME8rZS4ZWkIf0ccgMuBtj9T8k+Rgj6lxGVcIZxT8i7U+bJeyX4XaLtHyb9BCk4oJa5aE4LOzlyc9+VQyqyzwnYlf5wU/KqUhJaptxhh0IU4n9Crw+DDgbbvVvI/k4JRpeT2QPmbge+NRKijThzXidA50RXCHcYyOZhJpWRuCh33GYnJNYnz68Uxtsr1IWPmnezGFHZbDJsNGQDHM0pPSHuedEQZgNGMn0CFOYZD9WlfBCyHc/kEfsnoBCvOKMtmyRnRkcZutR6371h4GNxiJENp2uUUUSBKGOzLkAhtMhxa5Vv8AHhMUu1KPaBNfjts+J6KXFfRiVC3UuJWWT7clbCtdQRY5CF/Z8ImyLjo9uFzJeuKp8EsM27AVYZrcRMwpOSmJBKE8qxRhxwSG/UWQxMxFkMYSUm95fATxsylefgKzxn6nI1ClsNIedm3IOKKpxeM1z4rA0aJrNYZgWOq/74sxtuNzCwpld2o+k5G2qVZZDjUDTXWETrz9Fl/1OSUUugclMU+1c95+1gcUbpfSej3ceyiKHIsRX+HbpdWM6j6uG8xFo8r3V8afR4y7tOF48w0ybGUasXnjQrPH6pPzFNeujznapW6gqT9z8mI9llthCS9P6A3NWJulbcq3f/UKb5Mxdwaq3DQeMXcFnWjedG4r9fyMNQCfGNEhVQFx0h0G15/KMPSvS5LjGXydIqCaayZ1w//p6TSubI2Idf/CLg1b+Pi8N437E/Iwa1C6Eo4JzQsu7R52tXefkYmxIXBQumUSsuM0QYin+9daSQ51a99yJ5DVBbLmRzrxqZlCb1LVmihzJcawbEaByWHivjmfaLDfjmWMpPQrsp2VY9Ua5YDt4m3nivXy+VARY+s5/WStrpdl1CXm7dPwypj3ZBHOymfxKxls7EuiNEGY+X2RdEuhxNGMjz0iKwyY547bghLpS73plRoL8iJ00lpYxJCj0uf3VnKWCUlJSUlJXjxP1+hj/GGg7fcAAAAAElFTkSuQmCC" ;

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'userData') {
                setData(JSON.parse(e.newValue));
            }
        };
    
        const handleUserDataUpdated = () => {
            setData(JSON.parse(localStorage.getItem("userData")));
        };
    
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userDataUpdated', handleUserDataUpdated);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userDataUpdated', handleUserDataUpdated);
        };
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();  
        try {
            const postData = {
                action: 'update',
                email: localStorage.getItem('userEmail'),  
                username: data.username,
                phone: data.phone,
                image_path: localStorage.getItem('image')
            };
            console.log(postData);
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Setting.php', postData);
            console.log("Response from server:", response.data); 
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <div className="container">
            <div className="header-tabs">
                <div className="header-left">
                    <text>Profile</text>
                </div>
                <div className="header-right">
                    <Link to="/CSE442-542/2023-Fall/cse-442ae/build/">
                        <button>Home</button>
                    </Link>
                    <Link to="/CSE442-542/2023-Fall/cse-442ae/build/Reset">
                        <button>Reset Password</button>
                    </Link>
                    <button>Manage Account</button>
                </div>
            </div>

            <div class="profile-image">
                <SettingImage defaultImage={defaultImagePath} />
            </div>


            <form onSubmit={handleSave}>
                <input type="text" className="input-field" placeholder="Username" value={data.username || ''} onChange={(e) => setData({ ...data, username: e.target.value })} />
                <div className="flex-container">
                    <input type="tel" className="input-field" placeholder="Phone Number" value={data.phone || ''} onChange={(e) => setData({ ...data, phone: e.target.value })} style={{flex: 1}} />
                </div>
                <button type="submit" className="save-button" onClick={() => console.log("Button clicked!")}>SAVE</button>
            </form>

            <p className="footer-text">
                UGRUB protects your privacy and personal information. We do not sell or share your personal information with third parties for marketing purposes.
            </p>
        </div>
    );
}

export default Setting;
