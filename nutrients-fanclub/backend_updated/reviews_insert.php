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
        case "POST":
            $data = json_decode(file_get_contents("php://input"), true);

            if (isset($data['action']) && $data['action'] === 'addComment') {
                handleAddCommentRequest($conn, $data);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Invalid action']);
            }
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

function handleAddCommentRequest($conn, $data) {
    // Validate input (you may add more validation logic as needed)
    $requiredFields = ['restaurantID', 'user_id', 'comment', 'rating'];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            echo json_encode(['status' => 0, 'message' => ucfirst($field) . ' is required']);
            exit();
        }
    }

    $restaurantID = $data['restaurantID'];
    $user_id = $data['user_id'];
    $comment = $data['comment'];
    $rating = $data['rating'];
    $created_at = date('Y-m-d H:i:s'); // Current date and time

    // Insert the comment
    $sql = "INSERT INTO User_Comments (restaurant_id, user_id, comment, rating, created_at) VALUES (:restaurantID, :user_id, :comment, :rating, :created_at)";
    $param = $conn->prepare($sql);
    $param->bindParam(':restaurantID', $restaurantID);
    $param->bindParam(':user_id', $user_id);
    $param->bindParam(':comment', $comment);
    $param->bindParam(':rating', $rating);
    $param->bindParam(':created_at', $created_at);

    if ($param->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Comment added successfully']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to add comment']);
    }
}
?>
