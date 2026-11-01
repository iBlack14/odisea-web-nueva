# Contacto, Resend y n8n

## Correo en producción

En el servicio de la WEB en Easypanel, configurar:

- `RESEND_API_KEY`: clave privada de Resend con permiso para enviar.
- `RESEND_FROM`: remitente de un dominio verificado, por ejemplo `OdiseaCloud <notificaciones@odiseacloud.com>`.
- `CONTACT_TO`: destinatario de las consultas, por defecto `contacto@odiseacloud.com`.

No poner estas credenciales en JavaScript ni en el repositorio. Volver a desplegar la web tras actualizar código o variables. Revisar en Resend que el dominio esté verificado y que sus registros DNS estén configurados según su panel. Una respuesta aceptada por la API no garantiza entrega al buzón: comprobar el estado en Resend.

## Conexión opcional a n8n

El JSON de demostración con Form Trigger no recibe estos envíos. Crear un flujo con Webhook POST y autenticación Header Auth: nombre `X-Odisea-Token`, valor secreto aleatorio compartido con la web. Usar respuesta inmediata del webhook y publicar el flujo.

En el servicio de la WEB, configurar:

- `N8N_CONTACT_WEBHOOK_URL`: Production URL HTTPS del nodo Webhook publicado (no Test URL).
- `N8N_CONTACT_WEBHOOK_TOKEN`: mismo secreto configurado en Header Auth.

El cuerpo JSON llega en `$json.body` con `nombre`, `email`, `telefono`, `servicio`, `mensaje`, `origen` y `recibido_en`. El webhook se llama después de que Resend acepte el correo. No volver a enviar el mismo aviso por correo en n8n salvo que se quiera un segundo correo.

Si la URL queda vacía, no se llama a n8n. Si n8n falla, se registra un error en PHP, pero el formulario sigue confirmando el correo aceptado. No hay cola ni reintentos automáticos: para avisos críticos conviene añadir almacenamiento persistente y reintentos antes de vender garantías de entrega. La aceptación del webhook tampoco confirma que los nodos posteriores hayan terminado: revisar Executions en n8n.

## WhatsApp

Los enlaces actuales abren un chat para que la persona envíe el mensaje. No notifican automáticamente un envío del formulario. La alerta automática está pendiente de conectar WhatsApp Business Platform/API y configurar el destinatario y las plantillas que correspondan. Mantener Resend para las alertas por correo mientras tanto.

## Validación realizada

Sintaxis PHP y JavaScript, un solo manejador de envío y rechazo de método incorrecto, honeypot, campos inválidos y configuración de correo ausente. No se enviaron correos reales ni se modificó el VPS. Tras desplegar, enviar una consulta de prueba y comprobar una sola solicitud POST, el estado de entrega en Resend y la ejecución en n8n cuando esté configurado.
