<?php
// Start the session
session_start();

// Include the database connection script
include 'db.php';

// Get the database connection
$conn = connectToDatabase();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT password FROM usersinfo WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        echo "User does not exist";
    } else {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo "Login successfully!";
        } else {
            echo "Password invalid";
        }
    }
    $stmt->close();
}

$conn->close();
?>

