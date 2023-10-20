<?php
include 'config.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
//this script stores new user info (username,password,email,fav restaurant) into usersinfo table
function isPasswordValidLength($password) {
    // 8 - 20 length
    return strlen($password) >= 8 && strlen($password) <= 20;
}

function isValidInput($input) {
    // 
    $invalidCharacters = [' ', '!', '@', '#', '$', '%', '^', '&', '*'];
    foreach ($invalidCharacters as $char) {
        if (strpos($input, $char) !== false) {
            return false;
        }
    }
    return true;
}

function containsNumberAndLetter($input) {
    //is number and letter?
    return preg_match('/[A-Za-z]/', $input) && preg_match('/[0-9]/', $input);
}

function checkPasswordValidity($input) {
    // only number and letter
    return preg_match('/^[A-Za-z0-9]+$/', $input) ? "Valid" : "Password invalid";
}


// create the 'users' table
    $db = new DbConn;
    $conn = $db->connect();
// SQL statement to create the 'users' table
    $sql = "CREATE TABLE IF NOT EXISTS usersinfo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        favorite_restaurant VARCHAR(255) NOT NULL
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Table 'users' created successfully!";
    } else {
        echo "Error creating table: " . $mysqli->error;

}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "SELECT COUNT(*) FROM usersinfo WHERE email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        // Validate input fields
        $errors = [];

        if ($count > 0) {
            $errors['email'] = 'Email address already exists';
        }
        if (!preg_match('/^[a-zA-Z ]+$/', $user->username)) {
            $errors['username'] = 'Username should only contain letters and spaces';
        }
        if (!filter_var($user->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Invalid email address';
        }
        if (strlen($user->password) < 8) {
            $errors['password'][] = 'Password should be at least 8 characters long';
        }
        if (count($errors) > 0) {
            $response = ['status' => 0, 'message' => 'Input validation failed', 'errors' => $errors];
            echo json_encode($response);
            exit();
        } else {
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
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Test Form</title>
</head>
<body>
    <form action="https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_updadated_new/signup.php" method="POST">
        <input type="text" name="username" placeholder="Username"><br><br>
        <input type="password" name="password" placeholder="Password"><br><br>
        <input type="email" name="email" placeholder="Email"><br><br>
        <input type="text" name="favorite_restaurant" placeholder="Favorite Restaurant"><br><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>







