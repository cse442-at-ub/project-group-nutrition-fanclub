<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    function hash_encode($password) {
        // 
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        return $hashed_password;
    }
    
    function hash_decode($password, $hashed_password) {
        // 
        if(password_verify($password, $hashed_password) == 1){
            echo "your are right";
            echo password_verify($password, $hashed_password);
        }
        else{
            echo "x";
            password_verify($password, $hashed_password);
        } 
    }
    echo "test123";
    echo "<br>";
    echo password_hash("test123", PASSWORD_DEFAULT);
    $input = "test123";
    $ad = password_hash("test123",PASSWORD_DEFAULT);
    echo "<br>";
    echo $ad;
    echo "<br>";
    echo $ad;
    echo "<br>";
    echo password_verify($input, $ad);
    $rs = hash_encode($input);
    echo "<br>";
    echo $rs;
    echo "<br>";
    echo $rs;
    echo "<br>";
    $d_rs = hash_decode($input,$rs);
    echo $d_rs;

    ?>
</body>
</html>