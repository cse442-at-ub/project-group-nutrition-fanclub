<?php
// Set headers for CORS and content type.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include the database connection file.
include 'db.php';

// Connect to the database using a function from your 'db.php' file.
$mysqli = connectToDatabase();

// Assume the JSON data from the front end is received via a POST request.
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$restaurantName = $mysqli->real_escape_string($data['restaurant_name']);

// Initialize an array to hold the response.
$response = [];

// Check if the restaurant name exists in both tables.
$infoQuery = "SELECT location, count, rate FROM restaurants_Info WHERE name = ?";
$commentQuery = "SELECT restaurant_name, username, comment, rating FROM User_Comments WHERE restaurant_name = ? ORDER BY created_at DESC LIMIT 1";

// Prepare and execute the info query.
if ($stmt = $mysqli->prepare($infoQuery)) {
    $stmt->bind_param('s', $restaurantName);
    $stmt->execute();
    $resultInfo = $stmt->get_result();
    $info = $resultInfo->fetch_assoc();
    $stmt->close();
} else {
    echo json_encode(['error' => 'Error in query execution']);
    exit;
}

// Prepare and execute the comment query.
if ($stmt = $mysqli->prepare($commentQuery)) {
    $stmt->bind_param('s', $restaurantName);
    $stmt->execute();
    $resultComment = $stmt->get_result();
    $comment = $resultComment->fetch_assoc();
    $stmt->close();
} else {
    echo json_encode(['error' => 'Error in query execution']);
    exit;
}

// Check if data was found in both tables.
if ($info && $comment) {
    $response = [
        'name' => $comment['restaurant_name'],
        'address' => $info['location'],
        'count' => $info['count'],
        'rate' => $info['rate'],
        'lastPerson' => $comment['username'],
        'lastRating' => $comment['rating'],
        'lastContent' => $comment['comment']
    ];
} else {
    $response = ['error' => 'No corresponding data'];
}

// Close the database connection.
$mysqli->close();

// Return the response in JSON format.
echo json_encode($response);
?>

