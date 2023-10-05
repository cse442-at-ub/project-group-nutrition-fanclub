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
function isPasswordValidLength($password) {
    // 8 - 20 length
    return strlen($password) >= 8 && strlen($password) <= 20;
}

function isValidInput($input) {
    // 
    $invalidCharacters = [' ', '!', '@', '#', '$', '%', '^', '&', '*'];
    foreach ($invalidCharacters as $char) {
        if (strpos($input, $char) !== false) {
            return false;
        }
    }
    return true;
}

function containsNumberAndLetter($input) {
    return preg_match('/[A-Za-z]/', $input) && preg_match('/[0-9]/', $input);
}

function checkPasswordValidity($input) {
    // 
    return preg_match('/^[A-Za-z0-9]+$/', $input) ? "Valid" : "Password incorrect";
}


?>