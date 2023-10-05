<?php
<<<<<<< Updated upstream
$servername = "oceanus.cse.buffalo.edu:3306";
=======
$servername = "oceanus.cse.buffalo.edu";
>>>>>>> Stashed changes
$dbname = "haobowan_db";
$username = "username";
$password = "password";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
