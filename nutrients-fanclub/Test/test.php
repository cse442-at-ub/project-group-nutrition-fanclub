<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    include "../backend/loginbackendFunction.php";
    
    // echo "test123";
    // echo password_hash("test123", PASSWORD_DEFAULT);
    $input = "test123";
    // $ad = password_hash("test123",PASSWORD_DEFAULT);
    // echo "<br>";
    // echo $ad;
    // echo "<br>";
    // echo $ad;
    // echo "<br>";
    // echo password_verify("test1244", $ad);
    $rs = hash_encode($input);
    echo "The password(test123)'s hash_pass is: ";
    echo $rs;
    echo "<br>";
    echo "Enter the right password: test123, it should get The password is vaild.";
    echo "<br>";
    echo " we get:  ";
    $d_rs = hash_decode($input,$rs);
    echo $d_rs;
    echo "<br>";
    echo "Enter the wrong password: test1244, it should get The password is invaild.";
    echo "<br>";
    echo " we get:  ";
    $ws = hash_decode("test1244",$rs);
    echo $ws;
    echo "Enter the wrong password: tes4, it should get The password is invaild.";
    echo "<br>";
    echo " we get:  ";
    echo hash_decode("tes4",$rs);
    echo "<br>";
    echo "<br>";
    $usernames = ["simpleName", "veryLongUsernameMoreThan15Chars"];
    $passwords = ["short", "validLength123", "veryLongPasswordMoreThan20Characters"];


    $inputs = ["normalInput", "inv@lid", "inval!d", "goodInput"];

    $checks = ["password1", "password", "12345", "Pass123"];


    echo "<br/>";

    foreach ($passwords as $password) {
    
   
    echo "Testing password '$password': ";
        echo isPasswordValidLength($password) ? "Valid Length" : "Invalid Length";
        echo "<br/>";
}

    echo "<br/>";

    foreach ($inputs as $input) {
        echo "Testing input '$input': ";
        echo isValidInput($input) ? "Valid Input" : "Invalid Input";
        echo "<br/>";
}

    echo "<br/>";

    foreach ($checks as $check) {
        echo "Testing check '$check': ";
        echo containsNumberAndLetter($check) ? "Contains Number and Letter" : "Does Not Contain Number and Letter";
        echo "<br/>";
}

$tests = ["Valid123", "INVALID!", "AnotherValidOne456", "12345", "abcABC"];
echo "<br/>";
foreach ($tests as $test) {
    echo "Testing '$test': ";
    echo checkPasswordValidity($test);
    echo "<br/>";
}

    ?>
</body>
</html>