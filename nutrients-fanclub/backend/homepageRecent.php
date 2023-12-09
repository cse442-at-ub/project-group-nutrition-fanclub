<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// $filtersMap = array(
//     "American" => array("Sizzles","C3","Wrap-it-Up","Tim Hortons")
// );



$servername = "oceanus.cse.buffalo.edu"; // Replace with your database server name
$username = "ryankhan"; // Replace with your database username
$password = "50389982"; // Replace with your database password
$dbname = "cse442_2023_fall_team_ae_db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = json_decode(file_get_contents("php://input",true));
    $restaurant = $response->Restaurant;
    // $stmt = $conn->prepare("SELECT username, comment FROM User_Comments WHERE restaurant_name = $restaurant ORDER BY created_at DESC LIMIT 1");
    // Your SQL query
    $sql = "SELECT username, comment FROM User_Comments WHERE restaurant_name = ? ORDER BY created_at DESC LIMIT 1";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param("s", $restaurant);
    // $restaurant = "your_restaurant_value"; // replace with your actual value

    // Execute the query
    $stmt->execute();

    // Bind the result variables
    $stmt->bind_result($username, $comment);

    // Fetch the result
    $stmt->fetch();

    // Check if there's a result
    if ($username !== null) {
        // Now $username and $comment contain the values from the query
        $result = array('Username' => $username, 'Comment' => $comment);
        echo json_encode($result);
        // echo json_encode(array($username, $comment));
    } else {
        // No result found
        echo json_encode("EPic fail");
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();



    // echo json_encode($response->Restaurant);
}

$conn->close();
?>
