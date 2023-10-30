<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "oceanus.cse.buffalo.edu";
    $username = "ryankhan";
    $password = "50389982";
    $dbname = "cse442_2023_fall_team_ae_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Validate that the required fields are not empty
    if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['email']) || empty($_POST['favoriteRestaurant'])) {
        die("Error: One or more fields are empty");
    }

    // Retrieve data from the POST request
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $favoriteRestaurant = $_POST['favoriteRestaurant'];

    $stmt = $conn->prepare("INSERT INTO usersinfo (username, password, email, favorite_restaurant) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $password, $email, $favoriteRestaurant);

    if ($stmt->execute() === TRUE) {
        echo "Account created successfully!";
    } else {
        if ($conn->errno === 1062) {
            echo "Error: Duplicate entry. Email already exists.";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    $stmt->close();
    $conn->close();
}
?>




