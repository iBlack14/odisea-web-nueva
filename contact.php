<?php
/**
 * ODISEACLOUD - Procesador Seguro de Formulario de Contacto
 * Con protección multicapa contra bots, scripts automatizados y spam
 */

require_once __DIR__ . '/mailer.php';
header('Content-Type: application/json; charset=UTF-8');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Cache-Control: no-store, no-cache, must-revalidate');
date_default_timezone_set('America/Lima');

// Clave secreta interna para firma HMAC de tokens anti-bot
$secret_key = getenv('SECURITY_SECRET_KEY') ?: 'odisea_antispam_token_salt_2026_pe';

// --------------------------------------------------------------------------
// ENDPOINT DE SEGURIDAD (GET): Genera token de sesión para el formulario
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($_GET['action'] ?? '') === 'token') {
    $now = time();
    $token = hash_hmac('sha256', (string)$now, $secret_key);
    echo json_encode([
        'success' => true,
        'timestamp' => $now,
        'token' => $token
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

$destinatario = getenv('CONTACT_TO') ?: 'contacto@odiseacloud.com';
$asunto_prefijo = '[Consulta Web OdiseaCloud]';

// Función para obtener IP del cliente de forma segura
function get_client_ip(): string {
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] 
        ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
        ?? $_SERVER['REMOTE_ADDR'] 
        ?? '0.0.0.0';
    if (strpos($ip, ',') !== false) {
        $parts = explode(',', $ip);
        $ip = trim($parts[0]);
    }
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}
$client_ip = get_client_ip();

// --------------------------------------------------------------------------
// CAPA 1: Rate Limiting por IP (Máx 4 envíos cada 10 minutos por IP)
// --------------------------------------------------------------------------
$rate_limit_dir = sys_get_temp_dir() . '/odisea_contact_limits';
if (!is_dir($rate_limit_dir)) {
    @mkdir($rate_limit_dir, 0755, true);
}
$rate_file = $rate_limit_dir . '/ip_' . md5($client_ip) . '.json';
$now = time();
$attempts = [];
if (file_exists($rate_file)) {
    $raw = @file_get_contents($rate_file);
    $data = json_decode($raw, true);
    if (is_array($data)) {
        $attempts = array_filter($data, fn($t) => ($now - $t) < 600);
    }
}
if (count($attempts) >= 4) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Has enviado varias consultas recientemente. Por favor espera unos minutos o comunícate vía WhatsApp.'
    ]);
    exit;
}

// --------------------------------------------------------------------------
// CAPA 2: Trampas Honeypot Múltiples (Campos cebo para bots)
// --------------------------------------------------------------------------
// Trampa 1: website_hp (clásico para bots viejos)
// Trampa 2: business_fax (para bots que ignoran display:none pero leen el DOM)
if (!empty($_POST['website_hp']) || !empty($_POST['business_fax'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam detectado.']);
    exit;
}

// --------------------------------------------------------------------------
// CAPA 3: Verificación de Tiempo Humano (Time-Lock HMAC Token)
// --------------------------------------------------------------------------
$form_token = $_POST['form_security_token'] ?? '';
$form_time = (int)($_POST['form_timestamp'] ?? 0);

if (!empty($form_token) && $form_time > 0) {
    $expected_hash = hash_hmac('sha256', (string)$form_time, $secret_key);
    if (!hash_equals($expected_hash, $form_token)) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Validación de seguridad inválida. Recarga la página.']);
        exit;
    }
    $elapsed = $now - $form_time;
    // Un humano real tarda al menos 3 segundos en llenar el formulario
    if ($elapsed < 3) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Formulario completado demasiado rápido. Por favor tómate un momento para revisar tu mensaje.']);
        exit;
    }
    // Máximo 3 horas de vigencia del token
    if ($elapsed > 10800) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'La sesión del formulario expiró. Por favor recarga la página.']);
        exit;
    }
} else {
    // Si no enviaron token -> Script o bot enviando POST directo
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Token de seguridad requerido para enviar el mensaje.']);
    exit;
}

// --------------------------------------------------------------------------
// CAPA 4: Limpieza y formato de datos
// --------------------------------------------------------------------------
function contact_field(string $name): string {
    $value = $_POST[$name] ?? '';
    return is_string($value) ? trim($value) : '';
}
$nombre = contact_field('nombre');
$email = contact_field('email');
$telefono = contact_field('telefono');
$servicio = contact_field('servicio');
$mensaje = contact_field('mensaje');

if (strlen($nombre) > 200 || strlen($email) > 254 || strlen($telefono) > 60 || strlen($servicio) > 200 || strlen($mensaje) > 20000
    || preg_match('/[\r\n]/', $nombre . $email . $telefono . $servicio)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Revisa la longitud y el formato de los campos.']);
    exit;
}

if (empty($nombre) || mb_strlen($nombre) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por favor, ingresa tu nombre completo.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por favor, ingresa un correo electrónico válido.']);
    exit;
}

if (empty($mensaje) || mb_strlen($mensaje) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El mensaje debe contener al menos 10 caracteres.']);
    exit;
}

// --------------------------------------------------------------------------
// CAPA 5: Filtro Heurístico Anti-Spam (Contenido de Bots)
// --------------------------------------------------------------------------
// 1. Detección de caracteres cirílicos / rusos (spam internacional automatizado)
if (preg_match('/\p{Cyrillic}/u', $nombre . ' ' . $mensaje)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'El mensaje contiene caracteres no admitidos.']);
    exit;
}

// 2. Detección de múltiples enlaces o etiquetas BBCode (típico de spambots de backlinks)
$url_count = preg_match_all('/https?:\/\//i', $mensaje);
if ($url_count > 1 || preg_match('/\[url=|\[link=|<a\s+href=/i', $mensaje)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Por motivos de seguridad, no se admiten múltiples enlaces en la primera consulta.']);
    exit;
}

// 3. Patrones de spam conocidos (prospección comercial masiva de bots)
$spam_patterns = [
    '/talkwithwebvisitor/i',
    '/eric\s*jones/i',
    '/financial\s*freedom/i',
    '/casino|viagra|cialis|crypto\s*investment|forex\s*trading/i',
    '/ranking\s*first\s*page|seo\s*backlink/i',
    '/guest\s*post|pbn\s*links/i'
];
foreach ($spam_patterns as $pattern) {
    if (preg_match($pattern, $mensaje) || preg_match($pattern, $nombre) || preg_match($pattern, $email)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Tu mensaje contiene patrones catalogados como spam publicitario.']);
        exit;
    }
}

// Registrar intento exitoso en rate limit
$attempts[] = $now;
@file_put_contents($rate_file, json_encode(array_values($attempts)), LOCK_EX);

// --------------------------------------------------------------------------
// PREPARACIÓN Y ENVÍO DEL CORREO
// --------------------------------------------------------------------------
$asunto = "$asunto_prefijo Nueva consulta de $nombre (" . (!empty($servicio) ? $servicio : 'General') . ")";

$cuerpo_correo = "=================================================\n";
$cuerpo_correo .= "NUEVA CONSULTA DESDE EL SITIO WEB ODISEACLOUD\n";
$cuerpo_correo .= "=================================================\n\n";
$cuerpo_correo .= "Nombre:    $nombre\n";
$cuerpo_correo .= "Correo:    $email\n";
$cuerpo_correo .= "Teléfono:  " . (!empty($telefono) ? $telefono : 'No especificado') . "\n";
$cuerpo_correo .= "Servicio:  " . (!empty($servicio) ? $servicio : 'Consulta general') . "\n";
$cuerpo_correo .= "Fecha:     " . date('Y-m-d H:i:s') . "\n";
$cuerpo_correo .= "IP:        $client_ip\n\n";
$cuerpo_correo .= "---------------- MENSAJE ----------------\n";
$cuerpo_correo .= "$mensaje\n";
$cuerpo_correo .= "-----------------------------------------\n";

// Resend es el único transporte de correo del formulario.
$enviado = send_transactional_email($destinatario, $asunto, $cuerpo_correo, 'contact-' . bin2hex(random_bytes(12)), $email);

if ($enviado) {
    require_once __DIR__ . '/contact-automation.php';
    notify_contact_automation(['nombre' => $nombre, 'email' => $email, 'telefono' => $telefono, 'servicio' => $servicio, 'mensaje' => $mensaje, 'origen' => 'odiseacloud.com/contacto', 'recibido_en' => date(DATE_ATOM)]);
    echo json_encode([
        'success' => true,
        'message' => '¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo a la brevedad.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el correo a través del servidor. Por favor, comunícate directamente por WhatsApp o escribe a ' . $destinatario
    ]);
}
