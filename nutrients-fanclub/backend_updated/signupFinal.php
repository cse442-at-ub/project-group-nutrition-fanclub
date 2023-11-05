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
            handlePostRequest($conn);
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

function checkAndCreateTable($conn) {
    // Check if the 'usersinfo' table exists
    $result = $conn->query("SHOW TABLES LIKE 'usersinfo'");
    if ($result->rowCount() == 0) {
        // SQL statement to create the 'usersinfo' table
        $sql = "CREATE TABLE usersinfo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            favorite_restaurant VARCHAR(255)
        )";
        $conn->exec($sql);
    }
}

function handlePostRequest($conn) {
    $user = json_decode(file_get_contents('php://input'));

    // Validate input fields
    $errors = [];

    if (emailExists($conn, $user->email)) {
        $errors['email'] = 'Email address already exists';
    }
    // ... add other validations as needed ...

    if (count($errors) > 0) {
        echo json_encode(['status' => 0, 'message' => 'Input validation failed', 'errors' => $errors]);
        exit();
    }

    // Insert user data
    $sql = "INSERT INTO usersinfo (username, password, email, favorite_restaurant) VALUES (:username, :password, :email, :favoriteRestaurant)";
    $param = $conn->prepare($sql);
    $param->bindParam(':username', $user->username);
    $hashed_password = password_hash($user->password, PASSWORD_DEFAULT);
    $param->bindParam(':password', $hashed_password);
    $param->bindParam(':email', $user->email);
    $param->bindParam(':favoriteRestaurant', $user->favorite_restaurant);
    
    if ($param->execute()) {
        echo json_encode(['status' => 1, 'message' => 'Record Created']);
    } else {
        echo json_encode(['status' => 0, 'message' => 'Record Failed to Create']);
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