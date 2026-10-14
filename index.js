const fs = require('fs');
const path = require('path');
const http = require('http');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function findFile(rel) {
  if (!rel) return null;
  const cleaned = rel.replace(/^\/+/, '');

  // 1. Essayer depuis process.cwd() (racine standard Lambda Vercel avec includeFiles)
  const p1 = path.join(process.cwd(), cleaned);
  if (fs.existsSync(p1) && fs.statSync(p1).isFile()) {
    return p1;
  }

  // 2. Essayer depuis __dirname (dossier du script)
  const p2 = path.join(__dirname, cleaned);
  if (fs.existsSync(p2) && fs.statSync(p2).isFile()) {
    return p2;
  }

  return null;
}

function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = url.pathname.replace(/\/$/, '') || '/';

  let targetPath = null;
  if (pathname === '/' || pathname === '') {
    targetPath = findFile('index.html');
  } else if (pathname === '/maison-azur' || pathname === '/maison-azur.html') {
    targetPath = findFile('maison-azur.html');
  } else if (pathname === '/maison-du-gout' || pathname === '/maison-du-gout.html') {
    targetPath = findFile('maison-du-gout.html');
  } else if (pathname === '/nova-industries' || pathname === '/nova-industries.html') {
    targetPath = findFile('nova-industries.html');
  } else {
    targetPath = findFile(pathname);
  }

  if (targetPath) {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return fs.createReadStream(targetPath).pipe(res);
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>404 - Page non trouvée</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #06080d; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
    .card { padding: 3rem; background: #0f172a; border-radius: 1rem; border: 1px solid #1e293b; max-width: 420px; }
    h1 { color: #38bdf8; font-size: 3rem; margin: 0 0 1rem; }
    p { color: #94a3b8; margin-bottom: 2rem; }
    a { display: inline-block; padding: 0.75rem 1.5rem; background: #0284c7; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>Le concept ou la ressource demandée n'existe pas.</p>
    <a href="/">Retour au portfolio</a>
  </div>
</body>
</html>`);
}

// Export pour Vercel Serverless Function (@vercel/node)
module.exports = handler;

// Mode serveur autonome
if (require.main === module) {
  const port = process.env.PORT || 3000;
  http.createServer(handler).listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
