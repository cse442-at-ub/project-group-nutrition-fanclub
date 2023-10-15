import React from 'react';

function Signup() {
    return (
      <div className="login-container">
        <form action="login_process.php" method="POST">
            <div className="input-container">
                <label for="username">User Name:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div className="input-container">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div className="input-container">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div className="input-container">
                <label for="favorite-restaurant">Favorite Restaurant:</label>
                <input type="text" id="favorite-restaurant" name="favorite-restaurant" required />
            </div>
            <div className="input-container">
                <label for="academic-year">Academic Year:</label>
                <input type="text" id="academic-year" name="academic-year" required />
            </div>

            <button type="submit">CREATE</button>
            </form>
        </div>
    );
}
  export default Signup;