import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { HOST, PORT } from './config.js';
import { handleApiRequest } from './src/services/apiHandler.js'; 

// Mappatura estensioni 
const MIME_TYPES = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);
    const pathname = url.pathname;

    // --- 1. GESTIONE API ---
    if (pathname.startsWith('/api/')) {
        return await handleApiRequest(pathname, res);
    }

    // --- 2. GESTIONE FILE STATICI ---
    let filePath = join('src', pathname === '/' ? 'index.html' : pathname);
    const ext = extname(filePath);

    try {
        const data = await readFile(filePath);
        const ext = extname(filePath).toLowerCase(); // Usiamo toLowerCase() per sicurezza
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
    } catch (err) {
        // --- 3. LOGICA FALLBACK PER SPA (Client-side Routing) ---
        if (ext) {
            // Se ha un'estensione (es. .jpg) ma non esiste, è un 404 reale
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Risorsa non trovata');
        } else {
            // Se non ha estensione, probabilmente è una rotta del frontend (es. /dashboard)
            try {
                const indexData = await readFile(join('src', 'index.html'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(indexData);
            } catch (errIndex) {
                res.writeHead(500);
                res.end('Errore critico del server');
            }
        }
    }
});

server.listen(PORT, HOST, () => {
    console.log(`🚀 TrasmetaWEB in esecuzione su http://${HOST}:${PORT}/`);
});