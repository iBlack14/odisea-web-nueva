# Revisión SEO — 28 de octubre de 2026

## Web publicada al iniciar la revisión

- Las 25 URLs del sitemap responden 200, tienen un H1 y canonical a su propia URL. No se encontró `noindex` en esas páginas.
- HTTP redirige al dominio principal HTTPS.
- `https://www.odiseacloud.com/` falla la validación de TLS en dos clientes independientes. Configurar ese dominio en Easypanel, verificar su DNS y emitir un certificado válido; después redirigirlo a `https://odiseacloud.com/`. El certificado se valida antes de cualquier redirección de Apache, por lo que este fallo no se arregla solo con `.htaccess`.
- `/index.html` y `/servicios/desarrollo-web/index.html` terminan en rutas `/index/` con error 500. La regla genérica `.html` se ejecutaba antes que la normalización de `index`.
- Las rutas inexistentes devuelven 404, pero presentan el contenido completo de inicio. No se observó un soft 404 de estado 200; se cambió el documento de error por una página 404 dedicada para mejorar la claridad.

## Cambios preparados

- Normalización de `index`, `index.html` y `index/` antes de la regla general `.html`, conservando rutas limpias.
- Página 404 propia con enlaces útiles y `noindex`, excluida del sitemap.
- Ocho imágenes optimizadas como WebP, conservando originales y transparencia: de 12 376 500 a 939 750 bytes en conjunto, aproximadamente 92 % menos. Es una reducción de archivos, no una medición del tiempo de carga ni una puntuación de Core Web Vitals.
- Favicon pequeño y prioridad de descarga para la imagen principal. Dimensiones explícitas en imágenes del portafolio y dimensiones corregidas del robot.
- Open Graph y tarjetas de redes sociales en las 25 páginas, incluido idioma regional `es_PE`.
- Endpoints de formularios con `X-Robots-Tag: noindex`.

## Validación local

Las 25 páginas generadas tienen títulos y descripciones únicos, un H1, canonical correcto, recursos y enlaces locales existentes, JSON-LD válido y metadatos sociales. La compilación finalizó correctamente.

Las redirecciones de Apache requieren una comprobación HTTP posterior al despliegue: el servidor PHP de desarrollo no interpreta `.htaccess`.

## Siguientes verificaciones

1. Desplegar en Easypanel y comprobar las variantes `index.html` e `index/`, que deben terminar en la URL limpia sin error 500.
2. Revisar el certificado del dominio `www` y su redirección.
3. En Search Console: revisar indexación, enviar o verificar `https://odiseacloud.com/sitemap.xml` e inspeccionar inicio y servicios principales.
4. Medir consultas sin marca, impresiones, clics y páginas de destino antes de decidir nuevas páginas o cambios de contenido.
5. Comprobar Core Web Vitals con datos reales cuando estén disponibles; esta revisión no asigna una puntuación de velocidad ni de posicionamiento.

No se accedió a Search Console ni a datos privados de rendimiento. Una respuesta 200 y un sitemap correcto no garantizan indexación ni primeras posiciones.

Referencias: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors y https://developers.google.com/search/docs/appearance/google-images
