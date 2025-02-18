<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
//this script is for db connection, the signup_storeinDB.php file doesn't import this because i wrote the databse connection in there anyway- ryan
// Function to establish a database connection
function connectToDatabase() {   
    $host = "oceanus.cse.buffalo.edu"; // 
    $username = "ryankhan@buffalo.edu"; // 
    $password = "50375823"; // 
    $database = "cse442_2023_fall_team_ae_db"; // 

    $mysqli = new mysqli($host, $username, $password, $database);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    return $mysqli;
}

?>
