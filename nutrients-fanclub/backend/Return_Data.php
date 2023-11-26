<?php
// Set headers for CORS and content type.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include the database connection file.
include 'db.php';

// Connect to the database using a function from your 'db.php' file.
$mysqli = connectToDatabase();

// Assume the restaurant name is received via POST request or as a query parameter
// You should validate and sanitize this input.
$restaurantName = $_POST['restaurant_name'] ?? $_GET['restaurant_name'] ?? '';

// Initialize an array to hold the response data
$responseData = [];

// Check if the restaurant name exists in both tables
$checkExistenceQuery = "SELECT COUNT(*) AS count FROM restaurants_Info WHERE name = ? UNION ALL SELECT COUNT(*) AS count FROM User_Comments WHERE restaurant_name = ?";
$stmt = $mysqli->prepare($checkExistenceQuery);
$stmt->bind_param("ss", $restaurantName, $restaurantName);
$stmt->execute();
$result = $stmt->get_result();

// Fetch the results
$counts = $result->fetch_all(MYSQLI_ASSOC);

// Check if restaurant name exists in both tables
if ((int)$counts[0]['count'] > 0 && (int)$counts[1]['count'] > 0) {
    // Fetch data from restaurants_Info
    $infoQuery = "SELECT location, count, tags, images FROM restaurants_Info WHERE name = ?";
    $infoStmt = $mysqli->prepare($infoQuery);
    $infoStmt->bind_param("s", $restaurantName);
    $infoStmt->execute();
    $infoResult = $infoStmt->get_result();
    $restaurantInfo = $infoResult->fetch_assoc();

    // Fetch the latest comment from User_Comments
    $commentQuery = "SELECT username, comment, rating FROM User_Comments WHERE restaurant_name = ? ORDER BY created_at DESC LIMIT 1";
    $commentStmt = $mysqli->prepare($commentQuery);
    $commentStmt->bind_param("s", $restaurantName);
    $commentStmt->execute();
    $commentResult = $commentStmt->get_result();
    $latestComment = $commentResult->fetch_assoc();

    // Combine the data into one array
    $responseData = [
        'name' => $restaurantName,
        'address' => $restaurantInfo['location'],
        'count' => (int)$restaurantInfo['count'],
        'rate' => (float)$latestComment['rating'],
        'tags' => json_decode($restaurantInfo['tags']),
        'lastPerson' => $latestComment['username'],
        'lastRating' => (float)$latestComment['rating'],
        'lastcontent' => $latestComment['comment'],
        'image' => json_decode($restaurantInfo['images'])
    ];
} else {
    // If restaurant name does not exist in both tables
    $responseData = ['error' => 'No corresponding data'];
}

// Close the prepared statement and the database connection
$stmt->close();
$mysqli->close();

// Encode the response data array to JSON and output it
echo json_encode($responseData);
?>

