<?php

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
    $filters = $_POST['filters'];

    // Check if filters were provided
    if (!empty($filters)) {
        $filterArray = explode(',', $filters);
        $filterString = "'" . implode("', '", $filterArray) . "'";

        $sql = "SELECT * FROM restaurants WHERE 
            (American = 'yes' AND 'American' IN ($filterString))
            OR (Chinese = 'yes' AND 'Chinese' IN ($filterString))
            OR (Halal = 'yes' AND 'Halal' IN ($filterString))
            OR (Japanese = 'yes' AND 'Japanese' IN ($filterString))
            OR (Indian = 'yes' AND 'Indian' IN ($filterString))
            OR (Korean = 'yes' AND 'Korean' IN ($filterString))";
    } else {
        // If no filters are provided, retrieve all restaurants
        $sql = "SELECT * FROM restaurants";
    }

    $result = $conn->query($sql);

    $restaurants = array(); // Create an array to hold restaurant data

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Add each restaurant to the array
            $restaurants[] = array(
                "name" => $row["name"],
                "cuisine" => $row["cuisine"]
            );
        }

        // Encode the array as JSON and echo the response
        echo json_encode($restaurants);
    } else {
        echo "No restaurants found for the specified filters.";
    }
}

$conn->close();
?>
