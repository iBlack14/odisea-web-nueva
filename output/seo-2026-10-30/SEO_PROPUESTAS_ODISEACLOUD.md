# Propuestas SEO — pendientes de autorización

Fecha: 30 de octubre de 2026. No se aplicó ningún parche al sitio. Todas las propuestas son reversibles y requieren aprobación del conjunto concreto antes de implementar. No hay necesidad demostrada de reescribir todos los títulos ni el H1.

| Actual | Propuesta | Motivo / evidencia | Impacto esperado | Riesgo | Autorización requerida |
| --- | --- | --- | --- | --- | --- |
| Variantes index: HTTPS → HTTP → HTTPS | Inspeccionar esquema reenviado por proxy y Location de Apache; preparar corrección aislada | GET /index.html, /index/ y las dos variantes de /servicios/desarrollo-web/: 301 a http://odiseacloud.com/... y 301 a HTTPS | Salto extra comprobado; impacto en rastreo y latencia no cuantificado | Medio: proxy/redirecciones | Sí; P1 / F01 |
| www no resuelve desde este cliente | Contrastar DNS con resolución independiente y configuración autorizada; después verificar TLS | https://www.odiseacloud.com/: getaddrinfo failed, Errno 11001 | Acceso a esta variante no comprobable; alcance global desconocido | Alto si implica DNS/certificados | Sí; P1 / F02 |
| No hay datos de rendimiento actuales | Reintentar PageSpeed manualmente y revisar CrUX al disponer de datos | PageSpeed API móvil para home: HTTP 429; sin acceso a CrUX/Search Console | No se puede afirmar cumplimiento de LCP/INP/CLS | Bajo para lectura | Sí; P1 / F03 |
| Indexación y consultas no verificadas | Solicitar exportación o acceso de lectura a rendimiento e indexación | Existe meta de verificación en home, pero no hay sesión autorizada de Search Console | No permite determinar tráfico, consultas ni canibalización real | Bajo | Sí; P1 / F04 |
| 28 instancias de imagen sin width/height HTML | Medir CLS y dimensiones reales antes de proponer atributos; comprobar ausencia de cambio visual | Logo de cabecera en las 25 páginas; además tres capturas de portafolio en index.html | Riesgo de estabilidad por validar; el logo ya tiene altura CSS 38px | Bajo/medio | Sí; P2 / F05 |
| Home usa metadatos sociales con redacción distinta al title actual | Conservar por defecto; proponer alineación solo si se busca consistencia comercial | index.html: title Diseño de páginas web en Perú; og:title Creación de páginas web y servicios digitales en Perú | Diferencia editorial válida; no es un error SEO demostrado | Bajo | Sí; P2 / F06 |
| Fuentes externas mediante @import | Medir waterfall y uso real antes de proponer cambios de carga | assets/css/main.css:6; Plus Jakarta Sans 7 pesos e Inter 4 pesos con display=swap | Posible dependencia en ruta de renderizado; sin medición de LCP | Medio: tipografía y presentación | Sí; P2 / F07 |
| Saltos en jerarquía de encabezados | Evaluar árbol de accesibilidad; no cambiar H1-H6 en esta fase | index.html: sección institucional H2 seguida de H4; footer usa H4 | Semántica por revisar; no demuestra pérdida de rankings | Medio: contenido visible/estilos | Sí; P2 / F08 |
| WebSite no aparece en JSON-LD local | Valorar un solo nodo WebSite con @id estable; no duplicar Organization | Home tiene Organization; 15 servicios tienen Service y BreadcrumbList, con proveedor Organization por referencia | Oportunidad opcional, no requisito de indexación ni garantía de rich results | Bajo | Sí; P2 / F09 |

## Comparación con los ejemplos del MFD

- Home actual: “Diseño de páginas web en Perú | OdiseaCloud”. Propuesta: conservar. Ya cubre el tema del ejemplo.
- Description actual: “Creación y diseño de páginas web en Perú. Desarrollamos tiendas virtuales, sistemas a medida y aulas virtuales. Consulta tu proyecto con OdiseaCloud.” Propuesta: conservar; no hay evidencia de que la alternativa consiga mejor CTR.
- H1 actual: “Creamos páginas web y soluciones digitales.” Propuesta: conservar. La descripción visible ya contextualiza Perú; cambiar H1 necesita aprobación específica.
- CRM: usar /servicios/integraciones-automatizaciones/ existente. No crear página adicional ni una ruta de CRM sin datos que justifiquen separarla.

## Borradores comerciales separados del sitio

Son textos para revisión del propietario. No publicar hasta validar que el proceso ofrecido corresponde a la operación real. Encajarían junto al alcance o preguntas frecuentes actuales, preservando la estructura hasta aprobación de contenido y presentación.

| Página / ubicación candidata | Borrador sugerido | Evidencia necesaria |
| --- | --- | --- |
| Desarrollo web / FAQ | ¿Qué información necesitan para evaluar mi página web? Podemos revisar el objetivo del sitio, las secciones previstas y los canales de contacto que necesita tu negocio. | Confirmar proceso comercial, materiales y entregables incluidos. |
| Sistemas web / alcance | Para evaluar un sistema a medida, conviene identificar usuarios, tareas, permisos e integraciones necesarias. El alcance se acuerda según los requisitos del proyecto. | Confirmar análisis y límites reales del servicio. |
| Automatizaciones / FAQ | ¿Se puede conectar mi CRM con otras herramientas? La viabilidad depende del CRM, de los accesos disponibles y de las opciones de integración de cada plataforma. | Confirmar plataformas atendidas; no prometer toda integración. |
| Tiendas virtuales / FAQ | ¿Cómo se elige una pasarela de pago? La elección depende de los medios de pago requeridos y de las condiciones del proveedor. | Confirmar proveedores y responsabilidades de afiliación. |
| Aulas virtuales / FAQ | Para evaluar un aula virtual, revisemos usuarios, cursos, evaluaciones e integraciones requeridas. | Confirmar alcance, soporte y licencias. |
| Hosting y correo / alcance | Antes de recomendar una configuración, revisemos el sitio, los buzones y las necesidades de soporte. | Confirmar capacidad, respaldos, límites y soporte contratables. |

No añadir cifras de ahorro, entregas garantizadas, testimonios ni certificaciones. El portafolio puede apoyar experiencia solo con autorización y datos reales del proyecto. Conservar CTAs actuales.

## Calendario editorial y briefs — sin publicar

Orden provisional por encaje con la oferta existente, no por demanda medida. Activar cada semana únicamente después de validar consultas en Search Console, capacidad del servicio y autorización editorial. No se redactaron artículos completos.

| Semana relativa | Tema / destino de enlace | Brief y dudas a resolver | Validación pendiente |
| --- | --- | --- | --- |
| 1 | ¿Cuánto cuesta crear una página web en Perú? → desarrollo web | Explicar factores de alcance, materiales, integraciones y soporte; orientar a cotización sin inventar tarifas. | Consultas comerciales reales y política de presupuestos. |
| 2 | Tienda virtual con métodos de pago locales → tiendas virtuales | Requisitos de negocio, compatibilidad, afiliación, pruebas y responsabilidades; no garantizar aprobación del proveedor. | Pasarelas efectivamente atendidas y condiciones vigentes. |
| 3 | ¿Cuándo conviene implementar un CRM empresarial? → automatizaciones | Señales de necesidad, procesos, calidad de datos e integración; criterios de evaluación. | Casos autorizados, sistemas atendidos y consultas. |
| 4 | Moodle vs. aula personalizada → aulas virtuales | Comparar requisitos, mantenimiento, personalización y costes por categoría sin cifras ficticias. | Oferta real y fuentes oficiales actuales de Moodle. |
| 5 | ¿Qué hosting requiere una empresa? → hosting | Requisitos de aplicación, recursos, disponibilidad y soporte; guiar la evaluación. | Límites y condiciones reales de los planes. |
| 6 | WooCommerce–Odoo: requisitos y ventajas → automatizaciones | Identificar versiones, conectores, permisos, datos sincronizados y mantenimiento. | Confirmar capacidad comercial y compatibilidades; posponer si no se ofrece. |

## Implementación futura

Tras aprobación: crear rama independiente desde la base acordada; modificar generadores cuando corresponda en lugar de solo HTML generado; revisar diff y render; compilar únicamente en la fase autorizada; entregar archivos, pruebas y reversión. Despliegue requiere permiso separado. No hay parche ejecutable de servidor preparado porque falta inspeccionar la configuración efectiva del proxy; proponer una regla ahora sería especulativo.
