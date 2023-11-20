<?php
// Set headers for CORS and content type.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include the database connection file.
include 'db.php';

// Connect to the database using a function from your 'db.php' file.
$mysqli = connectToDatabase();

// Check if the database connection was successful.
if (!$mysqli) {
    // Log the error message and return a JSON response if the connection failed.
    error_log("Database connection error: " . $mysqli->connect_error);
    echo json_encode(array('message' => 'Database connection error', 'status' => false));
    exit; // Exit the script after sending the response.
}

// Read the JSON input from the request.
$jsonData = file_get_contents('php://input');
error_log("Received data: " . $jsonData);

// Decode the JSON input into a PHP object.
$data = json_decode($jsonData);

// Check if there was a JSON decode error and respond accordingly.
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg());
    echo json_encode(array('message' => 'JSON decode error: ' . json_last_error_msg(), 'status' => false));
    exit; // Exit the script after sending the response.
}

// Prepare the SQL statement for inserting data into the 'User_Comments' table.
$stmt = $mysqli->prepare("INSERT INTO User_Comments (restaurant_name, username, comment, rating) VALUES (?, ?, ?, ?)");

// Check if the prepared statement was successful.
if (!$stmt) {
    error_log("Prepare statement error: " . $mysqli->error);
    echo json_encode(array('message' => 'Prepare statement error: ' . $mysqli->error, 'status' => false));
    exit; // Exit the script after sending the response.
}

// Check if the necessary data is set in the received JSON.
if (isset($data->restaurant_name, $data->username, $data->comment, $data->rating)) {
    // Bind the parameters to the prepared statement.
    $stmt->bind_param("sssd", $data->restaurant_name, $data->username, $data->comment, $data->rating);
    
    // Attempt to execute the prepared statement and respond accordingly.
    if ($stmt->execute()) {
        echo json_encode(array('message' => 'Comment added successfully', 'status' => true));
    } else {
        error_log("Execute statement error: " . $stmt->error);
        echo json_encode(array('message' => 'Error adding comment', 'status' => false, 'error' => $stmt->error));
    }
} else {
    error_log("Missing data in the received JSON");
    echo json_encode(array('message' => 'Missing data', 'status' => false));
}

// Close the prepared statement.
$stmt->close();

// Close the database connection.
$mysqli->close();

?>
