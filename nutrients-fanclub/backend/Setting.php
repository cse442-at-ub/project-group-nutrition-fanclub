<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include 'db.php';

$mysqli = connectToDatabase();

//
$alter_sql = "ALTER TABLE usersinfo ADD phone VARCHAR(15) DEFAULT NULL, ADD image_path VARCHAR(255) DEFAULT NULL";
$mysqli->query($alter_sql);

$action = $_POST['action'];

if ($action == 'retrieve') {
    // 
    $email = $_POST['email'];

    $select_sql = "SELECT phone, image_path FROM usersinfo WHERE email = ?";
    $stmt = $mysqli->prepare($select_sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($phone, $image_path);
    $stmt->fetch();

    $response = array('phone' => $phone, 'image_path' => $image_path);
    echo json_encode($response);

    $stmt->close();
} elseif ($action == 'update') {
    // 
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $image_path = $_POST['image_path'];

    $update_sql = "UPDATE usersinfo SET phone=?, image_path=? WHERE email=?";
    $stmt = $mysqli->prepare($update_sql);
    $stmt->bind_param("sss", $phone, $image_path, $email);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record or no changes made";
    }

    $stmt->close();
}

$mysqli->close();
?>

