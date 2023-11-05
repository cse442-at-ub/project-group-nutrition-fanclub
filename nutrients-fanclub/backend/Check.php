<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';
include 'db.php';

$mysqli = connectToDatabase();
$mail = new PHPMailer(true);

$data = json_decode(file_get_contents('php://input'), true);
$email = $data["email"];

$stmt = $mysqli->prepare("SELECT * FROM usersinfo WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($result->num_rows > 0) {
    // Email exists, create verification code
    $verificationCode = rand(100000, 999999); // 6-digit verification code

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'haobo442@gmail.com';
        $mail->Password   = 'hilrlxfzihgptrwp';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        //Recipients
        $mail->setFrom('haobo442@gmail.com','Sender');
        $mail->addAddress($email); // Add a recipient

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Your Verification Code';
        $mail->Body    = 'This is your verification code: <b>' . $verificationCode . '</b>';
        $mail->AltBody = 'This is your verification code: ' . $verificationCode;

        $mail->send();
        echo json_encode(["exist" => true, "verificationCode" => $verificationCode]);
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo json_encode(["exist" => false]);
}

$mysqli->close();
?>
