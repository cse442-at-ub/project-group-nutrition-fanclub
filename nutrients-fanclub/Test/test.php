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
    ?>
</body>
</html>