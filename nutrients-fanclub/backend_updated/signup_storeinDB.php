$<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
//this script stores new user info (username,password,email,fav restaurant) into usersinfo table
// Function to establish a database connection
function connectToDatabase() {   
    $host = "oceanus.cse.buffalo.edu"; // MySQL server hostname
    $username = "ryankhan"; // MySQL username
    $password = "50389982"; // MySQL password
    $database = "cse442_2023_fall_team_ae_db"; // Name of your MySQL database

    $mysqli = new mysqli($host, $username, $password, $database);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    return $mysqli;
}
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
// Function to create the 'users' table
function createUsersTable() {
    $mysqli = connectToDatabase();
// SQL statement to create the 'users' table
    $sql = "CREATE TABLE IF NOT EXISTS usersinfo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        favorite_restaurant VARCHAR(255) NOT NULL
    )";

    if ($mysqli->query($sql) === TRUE) {
        echo "Table 'users' created successfully!";
    } else {
        echo "Error creating table: " . $mysqli->error;

}

$mysqli->close();
}

// Function to add a new user to the database
function addUser($username, $password, $email, $favoriteRestaurant) {
$mysqli = connectToDatabase();

// Hash the password for security
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare the SQL statement
$stmt = $mysqli->prepare("INSERT INTO usersinfo (username, password, email, favorite_restaurant) VALUES (?, ?, ?, ?)");

// Bind parameters
$stmt->bind_param("ssss", $username, $hashedPassword, $email, $favoriteRestaurant);

// Execute the statement
if ($stmt->execute()) {
    echo "User registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and database connection
$stmt->close();
$mysqli->close();
}

// Call the createUsersTable function to create the 'users' table
createUsersTable();

// Example usage to add a new user
addUser("Mr.Hotdog", "buzzlightyear", "mrhotdog@example.com", "Wendy's");
addUser("meowman", "rtcgvfhbjnksc", "meowman@example.com", "arbys");
addUser("hao", "69420550", "hao@example.com", "Young chow");
?>