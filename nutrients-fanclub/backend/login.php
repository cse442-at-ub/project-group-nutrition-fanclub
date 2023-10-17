<?php
include "db.php";

//this script is for login
function hash_encode($password) {
    //The hash_encode function uses the password_hash function to hash the provided password. It returns the hashed password.
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    return $hashed_password;
}

function hash_decode($password, $hashed_password) {
    // The hash_decode function takes a password and a hashed password as parameters. It uses password_verify to check whether the provided password matches the hashed password. If the password is valid, it returns true; otherwise, it returns false.
    if(password_verify($password, $hashed_password) == 1){
        echo "The password is vaild";
        echo "<br>";
        return password_verify($password, $hashed_password);
    }
    else{
        echo "The password is invaild";
        echo "<br>";
        return password_verify($password, $hashed_password);
    }

}

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $stmt = $conn->prepare("SELECT password FROM usersinfo WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            echo "Logged in successfully!";
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "Invalid username!";
    }
    
    $stmt->close();
}
?>

<form method="post" action="">
    Username: <input type="text" name="username" required><br>
    Password: <input type="password" name="password" required><br>
    <input type="submit" value="Login">
</form>
