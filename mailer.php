<?php
// Resend credentials are read only on the server, never embedded in page assets.
function send_transactional_email(string $to, string $subject, string $text, string $idempotency, ?string $replyTo = null): bool {
    $key = getenv('RESEND_API_KEY');
    $from = getenv('RESEND_FROM');
    if (!$key || !$from || !filter_var($to, FILTER_VALIDATE_EMAIL)) return false;
    $payload = ['from' => $from, 'to' => [$to], 'subject' => $subject, 'text' => $text];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $payload['reply_to'] = $replyTo;
    $context = stream_context_create(['http' => [
        'method' => 'POST', 'timeout' => 15, 'ignore_errors' => true,
        'header' => "Authorization: Bearer $key\r\nContent-Type: application/json\r\nIdempotency-Key: $idempotency\r\n",
        'content' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR)
    ]]);
    $response = @file_get_contents('https://api.resend.com/emails', false, $context);
    $status = $http_response_header[0] ?? '';
    if ($response === false || !preg_match('/\s2\d\d\s/', $status)) return false;
    $result = json_decode($response, true);
    return !empty($result['id']);
}
