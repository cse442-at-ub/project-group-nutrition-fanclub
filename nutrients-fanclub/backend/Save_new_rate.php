<?php
// Set headers for CORS and content type.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include the database connection file.
include 'db.php';

// Connect to the database using a function from your 'db.php' file.
$mysqli = connectToDatabase();

// Retrieve data from the front end.
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Extract 'name', 'count', and 'rate' from the received data.
$name = $mysqli->real_escape_string($data['name']);
$count = $mysqli->real_escape_string($data['count']);
$rate = $mysqli->real_escape_string($data['rate']);

// Check if the name exists in the database.
$query = "SELECT * FROM `restaurants_InFo` WHERE `name` = '$name'";
$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    // If the name exists, update the count and rate.
    $updateQuery = "UPDATE `restaurants_InFo` SET `count` = '$count', `rate` = '$rate' WHERE `name` = '$name'";
    $updateResult = $mysqli->query($updateQuery);
    
    if ($updateResult) {
        echo json_encode(array("message" => "Record updated successfully."));
    } else {
        echo json_encode(array("error" => "Failed to update record."));
    }
} else {
    // If the name does not exist, send a JSON response.
    echo json_encode(array("error" => "Name not exist."));
}

// Close the database connection.
$mysqli->close();

?>
