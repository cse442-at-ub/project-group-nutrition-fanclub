import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AdminNavbar from './components/AdminNavbar';
import Navbar from './components/Navbar';
import CleanerNavbar from './components/CleanerNavbar';
// import Settingsbutton from './components/Settingsbutton';
import Signup from './components/Signup';
import Reset from './components/Reset';
// import Setting from './components/Setting';
import ManageAccount from "./components/ManageAccount";
import Layout from "./components/Layout";
import ScheduleJobs from './components/ScheduleJobs'; 
// import PaymentStatus from './components/PaymentStatus';
import './index.css';
import TicketsComponent from './components/Tickets';
import EmployerNavbar from './components/EmployerNavbar';
import SubmitTicket from './components/SubmitTicket';
import BookingCleaner from './components/BookingCleaner';
function App() {
    const [isLogin, setIsLogin] = useState(false); // Track login state
    const [role, setRole] = useState(null); // Track user role

    // Handle login
    const handleLogin = (userRole) => {
        setIsLogin(true);
        setRole(userRole); // Update role when logged in
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('role', userRole);
    };

    // Handle logout
    const handleLogout = () => {
        setIsLogin(false);
        setRole(null);
        localStorage.clear(); // Clear local storage
        window.location.reload();
    };

    // Check login status and role on app load
    useEffect(() => {
        const loggedIn = localStorage.getItem('isLogin') === 'true';
        const userRole = localStorage.getItem('role');
        setIsLogin(loggedIn);
        setRole(userRole);
    }, []);

    // Render the appropriate Navbar based on the role
    const renderNavbar = () => {
        if (!isLogin) {
            return <Navbar isLogin={false} handleLogout={handleLogout} />;
        }
        if (role === 'admin') {
            return <AdminNavbar isLogin={true} handleLogout={handleLogout} />;
        }
        if (role === 'cleaner') {
            return <CleanerNavbar isLogin={true} handleLogout={handleLogout} />;
        }
        if (role === 'employer') {
            return <EmployerNavbar isLogin={true} handleLogout={handleLogout} />;
        }
        return <Navbar isLogin={true} handleLogout={handleLogout} />;
    };

    return (
        <div className="App">
            <Router basename="/cleaner">
                {renderNavbar()} {/* Dynamically render Navbar based on role */}
                {/* <Settingsbutton isLogin={isLogin} /> */}
                <div style={{ paddingTop: 40 }}></div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup />} />
                    {/* <Route path="/setting" element={<Setting />} /> */}
                    <Route path="/reset" element={<Reset />} />
                    <Route path="/manageaccount" element={<ManageAccount handleLogout={handleLogout} />} />
                    <Route path="/layout" element={<Layout />} />
                    <Route path="/schedule-jobs" element={<ScheduleJobs />} />
                    {/* <Route path="/payment-status" element={<PaymentStatus />} /> */}
                    <Route path="/submit-ticket" element={<SubmitTicket />} />
                    {isLogin && <Route path="/tickets" element={<TicketsComponent />} />}
                    {isLogin && <Route path="/booking-cleaner" element={<BookingCleaner />} />}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
