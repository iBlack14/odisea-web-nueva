# Buscador de dominios — Spaceship

Crear una clave con permiso `domains:read` en https://www.spaceship.com/application/api-manager/.
Se necesitan API Key y API Secret. No se requieren permisos de compra.

## Local (Node)

Completar `.env` en la raíz del proyecto, sin comillas (también se admite `.env.spaceship`):

```dotenv
SPACESHIP_API_KEY=
SPACESHIP_API_SECRET=
```

Reiniciar `npm run dev`. Este archivo está ignorado por Git y bloqueado por el servidor.

## Hosting Apache/PHP o Easypanel

Configurar las mismas dos variables en el entorno del servicio y volver a desplegar.
Docker Compose ya las pasa al contenedor. PHP usa las variables del entorno, no el archivo local.
El endpoint requiere salida HTTPS y `allow_url_fopen` habilitado.

El buscador consulta Spaceship desde `/domain-check.php`. Las credenciales nunca se entregan al navegador.
Si una extensión no está soportada o la API falla, se muestra que no se pudo verificar.
No se interpreta un error como disponibilidad. Los resultados se conservan cinco minutos para respetar los límites del proveedor.

Documentación: https://docs.spaceship.dev/
