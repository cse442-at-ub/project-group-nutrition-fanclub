import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'; // Make sure axios is installed and imported for HTTP requests
import './ManageAccount.css'; // Make sure you create a CSS file with appropriate styles
import './style.css';

function ManageAccount() {
    const [feedback, setFeedback] = useState({
        message: '',
        errors: {}
    });

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // This is your backend endpoint for logging out
            const logoutEndpoint = 'https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/signout.php';

            // Axios POST request to the logout endpoint
            const response = await Axios.post(logoutEndpoint);

            // Assuming the logout is always successful as there is no status code check in the PHP code
            // You may need to adjust this if your backend does send different responses
            if (response.data === "Log Out successful") {
                setFeedback({
                    message: 'You have been logged out successfully.',
                    errors: {}
                });
                navigate('/login'); // navigate to login page
            } else {
                // Handle any unexpected responses from the backend
                setFeedback({
                    message: 'Failed to logout. Please try again.',
                    errors: {}
                });
            }
        } catch (error) {
            console.error('Logout failed:', error);
            setFeedback({
                message: 'An error occurred during logout. Please try again.',
                errors: {}
            });
        }
    };


    const handleDeleteAccount = async () => {
        try {
            // Placeholder for actual delete account backend endpointt
            const deleteAccountEndpoint = '/api/delete-account';

            // You should replace this with the actual backend call
            const response = await Axios.delete(deleteAccountEndpoint);

            // Check response from the backend and proceed
            if (response.status === 200) {
                setFeedback({
                    message: 'Your account has been deleted successfully.',
                    errors: {}
                });
                navigate('/CSE442-542/2023-Fall/cse-442ae/build/'); // navigate to some confirmation page or back to home
            } else {
                // Handle any errors returned from the backend
                setFeedback({
                    message: 'Failed to delete the account. Please try again.',
                    errors: {}
                });
            }
        } catch (error) {
            console.error('Delete account failed:', error);
            setFeedback({
                message: 'An error occurred while deleting the account. Please try again.',
                errors: {}
            });
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
                        <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>

                    {feedback.message && <div className="feedback" style={{ color: 'red' }}>{feedback.message}</div>}
                </div>
            </div>
        </div>
    );
}

export default ManageAccount;