# Auditoría SEO conservadora — OdiseaCloud

Fecha: 30 de octubre de 2026 (America/Lima). Fase A. Sitio: https://odiseacloud.com/.

## Alcance y método

Inspección de repositorio y peticiones GET públicas con validación TLS, sin enviar formularios, compilar, instalar dependencias, editar el sitio ni desplegar. Las solicitudes siguieron redirecciones; sus pasos se comprobaron además con un manejador que registra código y Location. La consulta web confirmó contenido textual accesible en home. No se usaron datos privados.

Base Git observada: b75f288; árbol de trabajo limpio al comenzar. El documento REVISION_SEO.md es histórico y no se sobrescribió. El análisis actual prevalece para los casos nuevamente comprobados. Solo se crearon estos entregables bajo output/, directorio ya excluido por .dockerignore. No subirlos manualmente al directorio público.

## Stack y arquitectura comprobados

HTML estático generado por build.js y seo-output.js, contenido en data/servicios.json, CSS propio y JavaScript vainilla. package.json usa Node para generar y previsualizar; PHP procesa contacto y reclamaciones. Dockerfile declara php:8.2-apache, mod_rewrite, headers, expires y deflate; .htaccess gestiona rutas. GUIA_EASYPANEL.md describe Easypanel, pero no se accedió al panel ni se verificó su configuración efectiva.

Hay 25 páginas index.html y una 404.html local; no aparecieron otras páginas HTML fuera de dependencias. Quince plantillas de servicio comparten estructura; build.js genera además home, páginas institucionales, catálogo, soluciones, contacto y páginas legales. No hay evidencia en este inventario de páginas HTML heredadas de otro proyecto. Esto no descarta archivos históricos alojados solo en producción.

## Resultado técnico actual

- 25/25 URLs del sitemap responden 200; title, H1 y canonical coinciden entre archivos locales y respuesta HTML en vivo.
- Localmente: un title, una description, un H1 y canonical propio por URL; títulos y descripciones sin duplicados exactos. Sin meta noindex en estas páginas ni X-Robots-Tag en las respuestas inventariadas.
- robots.txt público permite rastreo y declara sitemap. Las 25 URLs del sitemap público coinciden con las locales.
- Ninguna URL del inventario quedó sin enlace entrante desde otra página del inventario. No se encontraron enlaces/recursos locales ausentes al resolver href y src contra el disco. No se validaron destinos externos, anchors, CSS url(), srcset ni todos los recursos por HTTP.
- Todas las imágenes img tienen atributo alt. Esto verifica presencia, no calidad contextual ni que toda imagen deba tener alt no vacío.
- Todas las páginas inventariadas declaran lang=es, viewport, Open Graph y Twitter Card. Sin segunda versión lingüística identificada: no se propone hreflang artificial.
- JSON-LD local parsea sin errores JSON. Home: Organization. Quince servicios: Service y BreadcrumbList, con proveedor Organization vinculado al @id de home. No se confunden referencias al proveedor con organizaciones competidoras. Las otras nueve páginas no tienen JSON-LD: su ausencia no es por sí sola un error.
- El contenido y los enlaces críticos se encuentran en HTML estático, sin depender de ejecutar JavaScript para leer la oferta. No equivale a una inspección de URL de Google.
- /seo-auditoria-inexistente-20261030/ devuelve 404. 404.html local tiene noindex y está fuera del sitemap.
- contact.php y reclamaciones.php declaran X-Robots-Tag: noindex en código; no se enviaron datos ni se confirmó esa cabecera ejecutando formularios.

## Inventario de URLs y SEO actual

La columna HTTP es el resultado de GET público; los demás valores se extrajeron de HTML local. Title, H1 y canonical se contrastaron con producción.

| URL / archivo | HTTP | Title | Meta description | H1 | Canonical | JSON-LD |
| --- | --- | --- | --- | --- | --- | --- |
| https://odiseacloud.com/ — index.html | 200 | Diseño de páginas web en Perú \| OdiseaCloud | Creación y diseño de páginas web en Perú. Desarrollamos tiendas virtuales, sistemas a medida y aulas virtuales. Consulta tu proyecto con OdiseaCloud. | Creamos páginas web y soluciones digitales. | https://odiseacloud.com/ | ContactPoint, Country, Organization |
| https://odiseacloud.com/nosotros/ — nosotros/index.html | 200 | Sobre Nosotros \| ODISEACLOUD | Conoce la filosofía, enfoque, valores y compromiso de ODISEACLOUD. Tecnología, creatividad y soluciones digitales que generan valor empresarial. | Tecnología, creatividad y soluciones que generan valor | https://odiseacloud.com/nosotros/ | Sin marcado |
| https://odiseacloud.com/servicios/ — servicios/index.html | 200 | Servicios web y soluciones tecnológicas en Perú \| OdiseaCloud | Soluciones digitales para cada etapa de tu negocio: desarrollo web, tiendas virtuales, aulas virtuales, hosting, VPS, ciberseguridad y optimización de velocidad. | Soluciones digitales para cada etapa de tu negocio | https://odiseacloud.com/servicios/ | Sin marcado |
| https://odiseacloud.com/portafolio/ — portafolio/index.html | 200 | Portafolio de Proyectos \| ODISEACLOUD | Proyectos reales desarrollados por ODISEACLOUD: aulas virtuales, plataformas de comercio electrónico, sitios web a medida y reestructuraciones corporativas. | Proyectos que reflejan nuestro trabajo | https://odiseacloud.com/portafolio/ | Sin marcado |
| https://odiseacloud.com/soluciones/ — soluciones/index.html | 200 | Soluciones Tecnológicas por Sector \| ODISEACLOUD | Soluciones tecnológicas a la medida de empresas, emprendedores, tiendas comerciales, centros educativos, institutos y profesionales independientes. | Tecnología adaptada a cada tipo de negocio | https://odiseacloud.com/soluciones/ | Sin marcado |
| https://odiseacloud.com/contacto/ — contacto/index.html | 200 | Contacto Comercial \| ODISEACLOUD | Comunícate directamente con el equipo de ODISEACLOUD por WhatsApp o correo electrónico para solicitar cotizaciones y asesoría en proyectos digitales. | ¿Tienes un proyecto en mente? Hagámoslo realidad | https://odiseacloud.com/contacto/ | Sin marcado |
| https://odiseacloud.com/privacidad/ — privacidad/index.html | 200 | Política de privacidad \| OdiseaCloud | Política de privacidad de OdiseaCloud. Información sobre nuestros servicios, tus datos y canales de atención. | Política de privacidad | https://odiseacloud.com/privacidad/ | Sin marcado |
| https://odiseacloud.com/terminos/ — terminos/index.html | 200 | Términos de servicio \| OdiseaCloud | Términos de servicio de OdiseaCloud. Información sobre nuestros servicios, tus datos y canales de atención. | Términos de servicio | https://odiseacloud.com/terminos/ | Sin marcado |
| https://odiseacloud.com/cookies/ — cookies/index.html | 200 | Política de cookies \| OdiseaCloud | Política de cookies de OdiseaCloud. Información sobre nuestros servicios, tus datos y canales de atención. | Política de cookies | https://odiseacloud.com/cookies/ | Sin marcado |
| https://odiseacloud.com/libro-de-reclamaciones/ — libro-de-reclamaciones/index.html | 200 | Libro de Reclamaciones \| OdiseaCloud | Libro de Reclamaciones de OdiseaCloud. Información sobre nuestros servicios, tus datos y canales de atención. | Libro de Reclamaciones | https://odiseacloud.com/libro-de-reclamaciones/ | Sin marcado |
| https://odiseacloud.com/servicios/desarrollo-web/ — servicios/desarrollo-web/index.html | 200 | Diseño y desarrollo de páginas web en Lima, Perú \| OdiseaCloud | Creamos páginas web para empresas y emprendedores en Perú: diseño a medida, adaptación a celulares, formularios de contacto y SEO técnico. | Diseño y creación de páginas web en Perú | https://odiseacloud.com/servicios/desarrollo-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/tiendas-virtuales/ — servicios/tiendas-virtuales/index.html | 200 | Creación de tiendas virtuales en Perú \| OdiseaCloud | Comercio electrónico completo con catálogos dinámicos, pasarelas de pago y gestión de pedidos. | Tiendas virtuales y eCommerce | https://odiseacloud.com/servicios/tiendas-virtuales/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/rediseno-web/ — servicios/rediseno-web/index.html | 200 | Rediseño de páginas web en Perú \| OdiseaCloud | Modernización estética, tecnológica y funcional de sitios web existentes para recuperar competitividad. | Reestructuración y rediseño web | https://odiseacloud.com/servicios/rediseno-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/sistemas-web/ — servicios/sistemas-web/index.html | 200 | Desarrollo de sistemas web a medida en Perú \| OdiseaCloud | Desarrollo de aplicaciones y paneles administrativos a la medida de los procesos de tu negocio. | Sistemas web personalizados | https://odiseacloud.com/servicios/sistemas-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/aulas-virtuales/ — servicios/aulas-virtuales/index.html | 200 | Implementación de aulas virtuales en Perú \| OdiseaCloud | Plataformas educativas para colegios, institutos, academias y empresas que imparten cursos online. | Aulas virtuales y eLearning | https://odiseacloud.com/servicios/aulas-virtuales/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/integraciones-automatizaciones/ — servicios/integraciones-automatizaciones/index.html | 200 | Automatización de procesos y CRM en Perú \| OdiseaCloud | Automatiza procesos y conecta tu CRM con formularios, WhatsApp, correo y tienda virtual. Integraciones a medida para empresas en Perú. Solicita una evaluación. | Automatización de procesos e integración de CRM | https://odiseacloud.com/servicios/integraciones-automatizaciones/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/hosting-web/ — servicios/hosting-web/index.html | 200 | Hosting web para empresas en Perú \| OdiseaCloud | Alojamiento confiable con cPanel, discos SSD NVMe, certificados SSL gratuitos y soporte técnico. | Hosting web de alto rendimiento | https://odiseacloud.com/servicios/hosting-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/correo-corporativo/ — servicios/correo-corporativo/index.html | 200 | Correo corporativo con dominio propio en Perú \| OdiseaCloud | Buzones con dominio propio (@tuempresa.com), configuración SPF/DKIM y entrega segura en bandeja de entrada. | Correo corporativo profesional | https://odiseacloud.com/servicios/correo-corporativo/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/dominios/ — servicios/dominios/index.html | 200 | Registro y configuración de dominios en Perú \| OdiseaCloud | Registro, renovación y administración técnica de dominios .com, .pe, .org y extensiones globales. | Registro y gestión de dominios | https://odiseacloud.com/servicios/dominios/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/servidores-vps/ — servicios/servidores-vps/index.html | 200 | Servidores VPS para empresas en Perú \| OdiseaCloud | Implementación, configuración y puesta en marcha de servidores privados virtuales Linux para aplicaciones exigentes. | Servidores VPS y Cloud | https://odiseacloud.com/servicios/servidores-vps/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/mantenimiento-web/ — servicios/mantenimiento-web/index.html | 200 | Mantenimiento de páginas web en Perú \| OdiseaCloud | Actualización periódica de plataformas, plugins, resolución de incidencias y soporte técnico prioritario. | Mantenimiento web continuo | https://odiseacloud.com/servicios/mantenimiento-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/seguridad-web/ — servicios/seguridad-web/index.html | 200 | Seguridad y protección de sitios web en Perú \| OdiseaCloud | Protección de accesos, blindaje contra ataques, limpieza de malware y auditorías de vulnerabilidad autorizadas. | Seguridad web y desinfección | https://odiseacloud.com/servicios/seguridad-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/migracion-web/ — servicios/migracion-web/index.html | 200 | Migración de páginas web y hosting en Perú \| OdiseaCloud | Traslado seguro de sitios web, tiendas y bases de datos a un nuevo hosting sin pérdida de datos ni caídas. | Migración de páginas web | https://odiseacloud.com/servicios/migracion-web/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/optimizacion-velocidad/ — servicios/optimizacion-velocidad/index.html | 200 | Optimización de velocidad de páginas web en Perú \| OdiseaCloud | Aceleración de tiempos de carga, compresión inteligente de recursos y optimización de rendimiento móvil. | Optimización de velocidad y Core Web Vitals | https://odiseacloud.com/servicios/optimizacion-velocidad/ | BreadcrumbList, Country, ListItem, Organization, Service |
| https://odiseacloud.com/servicios/seo-tecnico/ — servicios/seo-tecnico/index.html | 200 | Servicio de SEO técnico en Perú \| OdiseaCloud | Estructuración de datos, sitemaps, metadatos y optimización técnica para facilitar la indexación en buscadores. | SEO técnico y posicionamiento web | https://odiseacloud.com/servicios/seo-tecnico/ | BreadcrumbList, Country, ListItem, Organization, Service |

## Hallazgos priorizados

No se confirmó un P0 (caída general o bloqueo masivo de indexabilidad). P1 requiere investigación prioritaria; P2 corresponde a mejoras o validaciones. El impacto es cualitativo, sin estimar tráfico.

| Prioridad | ID | Hallazgo | Evidencia | Impacto / límite | Propuesta | Riesgo y aprobación |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | F01 | Variantes index: HTTPS → HTTP → HTTPS | GET /index.html, /index/ y las dos variantes de /servicios/desarrollo-web/: 301 a http://odiseacloud.com/... y 301 a HTTPS | Salto extra comprobado; impacto en rastreo y latencia no cuantificado | Inspeccionar esquema reenviado por proxy y Location de Apache; preparar corrección aislada | Medio: proxy/redirecciones; aprobación específica |
| P1 | F02 | www no resuelve desde este cliente | https://www.odiseacloud.com/: getaddrinfo failed, Errno 11001 | Acceso a esta variante no comprobable; alcance global desconocido | Contrastar DNS con resolución independiente y configuración autorizada; después verificar TLS | Alto si implica DNS/certificados; aprobación específica |
| P1 | F03 | No hay datos de rendimiento actuales | PageSpeed API móvil para home: HTTP 429; sin acceso a CrUX/Search Console | No se puede afirmar cumplimiento de LCP/INP/CLS | Reintentar PageSpeed manualmente y revisar CrUX al disponer de datos | Bajo para lectura; cambios posteriores requieren autorización |
| P1 | F04 | Indexación y consultas no verificadas | Existe meta de verificación en home, pero no hay sesión autorizada de Search Console | No permite determinar tráfico, consultas ni canibalización real | Solicitar exportación o acceso de lectura a rendimiento e indexación | Bajo; requiere acceso legítimo |
| P2 | F05 | 28 instancias de imagen sin width/height HTML | Logo de cabecera en las 25 páginas; además tres capturas de portafolio en index.html | Riesgo de estabilidad por validar; el logo ya tiene altura CSS 38px | Medir CLS y dimensiones reales antes de proponer atributos; comprobar ausencia de cambio visual | Bajo/medio; aprobación de parche y QA visual |
| P2 | F06 | Home usa metadatos sociales con redacción distinta al title actual | index.html: title Diseño de páginas web en Perú; og:title Creación de páginas web y servicios digitales en Perú | Diferencia editorial válida; no es un error SEO demostrado | Conservar por defecto; proponer alineación solo si se busca consistencia comercial | Bajo; sustituir metadatos requiere aprobación |
| P2 | F07 | Fuentes externas mediante @import | assets/css/main.css:6; Plus Jakarta Sans 7 pesos e Inter 4 pesos con display=swap | Posible dependencia en ruta de renderizado; sin medición de LCP | Medir waterfall y uso real antes de proponer cambios de carga | Medio: tipografía y presentación; aprobación específica |
| P2 | F08 | Saltos en jerarquía de encabezados | index.html: sección institucional H2 seguida de H4; footer usa H4 | Semántica por revisar; no demuestra pérdida de rankings | Evaluar árbol de accesibilidad; no cambiar H1-H6 en esta fase | Medio: contenido visible/estilos; aprobación específica |
| P2 | F09 | WebSite no aparece en JSON-LD local | Home tiene Organization; 15 servicios tienen Service y BreadcrumbList, con proveedor Organization por referencia | Oportunidad opcional, no requisito de indexación ni garantía de rich results | Valorar un solo nodo WebSite con @id estable; no duplicar Organization | Bajo; autorización para añadir marcado |

## Redirecciones y accesibilidad HTTP

| Solicitud | Resultado observado |
| --- | --- |
| http://odiseacloud.com/ | 200 final https://odiseacloud.com/ |
| https://www.odiseacloud.com/ | <urlopen error [Errno 11001] getaddrinfo failed> |
| https://odiseacloud.com/index.html | 200 final https://odiseacloud.com/ |
| https://odiseacloud.com/index/ | 200 final https://odiseacloud.com/ |
| https://odiseacloud.com/servicios/desarrollo-web/index.html | 200 final https://odiseacloud.com/servicios/desarrollo-web/ |
| https://odiseacloud.com/servicios/desarrollo-web/index/ | 200 final https://odiseacloud.com/servicios/desarrollo-web/ |
| https://odiseacloud.com/seo-auditoria-inexistente-20261030/ | 404 final https://odiseacloud.com/seo-auditoria-inexistente-20261030/ |
| https://odiseacloud.com/robots.txt | 200 final https://odiseacloud.com/robots.txt |
| https://odiseacloud.com/sitemap.xml | 200 final https://odiseacloud.com/sitemap.xml |

Las cuatro variantes index respondieron 301 a HTTP y luego 301 a HTTPS. HTTP home respondió 301 directamente a HTTPS. No se reprodujo el error 500 del informe anterior. El fallo DNS de www observado hoy no demuestra que exista todavía el antiguo fallo TLS: no se pudo iniciar esa negociación. No se modificó infraestructura.

## Rendimiento, imágenes y recursos

| Archivo | Bytes locales sin comprimir |
| --- | --- |
| assets\css\main.css | 43724 |
| assets\js\config.js | 5083 |
| assets\js\main.js | 3738 |
| assets\js\reclamaciones.js | 3057 |

Estos tamaños no son transferencia comprimida ni métricas de usuario. Se observó lazy loading en capturas y fetchpriority=high en imágenes principales; no se asume que toda imagen deba cargarse diferida. Las 28 instancias sin dimensiones se detallan en F05. No se midieron fuentes descargadas, waterfall ni coste de ejecución JS. PageSpeed devolvió 429: LCP, INP, CLS de campo y puntuaciones de laboratorio quedan pendientes. No hay auditoría móvil visual ni de accesibilidad ejecutada; el checklist define esas comprobaciones.

## Evaluación semántica, comercial y local

Home representa la oferta general y ya tiene el title “Diseño de páginas web en Perú | OdiseaCloud”; no necesita sustituirse por el ejemplo del MFD por una diferencia de mayúsculas. Los quince servicios ya tienen intención y título propios; automatizaciones ya menciona CRM. La coincidencia temática entre home y desarrollo web es razonable y no prueba canibalización sin consultas de Search Console.

Desarrollo web ya presenta destinatarios, beneficios, alcance, proceso de cuatro fases, preguntas frecuentes y CTA. Automatizaciones describe conexión de formularios, ventas, correo y tienda. Las capturas del portafolio no bastan para verificar resultados, clientes ni métricas: cualquier caso comercial requiere evidencia del propietario. No se confirmó que tecnologías mencionadas constituyan integraciones efectivamente entregadas.

La página de desarrollo web dice “Trabajamos desde Lima y atendemos proyectos a distancia”; es evidencia de lo publicado, no verificación independiente de presencia física. Mantener el contenido actual; pedir validación comercial antes de ampliar señales locales. No añadir dirección, LocalBusiness, reseñas ni precios sin datos verificables.

## Pendientes de acceso y límites

Search Console y Google Business Profile no fueron consultados. La etiqueta pública de verificación no concede acceso. Pendientes: consultas, CTR, indexación elegida por Google, acciones manuales, CrUX, validación de propiedades de schema con herramientas dedicadas, móvil y navegación por teclado. No hay rankings, volúmenes ni métricas de conversión comprobados.

Fuentes técnicas: [Google: datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [Web Vitals](https://web.dev/articles/vitals). JSON válido no acredita elegibilidad para resultados enriquecidos. Los objetivos de campo se evalúan al percentil 75: LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1.
