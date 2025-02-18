function validateUsername($username) {
    // Username should be between 3 and 20 characters
    $min_length = 3;
    $max_length = 20;
    
    if (strlen($username) < $min_length || strlen($username) > $max_length) {
        return false;
    }
    
    // Additional validation rules can be added here
    // For example, you might want to check for alphanumeric characters only
    
    return true;
}

function validatePassword($password) {
    // Password should be at least 8 characters long
    $min_length = 8;
    
    if (strlen($password) < $min_length) {
        return false;
    }
    
    // Additional validation rules can be added here
    // For example, you might want to check for uppercase, lowercase, and numbers
    
    return true;
}

function hashPassword($password) {
    // Use a strong hashing algorithm like bcrypt
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    return $hashed_password;
}

function verifyPassword($password, $hashed_password) {
    // Verify a password against its hashed version
    return password_verify($password, $hashed_password);
}
