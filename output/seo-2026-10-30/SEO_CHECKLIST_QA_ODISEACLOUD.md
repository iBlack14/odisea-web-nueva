# Checklist QA SEO — OdiseaCloud

Fecha: 30 de octubre de 2026. Fase A completada con límites explícitos. No hay implementación ni medición posterior a cambios.

## Línea base comprobada

- [x] 25 URLs del sitemap local y público coinciden; GET 200 en las 25.
- [x] Title, H1 y canonical local coinciden con HTML público.
- [x] Titles y descriptions locales únicos; un H1 y canonical propio por página.
- [x] Sin noindex en páginas del sitemap ni bloqueo general en robots.txt.
- [x] JSON-LD local parseable; inventario de tipos documentado.
- [x] Enlaces locales href/src resuelven en disco; ninguna página del sitemap huérfana en ese grafo.
- [x] Prueba de 404 y cinco solicitudes de redirección documentadas.
- [x] Presencia de alt, lang, viewport y metadatos sociales revisada.
- [ ] Validar schema semánticamente con Schema Markup Validator y Rich Results Test en home y servicios representativos. No esperar rich results por todo tipo Service.
- [ ] Verificar www con otra resolución DNS y después TLS, sin modificar configuración.
- [ ] Revisar Search Console: inspección URL, canonical elegida, sitemap, cobertura y consultas por página/país.
- [ ] Revisar enlaces externos, anchors, recursos CSS/srcset y disponibilidad HTTP de imágenes.
- [ ] Medir PageSpeed móvil/escritorio y CrUX; API devolvió 429 durante esta revisión.

## Antes de implementar

- [ ] Aprobación explícita por conjunto de cambios y, separadamente, producción.
- [ ] Rama independiente, base Git registrada y diff inicial limpio; preservar trabajo ajeno.
- [ ] Capturas de home, catálogo, desarrollo web, automatizaciones, contacto y reclamaciones a 375, 768 y 1440 px.
- [ ] Registrar títulos, metadatos, H1-H6, canonicals, sitemap, robots, JSON-LD y hashes de recursos antes del parche.
- [ ] Guardar waterfall y tres mediciones de laboratorio con entorno identificado; no presentar TBT como INP de campo.

## Después de cada parche autorizado

- [ ] Revisar diff: ningún cambio visible, ruta, CTA, formulario o configuración fuera del alcance aprobado.
- [ ] Generar HTML desde build.js solo dentro del alcance aprobado; comprobar que no introduce cambios ajenos.
- [ ] Repetir inventario y validar canonical, robots, JSON-LD y unicidad de metadatos.
- [ ] Conservar 25 URLs y 404 real; comprobar cadenas 301 sin bucles ni saltos a HTTP si ese cambio se autorizó.
- [ ] Comparar capturas en los mismos tamaños: fuentes, hero, navegación, tarjetas, footer y formularios idénticos.
- [ ] Móvil: sin desbordamiento horizontal; menú, filtros, FAQ y enlaces de contacto funcionales.
- [ ] Accesibilidad: teclado, foco visible, nombres accesibles, estructura de encabezados, alt contextual y ausencia de regresiones con zoom 200 %.
- [ ] Formularios: validación y fallback en entorno de prueba; no enviar correo ni reclamaciones reales durante QA sin autorización.
- [ ] Rendimiento: comparar laboratorio en condiciones equivalentes; evaluar campo al p75 cuando haya muestra suficiente. LCP ≤2,5 s; INP ≤200 ms; CLS ≤0,1.
- [ ] Verificar indexabilidad de texto y enlaces en respuesta HTML y, si hay acceso, en inspección de Google.

## Reversión

No se necesita rollback del sitio: no fue modificado. Los cuatro entregables están bajo output/seo-2026-10-30/, ya excluido del contexto Docker por output en .dockerignore.

Si se implementa: registrar commit y archivos aprobados; revertir únicamente ese commit mediante git revert en la rama de trabajo, regenerar si corresponde y repetir comprobaciones. No usar reset destructivo ni sobrescribir cambios ajenos. Para infraestructura, registrar valores originales por canal privado y plan de restauración antes de tocarla; no incluir secretos en informes. Cualquier despliegue o reversión en producción requiere autorización.
