# Implementación SEO conservadora

Fecha: 30 de octubre de 2026. Autorización: “ok hazlo si mejora el seo”.
Rama: fix/seo-https-redirects. Base: b75f288.

## Cambio aplicado localmente

Único archivo del sitio modificado: .htaccess.
Se establece SEO_REDIRECT_ORIGIN=https://odiseacloud.com solo cuando HTTP_HOST corresponde a odiseacloud.com o www.odiseacloud.com, con puerto opcional. Las cuatro redirecciones existentes (index.html, index/, extensiones .html y barra final de directorios) usan ese origen. Los otros hosts mantienen destinos relativos porque la variable está vacía. Se conserva el orden, condiciones, códigos 301, query strings y reglas internas existentes. No se añade una regla global de HTTPS que pueda provocar bucles detrás del proxy.

Motivo: las cuatro variantes index comprobadas públicamente redirigen primero a HTTP y después a HTTPS. Un destino absoluto HTTPS evita que Apache construya Location según la conexión HTTP interna del proxy. Mejora esperada: eliminar ese salto innecesario al desplegar, sin prometer mejoras de posición.

Diseño, textos, HTML, imágenes, formularios, rutas, DNS, certificados, caché y producción no fueron modificados.

## Verificación realizada

- git diff --check: correcto.
- 24 casos de sustitución estática: index.html, index/, las variantes anidadas, .html genérico y barra final, en dominio principal, www, localhost y preview.
- Revisión manual de condiciones y orden de reglas.
- No hay Docker, PHP ni Apache disponibles como comandos en este equipo: no se ejecutó una prueba real con Apache. La simulación estática no reproduce fases internas ni mod_dir.
- No se ejecutó build porque no hay cambios en generadores ni HTML.

## DNS comprobado sin modificar

Google DNS y Cloudflare DNS-over-HTTPS devolvieron Status 3 (NXDOMAIN) para www.odiseacloud.com y Status 0 con registro A para odiseacloud.com. Por tanto, hoy no se puede comprobar TLS de www. Pendiente: configurar el registro de www según el proveedor real, asociarlo al servicio del alojamiento, emitir certificado y verificar redirección al dominio principal. No asumir un registro de destino sin inspeccionar el panel.

## Validación antes de producción

En Apache de staging, probar con Host odiseacloud.com y www.odiseacloud.com:
- /index.html y /index/ → un 301 a https://odiseacloud.com/.
- /servicios/desarrollo-web/index.html e index/ → un 301 al directorio limpio HTTPS.
- /servicios.html y /servicios → /servicios/ en HTTPS.
- Añadir ?utm_source=qa y verificar que se conserva.
- URLs limpias y archivos existentes siguen 200; ruta inexistente sigue 404; sin bucles detrás del proxy.
- localhost o host de staging ajeno al dominio público conservan redirecciones relativas. Para probar el comportamiento de producción sin publicar, usar una instancia aislada con Host del dominio.

No se desplegó. La prueba HTTP pública posterior al despliegue sigue pendiente y debe verificar el primer Location sin seguir redirecciones, además de su destino final.

## Diff y reversión

El diff exacto se adjunta como SEO_REDIRECCIONES.patch. Para revertir solo este cambio, aplicar ese parche en reversa después de comprobar que el archivo no contiene modificaciones posteriores incompatibles. No restaurar el archivo completo ni borrar cambios ajenos. No se creó commit ni se hizo push.

Referencia técnica: https://httpd.apache.org/docs/2.4/rewrite/flags.html (flags E y R, variables en contexto por directorio).
