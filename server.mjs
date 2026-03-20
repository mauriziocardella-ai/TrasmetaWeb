import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { HOST, PORT } from './config.js';
import { ApiRest } from './src/services/apirest.js'; 

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

    // --- 1. GESTIONE API (Verso Server REST Firebird) ---
    if (pathname.startsWith('/api/')) {
        const fullPathWithQuery = pathname + url.search; 
        return await ApiRest(fullPathWithQuery, res, req);
    }

    // Nota: Se i tuoi file .json sono in src/data/ o src/json/, 
    // verranno serviti automaticamente dal blocco qui sotto.

    // --- 2. GESTIONE FILE STATICI ---
    let filePath = join('src', pathname === '/' ? 'index.html' : pathname);
    const ext = extname(filePath).toLowerCase();

    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
    } catch (err) {
        // --- 3. LOGICA FALLBACK PER SPA ---
        if (ext) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Risorsa non trovata');
        } else {
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