<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Content-Type: application/json");

// If an OPTIONS request is received, respond with a 200 status code without any further action.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

// Establish a connection to the database
$mysqli = connectToDatabase();

session_start();

function getUser($mysqli, $type, $content, $password)
{
    // Determine the field to use for login (username or email)
    $field = $type == 'username' ? 'username' : 'email';

    // Prepared statement for security against SQL Injection
    $stmt = $mysqli->prepare("SELECT * FROM usersinfo WHERE $field = ?");
    $stmt->bind_param("s", $content);

    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        $hashedPW = $user['password'];
        if (password_verify($password, $hashedPW)) {
            // Set a cookie for one day
            $cookie_name = 'currentUserCookie';
            setcookie($cookie_name, $user['id'], time() + 86400, "/");
            // Return simplified success status with email
            return ["status" => "success", "email" => $user['email']];
        } else {
            // Return simplified error status
            return ["status" => "error"];
        }
    } else {
        // Return simplified error status
        return ["status" => "error"];
    }
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        // Decode the JSON input
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data && isset($data['type']) && isset($data['content']) && isset($data['password'])) {
            $type = $data['type'];
            $content = $data['content'];
            $password = $data['password'];

            $response = getUser($mysqli, $type, $content, $password);
        } else {
            // If the JSON is not as expected, send an error message
            $response = ["status" => "error", "message" => "Invalid JSON format"];
        }

        // Respond with a JSON message
        echo json_encode($response);
        exit();
    default:
        // Handle other HTTP methods if needed
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed"]);
        break;
}

// Close the database connection if it's open
if (isset($mysqli) && $mysqli) {
    $mysqli->close();
}
?>
