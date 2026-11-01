<?php
// Integración opcional, ejecutada solo tras la aceptación del correo por Resend.
function notify_contact_automation(array $contact): void {
    $url = getenv('N8N_CONTACT_WEBHOOK_URL');
    if (!$url) return;
    $token = getenv('N8N_CONTACT_WEBHOOK_TOKEN');
    if (!$token || preg_match('/[\r\n]/', $token) || !filter_var($url, FILTER_VALIDATE_URL) || parse_url($url, PHP_URL_SCHEME) !== 'https') {
        error_log('Contact automation: invalid HTTPS URL or missing token.');
        return;
    }
    $context = stream_context_create(['http' => [
        'method' => 'POST', 'timeout' => 4, 'ignore_errors' => true, 'follow_location' => 0,
        'header' => "Content-Type: application/json\r\nX-Odisea-Token: $token\r\n",
        'content' => json_encode($contact, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE)
    ]]);
    $response = @file_get_contents($url, false, $context);
    if ($response === false || !preg_match('/\s2\d\d\s/', $http_response_header[0] ?? '')) {
        // El correo ya fue aceptado: no pedir al cliente que repita el envío.
        error_log('Contact automation: webhook not accepted; email already accepted by Resend.');
    }
}
