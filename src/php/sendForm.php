<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/vendor/autoload.php';
require __DIR__ . '/config.php';

function clean($value) {
    return htmlspecialchars(trim($value ?? ''), ENT_QUOTES, 'UTF-8');
}

function safeNum($value) {
    return filter_var($value ?? '', FILTER_SANITIZE_NUMBER_INT);
}


//
//Informations
//

// $name                   = clean($_POST['name'] ?? '');
// $phoneNumber            = safeNum($_POST['phoneNumber'] ?? '');


$mail = new PHPMailer(true);



try {
    $mail->isSMTP();
    $mail->Host       = MAIL_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = MAIL_USERNAME;
    $mail->Password   = MAIL_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = MAIL_PORT;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';+

    $mail->setFrom(MAIL_USERNAME, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_USERNAME, 'MAIL USERNAME');

    $mail->isHTML(true);



    $body  = "FILL YOUR MAIL BODY HTML";

    //
    //Informations
    //
    // if (!empty($name)) {
    //     $body .= "Concatenation";
    // }

    $mail->Subject = "MAIL SUBJECT";


    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));

    $mail->send();

    http_response_code(200);
    echo "✅ Mail sent";

} catch (Exception $e) {
    http_response_code(500);
    echo "❌ Error: {$mail->ErrorInfo}";
}
