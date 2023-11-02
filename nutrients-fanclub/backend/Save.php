<?php
include 'db.php';

$mysqli = connectToDatabase();

$data = json_decode(file_get_contents('php://input'), true);
$email = $data["email"];
$newPassword = $data["newPassword"];

// Hash the password for security
$hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

$stmt = $mysqli->prepare("UPDATE usersinfo SET password = ? WHERE email = ?");
$stmt->bind_param("ss", $hashedPassword, $email);
$stmt->execute();

$stmt->close();
$mysqli->close();
?>
