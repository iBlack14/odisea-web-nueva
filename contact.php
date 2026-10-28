<?php
/**
 * ODISEACLOUD - Procesador Seguro de Formulario de Contacto
 * Envía las consultas directamente al correo corporativo sin base de datos
 */

require_once __DIR__ . '/mailer.php';
header('Content-Type: application/json; charset=UTF-8');

// Configuración de destino
$destinatario = getenv('CONTACT_TO') ?: 'contacto@odiseacloud.com';
$asunto_prefijo = '[Consulta Web OdiseaCloud]';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// 1. Anti-spam Honeypot (campo oculto que los robots llenan)
if (!empty($_POST['website_hp'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Spam detectado.']);
    exit;
}

// 2. Sanitización y captura de datos
$nombre = trim(filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$telefono = trim(filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$servicio = trim(filter_input(INPUT_POST, 'servicio', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$mensaje = trim(filter_input(INPUT_POST, 'mensaje', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

// 3. Validaciones obligatorias
if (empty($nombre) || strlen($nombre) < 2) {
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

// 4. Preparación del correo
$asunto = "$asunto_prefijo Nueva consulta de $nombre (" . (!empty($servicio) ? $servicio : 'General') . ")";

$cuerpo_correo = "=================================================\n";
$cuerpo_correo .= "NUEVA CONSULTA DESDE EL SITIO WEB ODISEACLOUD\n";
$cuerpo_correo .= "=================================================\n\n";
$cuerpo_correo .= "Nombre:    $nombre\n";
$cuerpo_correo .= "Correo:    $email\n";
$cuerpo_correo .= "Teléfono:  " . (!empty($telefono) ? $telefono : 'No especificado') . "\n";
$cuerpo_correo .= "Servicio:  " . (!empty($servicio) ? $servicio : 'Consulta general') . "\n";
$cuerpo_correo .= "Fecha:     " . date('Y-m-d H:i:s') . "\n";
$cuerpo_correo .= "IP:        " . $_SERVER['REMOTE_ADDR'] . "\n\n";
$cuerpo_correo .= "---------------- MENSAJE ----------------\n";
$cuerpo_correo .= "$mensaje\n";
$cuerpo_correo .= "-----------------------------------------\n";

$headers = [
    'From' => 'no-reply@odiseacloud.com',
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$headers_str = '';
foreach ($headers as $k => $v) {
    $headers_str .= "$k: $v\r\n";
}

// 5. Envío mediante mail()
$enviado = getenv('RESEND_API_KEY')
    ? send_transactional_email($destinatario, $asunto, $cuerpo_correo, 'contact-' . bin2hex(random_bytes(12)), $email)
    : @mail($destinatario, $asunto, $cuerpo_correo, $headers_str);

if ($enviado) {
    echo json_encode([
        'success' => true,
        'message' => '¡Tu mensaje ha sido enviado exitosamente! Nos pondremos en contacto contigo a la brevedad.'
    ]);
} else {
    // Si la función mail no está habilitada en el servidor local, se informa con transparencia
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el correo a través del servidor. Por favor, comunícate directamente por WhatsApp o escribe a ' . $destinatario
    ]);
}
