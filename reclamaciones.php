<?php
require_once __DIR__ . '/mailer.php';
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
ini_set('session.use_strict_mode', '1');
session_set_cookie_params(['httponly' => true, 'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https', 'samesite' => 'Lax', 'path' => '/']);
session_start();
$_SESSION['claims_csrf'] ??= bin2hex(random_bytes(32));
function respond(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
$directory = getenv('CLAIMS_STORAGE_PATH') ?: '/var/lib/odisea/claims';
$recipient = getenv('CLAIMS_TO') ?: 'reclamos@odiseacloud.com';
$provider = getenv('LEGAL_NAME') ?: 'OdiseaCloud';
$ruc = getenv('LEGAL_RUC') ?: '';
$address = getenv('LEGAL_ADDRESS') ?: 'Lima, Perú';
$ready = getenv('CLAIMS_ENABLED') === 'true' && getenv('RESEND_API_KEY') && getenv('RESEND_FROM') && filter_var($recipient, FILTER_VALIDATE_EMAIL) && is_dir($directory) && is_writable($directory);
$providerText = $provider . ($ruc ? " · RUC: $ruc" : '') . " · $address";
if ($_SERVER['REQUEST_METHOD'] === 'GET') respond(200, ['ready' => (bool)$ready, 'csrf' => $_SESSION['claims_csrf'], 'provider' => $providerText]);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, ['success' => false, 'message' => 'Método no permitido.']);
if (!$ready) respond(503, ['success' => false, 'message' => 'El registro no está disponible temporalmente. Utiliza nuestros canales de contacto.']);
if (!is_string($_POST['csrf'] ?? null) || !hash_equals($_SESSION['claims_csrf'], $_POST['csrf'])) respond(403, ['success' => false, 'message' => 'Recarga la página antes de enviar.']);
if (!empty($_POST['website_hp'])) respond(422, ['success' => false, 'message' => 'No se pudo validar el formulario.']);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 50000) respond(413, ['success' => false, 'message' => 'La solicitud supera el tamaño permitido.']);
$limits = ['nombre'=>180,'tipo_documento'=>20,'documento'=>30,'domicilio'=>300,'email'=>254,'telefono'=>40,'representante'=>300,'bien'=>20,'servicio'=>300,'monto'=>30,'referencia'=>100,'tipo'=>20,'detalle'=>6000,'pedido'=>3000];
$data = [];
foreach ($limits as $field => $max) {
    if (!is_string($_POST[$field] ?? '')) respond(422, ['success'=>false, 'message'=>'Revisa los datos del formulario.']);
    $data[$field] = trim(str_replace(["\0", "\r"], '', $_POST[$field] ?? ''));
    if (strlen($data[$field]) > $max * 4) respond(422, ['success'=>false, 'message'=>'Uno de los campos supera el tamaño permitido.']);
}
foreach (['nombre','documento','domicilio','email','telefono','servicio','detalle','pedido'] as $field) {
    if ($data[$field] === '') respond(422, ['success'=>false, 'message'=>'Completa todos los campos obligatorios.']);
}
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL) || strpbrk($data['email'], "\r\n") !== false || strlen($data['detalle']) < 10 || strlen($data['pedido']) < 5 || empty($_POST['declaracion'])) respond(422, ['success'=>false, 'message'=>'Revisa el correo, el detalle y la declaración.']);
if (!in_array($data['tipo'], ['Reclamo','Queja'], true) || !in_array($data['bien'], ['Servicio','Producto'], true) || !in_array($data['tipo_documento'], ['DNI','CE','Pasaporte','Otro'], true)) respond(422, ['success'=>false, 'message'=>'Selecciona una opción válida.']);
if ($data['monto'] !== '' && (!is_numeric($data['monto']) || (float)$data['monto'] < 0 || (float)$data['monto'] > 999999999)) respond(422, ['success'=>false, 'message'=>'Revisa el monto reclamado.']);
if (!empty($_POST['menor']) && $data['representante'] === '') respond(422, ['success'=>false, 'message'=>'Indica el nombre y contacto del representante.']);
$token = $_POST['token'] ?? '';
if (!is_string($token) || !preg_match('/^[a-f0-9-]{36}$/i', $token)) respond(422, ['success'=>false, 'message'=>'Recarga la página e intenta de nuevo.']);
// A stable per-session token prevents duplicates after a lost network response.
$filename = $directory . '/' . hash('sha256', session_id() . $token) . '.json';
$lock = @fopen($directory . '/.registration.lock', 'c');
if (!$lock || !flock($lock, LOCK_EX)) respond(503, ['success'=>false, 'message'=>'No se pudo registrar. Intenta nuevamente.']);
if (is_file($filename)) {
    $record = json_decode(file_get_contents($filename), true);
    flock($lock, LOCK_UN); fclose($lock);
    if (!$record) respond(503, ['success'=>false,'message'=>'No se pudo recuperar la constancia. Contacta al proveedor.']);
    respond(200, ['success'=>true, 'receipt'=>$record['receipt'], 'emailSent'=>$record['emailSent'] ?? false]);
}
if (time() - ($_SESSION['last_claim'] ?? 0) < 30) {
    flock($lock, LOCK_UN); fclose($lock);
    respond(429, ['success'=>false, 'message'=>'Espera unos segundos antes de registrar otra solicitud.']);
}
$now = new DateTimeImmutable('now', new DateTimeZone('America/Lima'));
$id = 'OC-' . $now->format('Ymd') . '-' . strtoupper(bin2hex(random_bytes(5)));
$receipt = "HOJA DE RECLAMACIÓN — $id\nProveedor: $providerText\nContacto de seguimiento: $recipient\nFecha y hora (Perú): " . $now->format('d/m/Y H:i:s') . "\n\n";
$labels = ['nombre'=>'Consumidor','tipo_documento'=>'Tipo de documento','documento'=>'Documento','domicilio'=>'Domicilio','email'=>'Correo de respuesta','telefono'=>'Teléfono','representante'=>'Representante','bien'=>'Producto o servicio','servicio'=>'Descripción','monto'=>'Monto reclamado (S/)','referencia'=>'Referencia','tipo'=>'Tipo de solicitud','detalle'=>'Detalle','pedido'=>'Pedido'];
foreach ($labels as $field => $label) $receipt .= "$label: " . ($data[$field] !== '' ? $data[$field] : 'No indicado') . "\n";
$receipt .= "\nObservaciones y acciones adoptadas por el proveedor: pendiente de atención.\nPlazo máximo de respuesta: 15 días hábiles improrrogables.\nLa presentación no impide acudir a otras vías de solución.\n";
$record = ['id'=>$id,'createdAt'=>$now->format(DATE_ATOM),'status'=>'pending','data'=>$data,'receipt'=>$receipt,'emailSent'=>false,'providerNotified'=>false];
$written = @file_put_contents($filename, json_encode($record, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
if ($written === false) {
    flock($lock, LOCK_UN); fclose($lock);
    respond(503, ['success'=>false, 'message'=>'No se pudo guardar la solicitud. Inténtalo nuevamente.']);
}
@chmod($filename, 0600);
$_SESSION['last_claim'] = time();
flock($lock, LOCK_UN); fclose($lock);
session_write_close();
$record['providerNotified'] = send_transactional_email($recipient, "[$id] Nueva reclamación", $receipt, "$id-provider", $data['email']);
$record['emailSent'] = send_transactional_email($data['email'], "Constancia de reclamación $id", $receipt, "$id-consumer", $recipient);
if (@file_put_contents($filename, json_encode($record, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX) === false) error_log('Could not update claim delivery state: ' . $id);
if (!$record['providerNotified']) error_log('Claim pending provider notification: ' . $id);
respond(200, ['success'=>true, 'receipt'=>$receipt, 'emailSent'=>$record['emailSent']]);
