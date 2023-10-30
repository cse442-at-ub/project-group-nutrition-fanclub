<!DOCTYPE html>
<html>
<body>

<h2>User Registration Form</h2>

<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  Username:<br>
  <input type="text" name="username">
  <br>
  Password:<br>
  <input type="password" name="password">
  <br>
  Email:<br>
  <input type="text" name="email">
  <br>
  Favorite Restaurant:<br>
  <input type="text" name="favoriteRestaurant">
  <br><br>
  <input type="submit" value="Submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "oceanus.cse.buffalo.edu";
    $username = "ryankhan";
    $password = "50389982";
    $dbname = "cse442_2023_fall_team_ae_db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Validate that the required fields are not empty
    if (empty($_POST['username']) || empty($_POST['password']) || empty($_POST['email']) || empty($_POST['favoriteRestaurant'])) {
        echo "Error: One or more fields are empty";
        exit;
    }

    // Retrieve data from the POST request
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $favoriteRestaurant = $_POST['favoriteRestaurant'];

    $stmt = $conn->prepare("INSERT INTO usersinfo (username, password, email, favorite_restaurant) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $password, $email, $favoriteRestaurant);

    if ($stmt->execute() === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>

</body>
</html>
