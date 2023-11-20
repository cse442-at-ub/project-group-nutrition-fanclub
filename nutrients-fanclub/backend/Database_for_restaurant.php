<?php


include 'db.php';

$mysqli = connectToDatabase();


$dropForeignKey = "ALTER TABLE User_Comments DROP FOREIGN KEY User_Comments_ibfk_1;";

if ($mysqli->query($dropForeignKey) === TRUE) {
    echo "Foreign key constraint dropped successfully";
} else {
    echo "Error dropping foreign key constraint: " . $mysqli->error;
}



$modifyCommentsTable = "ALTER TABLE User_Comments CHANGE restaurant_id restaurant_name VARCHAR(255) NOT NULL;";

if ($mysqli->query($modifyCommentsTable) === TRUE) {
    echo "Table User_Comments modified successfully";
} else {
    echo "Error modifying table: " . $mysqli->error;
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




  



// close connect
$mysqli->close();
?>
