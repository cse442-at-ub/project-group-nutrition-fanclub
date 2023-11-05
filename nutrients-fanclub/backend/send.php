<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/vendor/autoload.php';


if(isset($_POST["send"])){
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'heibaisedemao@gmail.com'; // Your gmail address
    $mail->Password = 'xolywhbrlzxbdfdl'; // Your gmail app password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('heibaisedemao@gmail.com'); // Your email
    $mail->addAddress($_POST["email"]);
    

$mail->isHTML(true);

$mail->Subject = $_POST["subject"];
$mail->Body = $_POST["message"];

$mail->send();
echo"<script>
alert('Sent Successfully');
document.location.href = 'email.php';
</script>";

}

?>
