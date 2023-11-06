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
    $filters = json_decode(file_get_contents('php://input',true));
    $filtersMap = array(
            "American" => array("Sizzles","Crossroads Culinary Center","Wrap-It-Up","Tim Hortons","1846 Grill","Subway","Fowl Play"),
            "Chinese" => array("Crossroads Culinary Center","Young Chow","Pan Asia"),
            "Halal" => array("Kali Orexi"),
            "Indian" => array("Tikka Table"),
            "Japanese" => array("Dancing Chopsticks","Noodle Pavilion"),
            "Korean" => array("Pan Asia"),
            "Boba" => array("Tai-Chi Bubble Tea"),
            "Breakfast" => array("Crossroads Culinary Center", "Sizzles", "Wrap-It-Up"),
            "Pizza" => array("Crossroads Culinary Center","Mario's"),
            "Platter" => array("Crossroads Culinary Center", "Young Chow", "Dancing Chopsticks", "Moe's"),
            "Noodles" => array("Young Chow", "Dancing Chopsticks")

        );
    $list = array();
    //$list[] = $filters->filters[0];
    for ($i = 0; $i < count($filters->filters);$i++){
        $restuarantlist = $filtersMap[$filters->filters[$i]];
        for($j=0;$j<count($restuarantlist);$j++){
            $list[] = $restuarantlist[$j];
        }
    }
    $values = array_values(array_unique($list));
    $response = array();
    foreach ($values as $value) {
        $response[] = $value;
    }


    echo json_encode($response);
}

$conn->close();
?>
