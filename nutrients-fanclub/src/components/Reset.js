
import React, { useState } from 'react';
import axios from 'axios';
import BigButton from './Bigbutton';
import "./Reset.css"
import { useNavigate } from 'react-router-dom';

function Reset() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const isEmail = (email) => {
    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };



  const handleSendEmail = async () => {
    if (!isEmail(email)) {
      setErrorMessage('Please enter a correct email address');
      setEmail('');
      return;
    }


    try {
      const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Check.php', { email });
      if (response.data.exist) {
        setStage(1);
        setGeneratedCode(response.data.verificationCode);
        console.log("verificationCode is",verificationCode,typeof verificationCode);
      } else {
        setErrorMessage('Email does not exist');
        setEmail('');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  const handleResetPassword = async () => {
    console.log("verificationCode is",verificationCode,typeof verificationCode);
    console.log("generatedCode is",generatedCode, typeof generatedCode);
    if (String(verificationCode) !== String(generatedCode)) {
      setErrorMessage('Verification code error');
      return;
   }
    if (newPassword.length > 26 || newPassword.includes(' ')) {
      setErrorMessage('The password length cannot exceed 26 characters, and you cannot use spaces in the password.');
      return;
    }
    try {
      await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Save.php', { email, newPassword });
      navigate('/CSE442-542/2023-Fall/cse-442ae/build/login');
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    <div className="reset-container">
      <h2 className={`header-${stage}`}>
        {stage === 0
          ? 'Please enter your email to reset your password'
          : 'We have sent an email to your email, please confirm and enter the verification code to reset your password.'}
      </h2>

      {stage === 0 && (
        <>
          <input className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
          <BigButton text="Send Email" onClick={handleSendEmail} />
        </>
      )}

      {stage === 1 && (
        <>
          <input className="verification-code-input" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" />
          <input className="new-password-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
          <BigButton text="Reset Password" onClick={handleResetPassword} />
        </>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Reset;
