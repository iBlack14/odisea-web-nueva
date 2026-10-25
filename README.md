# ODISEACLOUD — Sitio Web Corporativo Oficial
> **Lema:** Tu proyecto, sin límites  
> **Tecnologías:** HTML5 Semántico, CSS3 Moderno (SaaS Premium), JavaScript Vainilla, PHP (Endpoint de correo seguro), Google Stitch MCP.

---

## 🚀 1. Estructura del Proyecto

El sitio web está estructurado con código propio y optimizado para máxima velocidad, accesibilidad y conversión:

```text
├── index.html                           # Portada oficial (9 secciones requeridas)
├── nosotros/
│   └── index.html                       # Página institucional, misión, visión y valores
├── servicios/
│   ├── index.html                       # Catálogo general con filtros interactivos por categoría
│   ├── desarrollo-web/index.html        # 01. Diseño y desarrollo web
│   ├── tiendas-virtuales/index.html     # 02. Tiendas virtuales y eCommerce
│   ├── rediseno-web/index.html          # 03. Reestructuración y rediseño web
│   ├── sistemas-web/index.html          # 04. Sistemas web personalizados
│   ├── aulas-virtuales/index.html       # 05. Aulas virtuales y eLearning
│   ├── integraciones-automatizaciones/index.html # 06. Integraciones y automatizaciones
│   ├── hosting-web/index.html           # 07. Hosting web de alto rendimiento
│   ├── correo-corporativo/index.html    # 08. Correo corporativo profesional
│   ├── dominios/index.html              # 09. Registro y gestión de dominios
│   ├── servidores-vps/index.html        # 10. Servidores VPS y Cloud
│   ├── mantenimiento-web/index.html     # 11. Mantenimiento web continuo
│   ├── seguridad-web/index.html         # 12. Seguridad web y desinfección
│   ├── migracion-web/index.html         # 13. Migración de páginas web
│   ├── optimizacion-velocidad/index.html# 14. Optimización de velocidad y Core Web Vitals
│   └── seo-tecnico/index.html           # 15. SEO técnico y posicionamiento web
├── portafolio/
│   └── index.html                       # Galería de proyectos con filtros
├── soluciones/
│   └── index.html                       # Soluciones adaptadas por sector de negocio
├── contacto/
│   └── index.html                       # Canales directos, WhatsApp dinámico y formulario
├── assets/
│   ├── css/main.css                     # Estilos corporativos con diseño SaaS Premium
│   ├── js/config.js                     # Configuración centralizada de WhatsApp y correo
│   ├── js/main.js                       # Sticky header, menú móvil, filtros y acordeón FAQ
│   └── images/                          # Logotipo oficial, mascota robótica y capturas reales
├── data/
│   └── servicios.json                   # Catálogo maestro de contenidos, valores y servicios
├── contact.php                          # Procesador seguro de correo para hosting cPanel
├── build.js                             # Generador estático para compilar cambios instantáneamente
├── server.js                            # Servidor local de previsualización ultrarrápido
├── robots.txt                           # Directivas de indexación para buscadores
└── sitemap.xml                          # Mapa del sitio XML para Google Search Console
```

---

## 🎨 2. Identidad Visual y Diseño
- **Paleta de Colores:**
  - Azul Corporativo: `#0866F5`
  - Azul Tecnológico: `#009DFF`
  - Azul Marino: `#06122B`
  - Azul Oscuro: `#071C45`
  - Celeste Suave: `#EAF5FF`
  - Blanco: `#FFFFFF`
  - Gris Claro: `#F6F9FC`
  - Texto Principal: `#14233D`
- **Tipografía:** *Plus Jakarta Sans* (títulos y destacados) e *Inter* (cuerpo y lecturabilidad).
- **Recursos Oficiales Integrados:**
  - Logotipo original con órbita tecnológica brillante (`assets/images/logo.png`).
  - Mascota robótica original en el espacio (`assets/images/mascota.png`).
  - Proyectos reales en portafolio (Aula Virtual, Tienda Virtual, Desarrollo a medida, Rediseño).

---

## 📱 3. Configuración Centralizada de Contacto

Para cambiar el número de WhatsApp oficial o el correo comercial en todo el sitio web:
1. Abre [`data/servicios.json`](file:///c:/Users/huanc/Downloads/odisea%20web%20nueva/data/servicios.json) o [`assets/js/config.js`](file:///c:/Users/huanc/Downloads/odisea%20web%20nueva/assets/js/config.js).
2. Modifica:
   - `whatsappNumber`: `"51999999999"` (código de país + número, sin signos).
   - `whatsappDisplay`: `"+51 999 999 999"`
   - `email`: `"contacto@odiseacloud.com"`
3. Si editaste `data/servicios.json`, ejecuta `npm run build` para actualizar todas las páginas de inmediato.

---

## 💻 4. Cómo Probar Localmente

```bash
# Iniciar servidor local
npm run dev
# o bien
npm start
```

Abre tu navegador en:  
👉 **`http://localhost:3000`**

---

## 🌐 5. Cómo Publicar en un Hosting Tradicional con cPanel

El sitio fue diseñado específicamente para no depender de Node.js en producción y funcionar al 100% en cualquier hosting compartido con cPanel:

1. Ingresa a tu **cPanel** > **Administrador de Archivos** (o conéctate por FTP con FileZilla).
2. Dirígete a la carpeta raíz de tu dominio (generalmente `public_html/`).
3. Sube todos los archivos y carpetas del proyecto:
   - `index.html`
   - carpetas `nosotros/`, `servicios/`, `portafolio/`, `soluciones/`, `contacto/`
   - carpeta `assets/`
   - carpeta `data/`
   - archivo `contact.php`
   - `robots.txt` y `sitemap.xml`
4. ¡Listo! El sitio web quedará activo inmediatamente con certificados SSL, carga ultrarrápida y envío seguro de formularios.

---

## 🤖 6. Integración Google Stitch MCP

El proyecto cuenta con la integración de **Google Stitch MCP** configurada en:
- `.agents/plugins/stitch/mcp_config.json`
- `.agents/mcp_config.json`
- `.mcp.json`

Permite extraer "Design DNA", generar nuevas vistas UI e importar código frontend directo desde la IA de Stitch.
