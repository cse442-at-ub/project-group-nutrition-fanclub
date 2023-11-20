<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Manually load PHPMailer class files
require __DIR__ . '/vendor/autoload.php';

// Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = 2;                                    // Enable verbose debug output
    $mail->isSMTP();                                          // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                   // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                 // Enable SMTP authentication
    $mail->Username   = 'haobo442@gmail.com';                   // SMTP username
    $mail->Password   = 'hilrlxfzihgptrwp';                             // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;          // Enable implicit TLS encryption
    $mail->Port       = 465;                                  // TCP port to connect to


    $mail->setFrom('haobo442@gmail.com','Sender'); // Your email
    $mail->addAddress('heibaisedemao@gmail.com','user'); // email should in the db
   

    // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');             // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');        // Optional name

    // Content
    $mail->isHTML(true);                                      // Set email format to HTML
    $mail->Subject = 'This is the verification code';
    $mail->Body    = 'This is your verification code <b>xxxxxxx!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
