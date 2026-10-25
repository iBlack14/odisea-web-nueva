const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // 1. Redirigir si alguien escribe .html en la URL directamente
  if (reqPath.endsWith('.html') && !reqPath.endsWith('index.html')) {
    const cleanUrl = reqPath.replace(/\.html$/, '') + '/';
    res.writeHead(301, { 'Location': cleanUrl });
    res.end();
    return;
  }

  let filePath = path.join(__dirname, reqPath);

  // 2. Si es un directorio y no tiene barra al final, redirigir a la barra (ej: /nosotros -> /nosotros/)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory() && !reqPath.endsWith('/')) {
    res.writeHead(301, { 'Location': reqPath + '/' });
    res.end();
    return;
  }

  // 3. Si termina en barra, buscar index.html en ese directorio
  if (reqPath.endsWith('/')) {
    filePath = path.join(__dirname, reqPath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 No encontrado');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error al leer el archivo');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor corporativo OdiseaCloud corriendo en http://localhost:${PORT}`);
});
