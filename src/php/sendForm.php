<?php
// Interrompe subito se il metodo non è POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Metodo non consentito';
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/vendor/autoload.php';
require __DIR__ . '/config.php';

// Funzioni helper
function clean($value) {
    return htmlspecialchars(trim($value ?? ''), ENT_QUOTES, 'UTF-8');
}

function safeNum($value) {
    return filter_var($value ?? '', FILTER_SANITIZE_NUMBER_INT);
}

// Campi comuni
$formType    = clean($_POST['formType'] ?? '');
$fullName    = clean($_POST['fullName'] ?? '');
$phoneNumber = safeNum($_POST['phoneNumber'] ?? '');
$location    = clean($_POST['location'] ?? '');
$details     = clean($_POST['details'] ?? '');
$answers     = json_decode($_POST['answers'] ?? '{}', true);

// Configura PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'teloriparo.it@gmail.com';
    $mail->Password   = MAIL_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    $mail->setFrom('teloriparo.it@gmail.com', 'Telofixo.it');
    $mail->addAddress('teloriparo.it@gmail.com', 'Telofixo.it');
    $mail->isHTML(true);

    // Composizione corpo email
    $body  = "<h2>Nuova richiesta dal sito Telofixo.it</h2>";
    $body .= "<h3>Nome e cognome:</h3><p>$fullName</p>";
    $body .= "<h3>Telefono:</h3><p>$phoneNumber</p>";
    $body .= "<h3>Città:</h3><p>$location</p>";

    if (!empty($details)) {
        $body .= "<h3>Dettagli aggiuntivi:</h3><p>$details</p>";
    }

    foreach ($answers as $q => $a) {
        $body .= "<h4>$q</h4><p>$a</p>";
    }

    $mail->Subject = match($formType) {
        'assistanceForm' => 'Richiesta assistenza | Telofixo.it',
        'newPCForm'      => 'Richiesta nuovo PC | Telofixo.it',
        'bugReportForm'  => 'Segnalazione bug | Telofixo.it',
        default          => 'Richiesta generica | Telofixo.it',
    };

    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));

    $mail->send();

    // Risposta al client
    http_response_code(200);
    echo "✅ Dati inviati con successo";

} catch (Exception $e) {
    http_response_code(500);
    echo "❌ Errore: {$mail->ErrorInfo}";
}
