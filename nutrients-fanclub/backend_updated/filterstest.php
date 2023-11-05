<?php

$servername = "oceanus.cse.buffalo.edu"; // Replace with your database server name
$username = "ryankhan"; // Replace with your database username
$password = "50389982"; // Replace with your database password
$dbname = "cse442_2023_fall_team_ae_db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $filters = json_decode(file_get_contents('php://input',true));
    $list = array("Sizzles","DC");
    echo json_encode($list);
}

$conn->close();
?>
