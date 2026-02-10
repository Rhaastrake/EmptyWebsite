<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

// Configurazione SMTP
define('MAIL_USERNAME', '? ? ?'); // Your email
define('MAIL_PASSWORD', '? ? ?'); // Email App Password
define('MAIL_HOST', 'smtp.gmail.com'); // SMTP host
define('MAIL_PORT', 587);                                  // SMTP port
define('MAIL_FROM_NAME', '? ? ?');                // Sender name
?>
