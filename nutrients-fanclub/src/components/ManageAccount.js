import React from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Bigbutton from './Bigbutton';
import Content_signup from "./Content_signup";


import './style.css';

function ManageAccount() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await Axios.post('YOUR_BACKEND_ENDPOINT_FOR_LOGOUT');
            if (response.data.status === 1) {
                navigate('/');
            } else {
                console.error("Error logging out:", response.data.message);
            }
        } catch (err) {
            console.error("An error occurred during logout:", err);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) {
            return;
        }

        try {
            const response = await Axios.post('YOUR_BACKEND_ENDPOINT_FOR_DELETE_ACCOUNT');
            if (response.data.status === 1) {
                navigate('/');
            } else {
                console.error("Error deleting account:", response.data.message);
            }
        } catch (err) {
            console.error("An error occurred during account deletion:", err);
        }
    };

    return (
        <div className='app-container' style={{ paddingTop: 150 }}>
            <h2>Manage Account</h2>

            <div className="account-action">
                <Content_signup title="Log Out Your Account" description="You can log out to ensure your account's security, especially on shared or public devices." />
                <Bigbutton text="Log Out" onClick={handleLogout} />
            </div>

            <div className="account-action">
                <Content_signup title="Delete Your Account" description="You can delete your account to permanently remove all your personal data and reviews from our platform. Once deleted, this action cannot be undone." />
                <Bigbutton text="Delete Account" onClick={handleDeleteAccount} />
            </div>
        </div>
    );
}

export default ManageAccount;
