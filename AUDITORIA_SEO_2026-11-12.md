# Auditoría SEO — 12 de noviembre de 2026

## Objetivo y páginas prioritarias

| Página | Intención principal |
| --- | --- |
| `/` | Presentación de OdiseaCloud y diseño de páginas web en Perú |
| `/servicios/desarrollo-web/` | Contratar diseño y desarrollo de páginas web para empresas en Lima y Perú |
| `/servicios/sistemas-web/` | Desarrollo de sistemas web y software a medida para empresas |
| `/servicios/dominios/` | Buscar disponibilidad, registrar, renovar y trasladar dominios |
| `/servicios/integraciones-automatizaciones/` | Automatización de procesos e integración de CRM |

Esta distribución organiza la intención por página. No se han obtenido volúmenes de búsqueda ni datos privados de consultas; las prioridades reflejan los servicios solicitados por el propietario.

## Verificación técnica local

Las 25 páginas del sitemap pasan `npm run audit:seo`: títulos y descripciones únicos; un H1 por página; canonical a la propia URL; idioma español; ausencia de noindex en las páginas del sitemap; JSON-LD válido cuando está presente; dimensiones y alt en imágenes; recursos y enlaces internos existentes; anclas internas válidas.

La validación JSON comprueba sintaxis, no elegibilidad para resultados enriquecidos. Los datos Service, BreadcrumbList y FAQPage de los servicios se conservan; no se han añadido reseñas, precios ni calificaciones inventadas. FAQPage no garantiza un resultado enriquecido.

## Cambios preparados

- Tres slides en inicio con texto y enlaces generados en HTML. Un solo H1 principal. Los enlaces del carrusel se complementan con las tarjetas de servicios visibles. La franja independiente de enlaces se retiró por diseño; el acceso a la guía de traslado permanece en el slide de Dominios.
- Página de Dominios orientada a registro, renovación y traslado: título, descripción y contenido específicos. Seis respuestas útiles sobre buscador, titularidad, requisitos, DNS, hosting, extensiones y cotización. El JSON-LD de preguntas se genera desde las mismas respuestas visibles.
- Guía de traslado con ancla `#traslado-dominio`; requisitos sujetos a extensión y proveedor. Se corrigió la afirmación de que el traslado se solicita directamente ante ICANN y se evitó prometer continuidad automática sin revisar DNS.
- Metadatos Open Graph sincronizados con título y descripción de cada página; antes el inicio conservaba valores antiguos.
- Fondos de infraestructura convertidos a WebP: 810 241 a 88 206 bytes y 810 534 a 117 870 bytes. Reducción conjunta aproximada del 87 %. Esto es ahorro de archivos, no una puntuación de Core Web Vitals.
- Auditoría repetible en `scripts/audit-seo.cjs`, disponible como `npm run audit:seo`.

## Web publicada: comprobación independiente

- Las 25 URLs del sitemap público responden 200, tienen un H1 y canonical coincidente y no muestran noindex en meta o cabecera HTTP.
- `/robots.txt` y `/sitemap.xml` responden 200.
- HTTP, HTTPS con www e `/index.html` terminan en el inicio HTTPS sin www. En esta comprobación www no presentó el fallo TLS documentado en octubre.
- Una ruta inventada devuelve 404 y una página de error dedicada.
- **Pendiente de despliegue:** `/?feed=comments-rss2` aún devuelve 200 con el inicio en producción. La regla 404 ya existe en `.htaccess` local, pero se debe publicar y comprobar su respuesta HTTP real.
- La configuración Apache no se verifica mediante el servidor Node local. Verificar redirecciones y cabeceras después del despliegue.

Resultados de las 25 consultas públicas guardados localmente en `output/seo-2026-11-12/live.json` (carpeta ignorada por Git).

## Trabajo pendiente fuera del código

1. Desplegar estos cambios y volver a verificar las URLs prioritarias y el feed antiguo.
2. En Search Console, comprobar propiedad y sitemap; inspeccionar inicio, desarrollo web, sistemas y dominios. Revisar exclusiones y el HTML renderizado. No se accedió a esa cuenta en esta revisión.
3. Establecer una línea base de clics, impresiones, consultas sin marca y conversiones. Comparar periodos de 28 días y evitar cambios de palabras clave sin datos.
4. Medir Core Web Vitals con datos reales de Search Console/CrUX y pruebas móviles después del despliegue. No se ejecutó Lighthouse ni se afirma que las métricas estén aprobadas.
5. Publicar casos de proyectos reales con problema, alcance y solución verificables. Obtener enlaces y menciones legítimas del negocio; no crear páginas duplicadas por distrito ni comprar enlaces.
6. Google Analytics figura sin ID en la configuración. Search Console permite medir búsquedas sin Analytics; para medir formularios y solicitudes de WhatsApp habrá que configurar una herramienta de analítica y revisar su tratamiento de datos.

Una revisión técnica correcta facilita rastreo y comprensión; no prueba que las páginas estén indexadas ni garantiza posiciones. La indexación y el rendimiento deben comprobarse en Search Console.

## Referencias

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- HTML y JavaScript: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Enlaces rastreables: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Requisitos de traslado: https://www.icann.org/resources/pages/about-transfer-policy-2017-10-10-en
