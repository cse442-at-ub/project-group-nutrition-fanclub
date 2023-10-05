<?php
function hash_encode($password) {
    // 
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    return $hashed_password;
}

function hash_decode($password, $hashed_password) {
    // 
    if(password_verify($password, $hashed_password) == 1){
        echo "The password is vaild";
        echo "<br>";
        return password_verify($password, $hashed_password);
    }
    else{
        echo "The password is invaild";
        echo "<br>";
        return password_verify($password, $hashed_password);
    }

}
?>