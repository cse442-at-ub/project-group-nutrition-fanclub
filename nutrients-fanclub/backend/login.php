<?php
include "config.php";

// Start the session
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Protect against SQL injection
    $username = mysqli_real_escape_string($conn, $username);

    $query = "SELECT id, password FROM users WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        // Fetching the hashed password from the database
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            // Password is correct, set the session
            $_SESSION["loggedin"] = true;
            $_SESSION["id"] = $row["id"];
            $_SESSION["username"] = $username;

            header("location: welcome.php");
        } else {
            $error = "Your Login Name or Password is invalid";
        }
    } else {
        $error = "Your Login Name or Password is invalid";
    }
}
?>

<!-- HTML for the login form -->
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

<form action="" method="post">
    <label>Username :</label>
    <input type="text" name="username"><br><br>
    <label>Password :</label>
    <input type="password" name="password"><br><br>
    <input type="submit" value=" Submit "><br>
</form>

</body>
</html>
