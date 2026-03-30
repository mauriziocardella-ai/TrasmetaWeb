import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apiRest } from './api-proxy.js';
import { HOST, PORT } from './config.js';

// ✅ Corretta definizione della root del progetto
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;

    // 1. LOG DI DEBUG (Fondamentale per capire cosa chiede il browser)
    console.log(`📩 Richiesta: ${pathname}`);

    // 2. GESTIONE API
    if (pathname.startsWith('/api/')) {
        try {
            const cleanPath = req.url.replace('/api/', '');
            return await apiRest(cleanPath, res, req);
        } catch (e) {
            res.writeHead(500);
            return res.end(JSON.stringify({ error: "Errore interno Proxy" }));
        }
    }

    // 3. GESTIONE FILE STATICI
    // Se la richiesta è "/", serviamo index.html
    let relativePath = pathname === '/' ? '/index.html' : pathname;

    // Costruiamo il percorso assoluto unendo la root al percorso richiesto
    const filePath = join(__dirname, relativePath);
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
        const content = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        // Se il file non esiste, proviamo il fallback SPA (index.html)
        if (error.code === 'ENOENT') {
            console.warn(`⚠️ File non trovato: ${filePath} -> Provo fallback index.html`);
            try {
                const index = await readFile(join(__dirname, 'index.html'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(index);
            } catch (err) {
                console.error("❌ ERRORE CRITICO: index.html non trovato nella root!");
                res.writeHead(500);
                return res.end("Errore: index.html mancante.");
            }
        }
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
    }
});

server.listen(PORT, HOST, () => {
    console.log(`
    🚀 TRASMETAWEB ONLINE
    🌍 URL: http://${HOST}:${PORT}
    📂 Root: ${__dirname}
    -----------------------`);
});