# 🚀 Guía de Despliegue en Easypanel — ODISEACLOUD

**Easypanel** es un panel de control moderno basado en Docker que permite desplegar aplicaciones en VPS con certificados SSL automáticos (Let's Encrypt), proxy inverso Traefik y despliegue continuo.

Este proyecto ya cuenta con un [`Dockerfile`](./Dockerfile), [`.dockerignore`](./.dockerignore) y [`docker-compose.yml`](./docker-compose.yml) configurados y optimizados con **PHP 8.2 + Apache**, soporte nativo de `.htaccess` (URLs limpias sin `.html`) y envío seguro de formularios.

---

## 📋 Método 1: Despliegue desde GitHub / GitLab (Recomendado)

Este es el método más rápido y permite que cada vez que hagas cambios en tu código, Easypanel actualice la web automáticamente.

### Paso 1: Subir tu código a GitHub
1. Inicializa Git en la carpeta del proyecto (si aún no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Web corporativa OdiseaCloud lista para produccion"
   ```
2. Crea un repositorio en tu cuenta de GitHub (público o privado).
3. Vincula y sube el código:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/odiseacloud-web.git
   git branch -M main
   git push -u origin main
   ```

---

### Paso 2: Crear el servicio en Easypanel
1. Ingresa a tu panel de **Easypanel** (`https://tu-servidor:3000`).
2. Entra a tu proyecto (o crea uno nuevo llamado `odiseacloud`).
3. Haz clic en el botón azul **«+ Service»** y selecciona **«App»**.
4. Asígnale un nombre al servicio (por ejemplo: `web`).

---

### Paso 3: Configurar el Origen (Source) y Build
1. En la pestaña **Source**:
   - Selecciona **GitHub** (o Git Repository).
   - Si es tu primera vez, conecta tu cuenta de GitHub en Easypanel.
   - Elige tu repositorio (`TU_USUARIO/odiseacloud-web`) y la rama `main`.
2. En la pestaña **Build**:
   - Tipo de compilación: Selecciona **Dockerfile** (el proyecto ya incluye el archivo `Dockerfile` configurado).
   - Ruta del Dockerfile: `./Dockerfile` (por defecto).

---

### Paso 4: Configurar Dominio y Puertos
1. En la pestaña **Domains**:
   - Haz clic en **«Add Domain»**.
   - Escribe tu dominio oficial: `odiseacloud.com`
   - Si deseas, agrega también `www.odiseacloud.com`.
   - **Port:** Escribe `80` (puerto interno donde escucha Apache).
2. Asegúrate de que los registros DNS de tu dominio (tipo **A**) en tu registrador (Cloudflare, Namecheap, etc.) apunten a la dirección IP pública de tu servidor VPS de Easypanel.

---

### Paso 5: Desplegar
1. Haz clic en el botón verde **«Deploy»** en la esquina superior derecha.
2. Easypanel descargará la imagen, compilará el contenedor, configurará Traefik y emitirá el certificado SSL HTTPS gratuito de Let's Encrypt automáticamente.
3. En menos de 2 minutos, tu sitio web estará online con URLs limpias y máxima velocidad.

---

## 🐳 Método 2: Despliegue usando Docker Compose en Easypanel

Si prefieres usar la opción de Compose de Easypanel:

1. En tu proyecto de Easypanel, haz clic en **«+ Service»** > **«Compose»**.
2. Dale nombre al servicio: `odiseacloud`.
3. Pega el contenido de nuestro archivo [`docker-compose.yml`](./docker-compose.yml):
   ```yaml
   version: '3.8'

   services:
     odiseacloud-web:
       build:
         context: .
         dockerfile: Dockerfile
       container_name: odiseacloud-app
       restart: always
       ports:
         - "80:80"
   ```
4. Agrega tu dominio en la sección de dominios apuntando al puerto `80`.
5. Haz clic en **«Deploy»**.

---

## 🛠️ Verificaciones Post-Despliegue

1. **URLs Limpias:** Comprueba que al ingresar a `https://odiseacloud.com/nosotros/` o `https://odiseacloud.com/servicios/` cargue sin mostrar `.html`.
2. **Formulario de Contacto:** Verifica que el formulario en `/contacto/` procese mediante `contact.php` o active el fallback dinámico a WhatsApp / correo.
3. **Botones de WhatsApp:** Prueba hacer clic en el botón flotante y en los botones de cotización para verificar que abran chat directo con el número oficial `+51 907 959 276`.
