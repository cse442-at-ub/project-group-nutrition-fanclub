<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Function to establish a database connection
function connectToDatabase() {   
    $host = "oceanus.cse.buffalo.edu"; // 
    $username = "haobowan"; // 
    $password = "50375823"; // 
    $database = "cse442_2023_fall_team_ae_db"; // 

    $mysqli = new mysqli($host, $username, $password, $database);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    return $mysqli;
}

?>
