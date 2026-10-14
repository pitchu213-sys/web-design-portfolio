import { serve } from "bun";
import { join, extname } from "path";

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = join(import.meta.dir, "..");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
};

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Fichiers statiques
    if (
      pathname.startsWith("/css/") ||
      pathname.startsWith("/js/") ||
      pathname.startsWith("/images/") ||
      pathname === "/favicon.ico"
    ) {
      const filePath = join(ROOT_DIR, pathname);
      const file = Bun.file(filePath);
      if (await file.exists()) {
        const ext = extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        return new Response(file, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
      return new Response("Ressource non trouvée", { status: 404 });
    }

    // Routes HTML du portfolio
    let viewFile: string | null = null;
    const cleanPath = pathname.replace(/\/$/, "");

    switch (cleanPath) {
      case "":
      case "/":
        viewFile = join(ROOT_DIR, "index.html");
        break;
      case "/maison-azur":
        viewFile = join(ROOT_DIR, "maison-azur.html");
        break;
      case "/maison-du-gout":
        viewFile = join(ROOT_DIR, "maison-du-gout.html");
        break;
      case "/nova-industries":
        viewFile = join(ROOT_DIR, "nova-industries.html");
        break;
      default:
        viewFile = null;
    }

    if (viewFile) {
      const file = Bun.file(viewFile);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      }
    }

    // Page 404
    return new Response(
      `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Page non trouvée | Portfolio Design</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
    .card { max-width: 480px; padding: 2.5rem; background: #1e293b; border-radius: 1rem; border: 1px solid #334155; }
    h1 { font-size: 3rem; margin: 0 0 1rem; color: #38bdf8; }
    p { color: #94a3b8; line-height: 1.6; margin-bottom: 2rem; }
    a { display: inline-block; padding: 0.75rem 1.5rem; background: #0284c7; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 500; }
    a:hover { background: #0369a1; }
  </style>
</head>
<body>
  <div class="card">
    <h1>404</h1>
    <h2>Page introuvable</h2>
    <p>Le concept ou la ressource demandée n'existe pas ou a été déplacée.</p>
    <a href="/">Retour au portfolio</a>
  </div>
</body>
</html>`,
      {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  },
});

console.log(`✨ Serveur portfolio actif sur http://localhost:${server.port}`);
