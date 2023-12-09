<?php
// Set headers for CORS and content type.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Include the database connection file.
include 'db.php';

// Connect to the database using a function from your 'db.php' file.
$mysqli = connectToDatabase();

// Get the JSON payload from the front end.
$json = file_get_contents('php://input');
$data = json_decode($json);

// Initialize a response array.
$response = [];

// Check if the email exists in the usersinfo table.
$email = $mysqli->real_escape_string($data->email);
$userQuery = "SELECT username FROM usersinfo WHERE email = '$email'";

if ($result = $mysqli->query($userQuery)) {
    // Check if we have any rows returned.
    if ($result->num_rows == 0) {
        // No user with the given email.
        $response['message'] = 'Email does not exist';
    } else {
        // If the email exists in the usersinfo table, fetch the username.
        $row = $result->fetch_assoc();
        $username = $row['username'];
        
        // Begin transaction
        $mysqli->begin_transaction();
        
        // Delete all comments associated with this username from User_Comments.
        $deleteCommentsQuery = "DELETE FROM User_Comments WHERE username = '$username'";
        $mysqli->query($deleteCommentsQuery);

        // Delete all records from usersinfo with the given email.
        $deleteUserQuery = "DELETE FROM usersinfo WHERE email = '$email'";
        $mysqli->query($deleteUserQuery);
        
        // If deletion was successful, commit the transaction.
        if ($mysqli->commit()) {
            $response['message'] = 'Successfully deleted';
        } else {
            // If commit failed, rollback the transaction.
            $mysqli->rollback();
            $response['message'] = 'Deletion failed';
        }
    }
    $result->close();
} else {
    // Query failed.
    $response['message'] = 'Query failed';
}

// Close the database connection.
$mysqli->close();

// Encode the response to JSON and output it.
echo json_encode($response);
?>
