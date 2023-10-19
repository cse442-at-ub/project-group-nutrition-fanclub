<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// Establish a connection to the database
$mysqli = connectToDatabase();

session_start();

function getUser($mysqli, $username, $password)
{
     // Prepared statement for security against SQL Injection
     $stmt = $mysqli->prepare("SELECT * FROM usersinfo WHERE username = ?");
     $stmt->bind_param("s", $username);

     $stmt->execute();
     $result = $stmt->get_result();
     $user = $result->fetch_assoc();

     if ($user) {
         $hashedPW = $user['password'];
         if (password_verify($password, $hashedPW)) {
             // Set a cookie for one day
             $cookie_name = 'currentUserCookie';
             setcookie($cookie_name, $user['id'], time() + 86400, "/");
             return ["status" => "Login successfully", "message" => "Account Verified"];
         } else {
             return ["status" => "error", "message" => "Wrong Password"];
         }
     } else {
         return ["status" => "error", "message" => "No Account With That Username"];
     }
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
     case "POST":
         // Decode the JSON input
         $data = json_decode(file_get_contents('php://input'));
         $username = $data->username;
         $password = $data->password;

         $response = getUser($mysqli, $username, $password);
        
         // Respond with a JSON message
         echo json_encode($response);
         exit();
}
?>
