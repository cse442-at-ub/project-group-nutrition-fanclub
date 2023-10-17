<?php
include "db.php";


function hash_encode($password) {
    // 
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    return $hashed_password;
}

function hash_decode($password, $hashed_password) {
    // 
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
    
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
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
