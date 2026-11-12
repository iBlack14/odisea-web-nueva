# Revisión de archivos y Git — 12 de noviembre de 2026

Revisión del árbol actual; no se eliminaron archivos ni se modificó el índice de Git.

## Recursos sin referencias

Se encontraron 23 imágenes, 27 578 366 bytes (27,6 MB decimales), sin referencias por nombre de archivo en HTML, CSS, JavaScript, PHP, JSON y otros archivos de aplicación versionados. Se excluyeron artefactos de output y documentación de esta detección. La ausencia de referencias no prueba que un original no tenga valor como material editable o que no reciba visitas externas.

| Archivo | Tamaño |
| --- | ---: |
| `assets/images/a_clean_modern_high_resolution_branding_mascot_i.png` | 1533.3 KB |
| `assets/images/automatizacion-crm.png` | 1620.0 KB |
| `assets/images/hero-cloud.png` | 801.5 KB |
| `assets/images/infra-datacenter.png` | 791.3 KB |
| `assets/images/infra-network.png` | 791.5 KB |
| `assets/images/infra-network.webp` | 115.1 KB |
| `assets/images/mascota-derecha.png` | 1574.5 KB |
| `assets/images/mascota-espacio.png` | 2221.1 KB |
| `assets/images/mascota-izquierda.png` | 996.6 KB |
| `assets/images/mascota.png` | 1533.3 KB |
| `assets/images/mascota.webp` | 64.0 KB |
| `assets/images/portfolio-aula-virtual.png` | 1995.8 KB |
| `assets/images/portfolio-campus-ui.png` | 1639.7 KB |
| `assets/images/portfolio-corporativa-ui.png` | 1791.6 KB |
| `assets/images/portfolio-ecommerce.png` | 1920.5 KB |
| `assets/images/portfolio-rediseno.png` | 1678.8 KB |
| `assets/images/portfolio-tienda-ui.png` | 1809.3 KB |
| `assets/images/portfolio-wordpress.png` | 1648.8 KB |
| `assets/images/robot-asistente.png` | 1016.6 KB |
| `assets/images/robot-asistente.webp` | 135.4 KB |
| `assets/images/service-sys.png` | 655.3 KB |
| `assets/images/service-web.png` | 596.9 KB |
| `assets/images/tech/letsencrypt.svg` | 1.2 KB |

## Duplicado exacto

`assets/images/a_clean_modern_high_resolution_branding_mascot_i.png` y `assets/images/mascota.png` tienen el mismo SHA-256. Ambos carecen de referencias actuales. No se necesita conservar los dos como originales.

## Git y archivos locales

- `output/stitch/`: 19 archivos versionados, 11 188 788 bytes (11,2 MB). Son el concepto de diseño, capturas, respuestas y scripts temporales; no se requieren para compilar o servir la web. `.dockerignore` ya excluye output del contenedor, pero `.gitignore` solo excluye algunas subcarpetas y no excluye Stitch.
- `.agents/mcp_config.json`, `.agents/plugins/stitch/mcp_config.json`, `.agents/plugins/stitch/plugin.json`, `.agents/skills/stitch/SKILL.md` y `.mcp.json` están versionados aunque coinciden con reglas actuales de exclusión. Agregar una regla a `.gitignore` no elimina archivos del índice. Son herramientas locales, no recursos del sitio; la guía de Stitch puede conservarse como documentación si se desea compartirla.
- `.env` y `.env.spaceship` no están en el índice actual. No se imprimieron ni inspeccionaron sus valores. Esto no constituye una auditoría del historial de Git.
- `automatizacion.code-workspace` es configuración del editor, no un componente de producción. Puede conservarse si el proyecto comparte ese espacio de trabajo.
- `output/audit-files/` contiene este análisis temporal y actualmente no está cubierto por una regla global de output.

## Archivos que deben conservarse

Los HTML generados son necesarios para este despliegue estático/Apache; no son basura aunque build.js pueda regenerarlos. `build.js`, `data/servicios.json`, `legal-pages.js`, `seo-output.js`, `service-features.js` y `tech-icons.js` forman parte de la compilación. `contact.php`, `contact-automation.php`, `mailer.php`, `reclamaciones.php`, `domain-check.php` y los scripts del navegador tienen referencias activas. `domain-check.js` y `server.js` sirven el entorno local. No borrar `BingSiteAuth.xml`, robots.txt, sitemap.xml ni las configuraciones de hosting.

## Limpieza recomendada

1. Agregar `output/` a `.gitignore` y retirar los artefactos de Stitch del índice, conservándolos localmente. Esto no elimina versiones anteriores del historial.
2. Separar las configuraciones MCP locales de una plantilla compartible, preservando la skill si se usa en el equipo.
3. Guardar los originales de imágenes fuera de los archivos publicados; retirar solo los recursos confirmados sin uso, conservando las variantes WebP activas.
4. Ejecutar npm run build y npm run audit:seo después de la limpieza.

No se ha ejecutado esta limpieza: el pedido fue revisar.
