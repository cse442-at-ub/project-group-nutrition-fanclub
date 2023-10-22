<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include 'config.php';

try {
    $db = new DbConn;
    $conn = $db->connect();

    // Check if the 'usersinfo' table exists
    $result = $conn->query("SHOW TABLES LIKE 'usersinfo'");
    if($result->rowCount() == 0) {
        // SQL statement to create the 'users' table if it doesn't exist
        $sql = "CREATE TABLE usersinfo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            favorite_restaurant VARCHAR(255) NOT NULL
        )";

        $conn->exec($sql);
        echo "Table 'usersinfo' created successfully!";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        
        // Validate input fields
        $errors = [];
        
        $sql = "SELECT COUNT(*) FROM usersinfo WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        
        if ($count > 0) {
            $errors['email'] = 'Email address already exists';
         }
        // if (!preg_match('/^[\w\s]+$/', $user->username)) {
        //     $errors['username'] = 'Username should only contain alphanumeric characters, underscores, and spaces';
        // }
        // if (!filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
        //     $errors['email'] = 'Invalid email address';
        // }
        // if (strlen($user->password) < 8) {
        //     $errors['password'] = 'Password should be at least 8 characters long';
        // }
        
        // if (count($errors) > 0) {
        //     $response = ['status' => 0, 'message' => 'Input validation failed', 'errors' => $errors];
        //     echo json_encode($response);
        //     exit();
        // } else {
            $sql = "INSERT INTO usersinfo (username, password, email, favorite_restaurant) VALUES (:username, :password, :email, :favoriteRestaurant)";
            $param = $conn->prepare($sql);
            $param->bindParam(':username', $user->username);
            $hashed_password = password_hash($user->password, PASSWORD_DEFAULT);
            $param->bindParam(':password', $hashed_password);
            $param->bindParam(':email', $user->email);
            $param->bindParam(':favoriteRestaurant', $user->favorite_restaurant);
            
            if ($param->execute()) {
                $response = ['status' => 1, 'message' => 'Record Created'];
            } else {
                $response = ['status' => 0, 'message' => 'Record Failed to Create'];
            }
            
            echo json_encode($response);
        
        break;
}

// Close the database connection
$conn = null;
?>







