<?php
include 'db.php';

$mysqli = connectToDatabase();

$data = json_decode(file_get_contents('php://input'), true);
$email = $data["email"];

$stmt = $mysqli->prepare("SELECT * FROM usersinfo WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["exist" => true]);
} else {
    echo json_encode(["exist" => false]);
}

$stmt->close();
$mysqli->close();
?>
