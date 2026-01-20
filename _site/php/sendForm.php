<?php
// Interrompe subito se il metodo non è POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Metodo non consentito';
    exit;
}

// Import PHPMailer
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

// Campi comuni inviati dal form
$formType = clean($_POST['formType'] ?? '');
$name     = clean($_POST['name'] ?? '');
$details  = clean($_POST['details'] ?? ''); // corretto da "details"

// Configura PHPMailer
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
    $mail->Encoding   = 'base64';

    // Mittente e destinatario
    $mail->setFrom(MAIL_USERNAME, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_USERNAME, 'Teloriparo.it'); // puoi cambiare destinatario

    $mail->isHTML(true);

    // Composizione corpo email
    $body  = "<h2>Nuova richiesta dal sito Teloriparo.it</h2>";
    
    if (!empty($name)) {
        $body .= "<h3>Nome:</h3><p>$name</p>";
    }

    if (!empty($details)) {
        $body .= "<h3>Dettagli:</h3><p>$details</p>";
    }

    // Oggetto in base al tipo di form
    $mail->Subject = match($formType) {
        'assistance'    => 'Richiesta assistenza | Teloriparo.it',
        'purchaseGuide' => 'Richiesta nuovo PC | Teloriparo.it',
        'discord'       => 'Richiesta server discord | Teloriparo.it',
        'application'   => 'Richiesta applicazione | Teloriparo.it',
        'bugReport'     => 'Segnalazione bug | Teloriparo.it',
        default         => 'Richiesta generica | Teloriparo.it',
    };

    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $body));

    // Invio
    $mail->send();

    http_response_code(200);
    echo "✅ Dati inviati con successo";

} catch (Exception $e) {
    http_response_code(500);
    echo "❌ Errore: {$mail->ErrorInfo}";
}
