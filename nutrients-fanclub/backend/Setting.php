<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

include 'db.php';

$mysqli = connectToDatabase();

// Ensure the columns 'phone' and 'image_path' exist in the table
$alter_sql = "ALTER TABLE usersinfo 
              ADD IF NOT EXISTS phone VARCHAR(15) DEFAULT NULL, 
              ADD IF NOT EXISTS image_path VARCHAR(255) DEFAULT NULL";
$mysqli->query($alter_sql);

// Get the JSON payload and decode it
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); // convert JSON into array

$action = $input['action'];

if ($action == 'retrieve') {
    // Get the email from the JSON data
    $email = $input['email'];

    // Prepare the SELECT statement to get phone, image_path, and username
    $select_sql = "SELECT username, phone, image_path FROM usersinfo WHERE email = ?";
    $stmt = $mysqli->prepare($select_sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($username, $phone, $image_path);
    $stmt->fetch();

    // Create an array to hold the user data
    $response = array('username' => $username, 'phone' => $phone, 'image_path' => $image_path);
    echo json_encode($response);

    // Close the prepared statement
    $stmt->close();
} elseif ($action == 'update') {
    // Get the data from the JSON data
    $email = $input['email'];
    $new_username = $input['username'];
    $phone = $input['phone'];
    $image_path = $input['image_path'];

    // Prepare the UPDATE statement to update the user data
    $update_sql = "UPDATE usersinfo SET username=?, phone=?, image_path=? WHERE email=?";
    $stmt = $mysqli->prepare($update_sql);
    $stmt->bind_param("ssss", $new_username, $phone, $image_path, $email);
    $stmt->execute();

    // Check if the record was successfully updated
    if ($stmt->affected_rows > 0) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record or no changes made";
    }

    // Close the prepared statement
    $stmt->close();
}

// Close the database connection
$mysqli->close();
?>
