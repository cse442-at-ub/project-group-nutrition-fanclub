import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'; // Make sure axios is installed and imported for HTTP requests
import './ManageAccount.css'; // Make sure you create a CSS file with appropriate styles
import './style.css';

function ManageAccount({handleLogout}) {
    const [feedback, setFeedback] = useState({
        message: '',
        errors: {}
    });
    const navigate = useNavigate();


    // Logout invoke the {handleLogout} from Navbar.js
    const handleDeleteAndLogout = async () => {
        await handleDeleteAccount();
        handleLogout();
    };

    const handleDeleteAccount = async () => {
        // Assuming the username is stored in localStorage after login
        const userEmail  = localStorage.getItem('userEmail');

        // If username is not stored, you should retrieve it from wherever you have stored the login information
        console.log('111111111111111111')
        console.log(userEmail )

        try {
            console.log('333333333333333')
            const response = await Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/delete.php', {
                email: userEmail
            });


            console.log('22222222222222')

            if (response.data.status === 1) {
                alert(response.data.message);
                localStorage.clear(); // Clear all local storage items including logged in user data
                navigate('/CSE442-542/2023-Fall/cse-442ae/build/login'); // Redirect to login after account deletion
            } else {
                alert(response.data.message);
            }
            navigate('/CSE442-542/2023-Fall/cse-442ae/build/')
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account. Please try again.');
            console.log(localStorage)
            console.log('Stored userEmail:', localStorage.getItem('userEmail')); // Log the stored userEmail for debugging

        }
    };


    return (
        <div className="manage-account-page">
            <div className="manage-account-box">
                <div className="manage-account-section">
                    <h2>Manage Account</h2>

                    <div className="manage-account-action">
                        <h3>Log Out Your Account</h3>
                        <p>You can log out to ensure your account's security, especially on shared or public devices.</p>
                        <button className="logout-button" onClick={handleLogout}>Log Out</button>
                    </div>

                    <div className="manage-account-action">
                        <h3>Delete Your Account</h3>
                        <p>You can delete your account to permanently remove all your personal data and reviews from our platform. Once deleted, this action cannot be undone.</p>
                        <button className="delete-button" onClick={handleDeleteAndLogout}>Delete Account</button>
                    </div>

                    {feedback.message && <div className="feedback" style={{ color: 'red' }}>{feedback.message}</div>}
                </div>
            </div>
        </div>
    );
}

export default ManageAccount;