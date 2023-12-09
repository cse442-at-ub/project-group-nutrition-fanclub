<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include 'config.php';

try {
    $db = new DbConn;
    $conn = $db->connect();
    

    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case "GET":
            handleGetCommentsRequest($conn);
            break;
        default:
            echo json_encode(['status' => 0, 'message' => 'Method not supported']);
            break;
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 0, 'message' => "Error: " . $e->getMessage()]);
} finally {
    $conn = null; // Close the database connection
}

function handleGetCommentsRequest($conn) {
    // Retrieve the most recent comment's restaurant_name, username, rating, and comment from the User_Comments table
    $sql = "SELECT restaurant_name, username, rating, comment FROM User_Comments ORDER BY created_at DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result) {
        $mostRecentComment = $result->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['status' => 1, 'most_recent_comment' => $mostRecentComment]);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to retrieve the most recent comment']);
    }
}
?>



