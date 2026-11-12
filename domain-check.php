<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function reply(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'GET') reply(405, ['error' => 'method']);
$domain = strtolower(trim((string) ($_GET['domain'] ?? '')));
if (strlen($domain) > 253 || !preg_match('/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/D', $domain)) reply(400, ['error' => 'invalid']);
$key = getenv('SPACESHIP_API_KEY');
$secret = getenv('SPACESHIP_API_SECRET');
if (!$key || !$secret) reply(503, ['error' => 'configuration']);
// Cache and a global quota keep anonymous searches within the provider limit.
$lock = fopen(sys_get_temp_dir() . '/odisea-domain-quota', 'c+');
if (!$lock || !flock($lock, LOCK_EX)) reply(503, ['error' => 'unavailable']);
$state = json_decode(stream_get_contents($lock), true) ?: [];
$now = time();
$state['requests'] = array_values(array_filter($state['requests'] ?? [], fn($t) => $t > $now - 30));
$state['cache'] = array_filter($state['cache'] ?? [], fn($v) => $v['time'] > $now - 300);
if (isset($state['cache'][$domain])) reply(200, ['domain' => $domain, 'result' => $state['cache'][$domain]['result']]);
if (count($state['requests']) >= 25) reply(429, ['error' => 'rate_limit']);
$state['requests'][] = $now;
$context = stream_context_create(['http' => ['method' => 'GET', 'timeout' => 8, 'ignore_errors' => true, 'follow_location' => 0,
    'header' => "Accept: application/json\r\nX-API-Key: $key\r\nX-API-Secret: $secret\r\n"]]);
$body = @file_get_contents('https://spaceship.dev/api/v1/domains/' . rawurlencode($domain) . '/available', false, $context);
$status = $http_response_header[0] ?? '';
$data = is_string($body) ? json_decode($body, true) : null;
$result = $data['result'] ?? null;
$ok = str_contains($status, ' 200 ') && in_array($result, ['available', 'taken'], true);
if ($ok) $state['cache'][$domain] = ['time' => $now, 'result' => $result];
rewind($lock); ftruncate($lock, 0); fwrite($lock, json_encode($state)); flock($lock, LOCK_UN); fclose($lock);
if (!$ok) reply(str_contains($status, ' 429 ') ? 429 : 502, ['error' => 'provider']);
reply(200, ['domain' => $domain, 'result' => $result]);
