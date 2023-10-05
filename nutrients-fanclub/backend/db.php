<?php
$servername = "oceanus.cse.buffalo.edu";
$dbname = "cse442_2023_fall_team_ae_db";
$username = "haobowan";
$password = "50375823";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
