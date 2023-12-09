<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: text/plain");

include 'db.php';

$mysqli = connectToDatabase();

// check if a column exists in a given table
function columnExists($mysqli, $tableName, $columnName) {
    $checkQuery = "SHOW COLUMNS FROM `$tableName` LIKE '$columnName'";
    $result = $mysqli->query($checkQuery);
    return $result && $result->num_rows > 0;
}

// check if the phone column exists, if not, add it
if (!columnExists($mysqli, 'usersinfo', 'phone')) {
    $alterPhoneQuery = "ALTER TABLE usersinfo ADD phone VARCHAR(15) DEFAULT NULL";
    if ($mysqli->query($alterPhoneQuery)) {
        echo "Phone column added successfully.\n";
    } else {
        echo "Error adding phone column: " . $mysqli->error . "\n";
    }
}

// check if the image_path column exists and is the correct type, if not, add or modify it
if (!columnExists($mysqli, 'usersinfo', 'image_path')) {
    // If the column does not exist, add it with type MEDIUMTEXT
    $alterImagePathQuery = "ALTER TABLE usersinfo ADD image_path MEDIUMTEXT DEFAULT NULL";
    if ($mysqli->query($alterImagePathQuery)) {
        echo "Image_path column added successfully.\n";
    } else {
        echo "Error adding image_path column: " . $mysqli->error . "\n";
    }
} else {
    // If the column exists, change its type to MEDIUMTEXT
    $alterColumnTypeQuery = "ALTER TABLE usersinfo MODIFY image_path MEDIUMTEXT DEFAULT NULL";
    if ($mysqli->query($alterColumnTypeQuery)) {
        echo "Image_path column type changed to MEDIUMTEXT successfully.\n";
    } else {
        echo "Error changing image_path column type: " . $mysqli->error . "\n";
    }
}

// Close the MySQL connection
$mysqli->close();

?>
