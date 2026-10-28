# Resend y Libro de Reclamaciones en Easypanel

La web y las políticas pueden desplegarse. El registro del libro permanece deshabilitado por defecto hasta configurar el envío y el almacenamiento. Los datos legales pendientes no han sido inventados: se muestra únicamente el nombre comercial y Lima, Perú. Esto no certifica que la identificación actual satisfaga las obligaciones del proveedor; completar nombre legal y domicilio antes de presentar el libro como plenamente habilitado.

## 1. Correo con Resend

Resend envía por API. Para recibir notificaciones en `contacto@odiseacloud.com` y `reclamos@odiseacloud.com`, esas direcciones necesitan buzones o redirecciones a un correo que revises, por ejemplo Gmail. Configurar solo el remitente de Resend no crea esos destinos. Debes verificar un dominio de envío en Resend y configurar sus registros DNS. El remitente de prueba de Resend no sirve para enviar constancias a cualquier cliente.

En **Environment** del servicio de Easypanel configura:

```dotenv
RESEND_API_KEY=clave_privada_de_resend
RESEND_FROM=OdiseaCloud <notificaciones@odiseacloud.com>
CLAIMS_TO=reclamos@odiseacloud.com
CONTACT_TO=contacto@odiseacloud.com
CLAIMS_ENABLED=false
LEGAL_NAME=nombre_legal_del_proveedor
LEGAL_ADDRESS=domicilio_completo_del_proveedor
# LEGAL_RUC: completar únicamente cuando exista; no utilizar un RUC inventado.
```

No copies la clave a Git, archivos públicos o al chat. `RESEND_FROM` debe pertenecer al dominio verificado. Resend no crea automáticamente un buzón para recibir respuestas. El correo público de contacto actual es `contacto@odiseacloud.com`: actualizarlo en `data/servicios.json` y `assets/js/config.js` si no existe.

## 2. Conservar los reclamos

En **Mounts / Storage** crea un volumen persistente montado en `/var/lib/odisea`. El directorio `/var/lib/odisea/claims` debe pertenecer al usuario `www-data` y ser escribible solo por ese usuario. Si el volumen se crea vacío, crear ese subdirectorio con propietario `www-data` y permisos `700`. Con Docker Compose ya se declara el volumen `reclamaciones`.

Los archivos JSON contienen información personal y se guardan fuera de la raíz pública. El proveedor debe tener acceso restringido al volumen, realizar copias de seguridad y revisar los registros pendientes incluso si falla una notificación. No borrar el volumen al redesplegar. Conservar las hojas por al menos dos años.

## 3. Habilitar y comprobar

1. Completar los datos del proveedor, el volumen y Resend.
2. Establecer `CLAIMS_ENABLED=true` y redesplegar.
3. Registrar una solicitud de prueba identificada como prueba, comprobar su archivo en el volumen, las dos entregas en Resend, la constancia descargable y la impresión.
4. Redesplegar y confirmar que el registro de prueba sigue almacenado.
5. Revisar el funcionamiento en móvil y el correo público de contacto.

La constancia muestra el registro aunque falle un correo e informa de ese fallo. Un reintento con el mismo identificador en la misma sesión devuelve la misma hoja. La aceptación de Resend no prueba la entrega final al buzón: revisar su panel para rebotes y entregas. Los registros fallidos de notificación deben atenderse desde el volumen. No hay panel administrativo público ni un sistema automático de respuesta al consumidor.

## Referencias

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://consumidor.gob.pe/libro-de-reclamaciones/
- https://guias.servicios.gob.pe/facilita/politica-privacidad/index
