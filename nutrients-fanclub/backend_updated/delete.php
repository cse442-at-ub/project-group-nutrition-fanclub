<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include 'config.php';

try {
    $db = new DbConn;
    $conn = $db->connect();
    
    // Check and create table logic here
    checkAndCreateTable($conn);

    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case "POST":
            $data = json_decode(file_get_contents("php://input"), true);

            if (isset($data->action) && $data->action === 'deleteAccount') {
                handleDeleteRequest($conn, $data->email);
            } else {
                handlePostRequest($conn);
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

function handleDeleteRequest($conn, $email) {
    // Validate input (you may add more validation logic as needed)
    if (empty($email)) {
        echo json_encode(['status' => 0, 'message' => 'Email not provided']);
        exit();
    }

    // Check if the email exists
    if (!emailExists($conn, $email)) {
        echo json_encode(['status' => 0, 'message' => 'Email not found']);
        exit();
    }

    // Delete the account
    $sql = "DELETE FROM usersinfo WHERE email = :email";
    $param = $conn->prepare($sql);
    $param->bindParam(':email', $email);

    if ($param->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Account deleted successfully']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Failed to delete account']);
    }
}

function emailExists($conn, $email) {
    $sql = "SELECT COUNT(*) FROM usersinfo WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    return $count > 0;
}
?>

