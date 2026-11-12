const http = require('http');
const fs = require('fs');
const path = require('path');

// Optional, ignored credentials file for local development.
for (const envName of ['.env', '.env.spaceship']) {
const spaceshipEnv = path.join(__dirname, envName);
if (fs.existsSync(spaceshipEnv)) {
  for (const line of fs.readFileSync(spaceshipEnv, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^(SPACESHIP_API_KEY|SPACESHIP_API_SECRET)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}
}

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
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  if (reqPath.split(/[\\/]/).some(part => part.startsWith('.'))) {
    res.writeHead(404);
    res.end('404 No encontrado');
    return;
  }

  if (reqPath === '/domain-check.php') {
    require('./domain-check')(req, res);
    return;
  }

  // Feed de comentarios del antiguo WordPress (igual que en Apache).
  const queryString = req.url.split('?')[1] || '';
  if (reqPath === '/' && /(^|&)feed=comments-rss2(&|$)/i.test(queryString)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    fs.createReadStream(path.join(__dirname, '404.html')).pipe(res);
    return;
  }

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
