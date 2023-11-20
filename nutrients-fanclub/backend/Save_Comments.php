<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include 'db.php';

$mysqli = connectToDatabase();

// 
$jsonData = file_get_contents('php://input');
error_log("Received data: " . $jsonData);

$data = json_decode($jsonData);

// 
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg());
    echo json_encode(array('message' => 'JSON decode error: ' . json_last_error_msg(), 'status' => false));
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO User_Comments (restaurant_id, username, comment, rating) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    error_log("Prepare statement error: " . $mysqli->error);
    echo json_encode(array('message' => 'Prepare statement error: ' . $mysqli->error, 'status' => false));
    exit;
}

if (isset($data->restaurant_id, $data->username, $data->comment, $data->rating)) {
    $stmt->bind_param("isss", $data->restaurant_id, $data->username, $data->comment, $data->rating);
    
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

$stmt->close();
$mysqli->close();

?>
