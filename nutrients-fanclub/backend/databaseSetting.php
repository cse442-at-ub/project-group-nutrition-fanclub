<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: text/plain");

include 'db.php';

$mysqli = connectToDatabase();

// check table exist
function columnExists($mysqli, $tableName, $columnName) {
    $checkQuery = "SHOW COLUMNS FROM `$tableName` LIKE '$columnName'";
    $result = $mysqli->query($checkQuery);
    return $result && $result->num_rows > 0;
}

// check phone exist, if not, add it
if (!columnExists($mysqli, 'usersinfo', 'phone')) {
    $alterPhoneQuery = "ALTER TABLE usersinfo ADD phone VARCHAR(15) DEFAULT NULL";
    if ($mysqli->query($alterPhoneQuery)) {
        echo "Phone column added successfully.\n";
    } else {
        echo "Error adding phone column: " . $mysqli->error . "\n";
    }
}

// check image_path exist, if not, add it
if (!columnExists($mysqli, 'usersinfo', 'image_path')) {
    $alterImagePathQuery = "ALTER TABLE usersinfo ADD image_path VARCHAR(255) DEFAULT NULL";
    if ($mysqli->query($alterImagePathQuery)) {
        echo "Image_path column added successfully.\n";
    } else {
        echo "Error adding image_path column: " . $mysqli->error . "\n";
    }
}

$mysqli->close();
?>

?>