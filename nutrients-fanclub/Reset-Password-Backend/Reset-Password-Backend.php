<?php
include 'db.php'; 

$mysqli = connectToDatabase();

// To prevent session hijacking
session_regenerate_id(true);

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['email'])) {
        if (isset($data['newPassword'])) {
            updatePassword($mysqli, $data['email'], $data['newPassword']);
        } else {
            checkEmail($mysqli, $data['email']);
        }
    }
}

function checkEmail($mysqli, $email) {
    $stmt = $mysqli->prepare("SELECT * FROM usersinfo WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        // Email exists
        echo json_encode(["status" => 0]);  // 0 email exsit
    } else {
        // Email does not exist
        echo json_encode(["status" => 1]);  // 1 email does not exsit
    }
    $stmt->close();
}

function updatePassword($mysqli, $email, $newPassword) {
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
    $stmt = $mysqli->prepare("UPDATE usersinfo SET password = ? WHERE email = ?");
    $stmt->bind_param("ss", $hashedPassword, $email);
    if ($stmt->execute()) {
        // Password updated successfully
        echo json_encode(["status" => "password_updated"]);
    } else {
        // Error occurred
        echo json_encode(["status" => "error_updating_password"]);
    }
    $stmt->close();
}

$mysqli->close();
?>
