<?php
$servername = "oceanus.cse.buffalo.edu:3306";
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
