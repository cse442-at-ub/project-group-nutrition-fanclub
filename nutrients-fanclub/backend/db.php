<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Function to establish a database connection
function connectToDatabase() {   
    $host = "oceanus.cse.buffalo.edu"; // 
    $username = "haobowan"; // 
    $password = "50375823"; // 
    $database = "cse442_2023_fall_team_ae_db"; // 

    $mysqli = new mysqli($host, $username, $password, $database);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    return $mysqli;
}
// // Function to create the 'users' table
// function createUsersTable() {
//     $mysqli = connectToDatabase();
// // SQL statement to create the 'users' table
//     $sql = "CREATE TABLE IF NOT EXISTS usertest (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL
//     )";

//     if ($mysqli->query($sql) === TRUE) {
//         echo "Table 'users' created successfully!";
//     } else {
//         echo "Error creating table: " . $mysqli->error;

// }

// $mysqli->close();
// }

// // Function to add a new user to the database
// function addUser($username, $password) {
// $mysqli = connectToDatabase();

// // Hash the password for security
// $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// // Prepare the SQL statement
// $stmt = $mysqli->prepare("INSERT INTO usertest (username, password) VALUES (?, ?)");

// // Bind parameters
// $stmt->bind_param("ss", $username, $hashedPassword);

// // Execute the statement
// if ($stmt->execute()) {
//     echo "User registration successful!";
// } else {
//     echo "Error: " . $stmt->error;
// }

// // Close the statement and database connection
// $stmt->close();
// $mysqli->close();
// }

// createUsersTable();

// // Example usage to add a new user
// addUser("abc", "abcd");
?>
