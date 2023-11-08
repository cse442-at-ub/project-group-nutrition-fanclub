<?php


include 'db.php';

$mysqli = connectToDatabase();

$createRestaurantsTable = "CREATE TABLE IF NOT EXISTS restaurants_InFo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL
)";

// try SQL 
if ($mysqli->query($createRestaurantsTable) === TRUE) {
    echo "Table restaurants_InFo created successfully";
} else {
    echo "Error creating table: " . $mysqli->error;
}

// SQL create User_Comments table
$createReviewsTable = "CREATE TABLE IF NOT EXISTS User_Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    user_id INT,
    comment TEXT,
    rating DECIMAL(2,1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants_InFo(id)
    ON DELETE CASCADE
)";

// try SQL 
if ($mysqli->query($createReviewsTable) === TRUE) {
    echo "Table reviews created successfully";
} else {
    echo "Error creating table: " . $mysqli->error;
}

function insertRestaurant($name, $location) {
    // 
    global $mysqli; 

    // 
    $stmt = $mysqli->prepare("INSERT INTO restaurants_InFo (name, location) VALUES (?, ?)");

    // 
    $stmt->bind_param("ss", $name, $location);

    // 
    $result = $stmt->execute();

    // 
    if ($result) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // 
    $stmt->close();
}

// 





// close connect
$mysqli->close();
?>
