import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { HOST, PORT } from './config.js';

const hostname = HOST;
const port = PORT;

const server = createServer(async (req, res) => {
    // 1. GESTIONE API (Richieste dati per il Router)
    // Se l'URL inizia con /api, non cerchiamo file in /src ma rispondiamo con i dati
    if (req.url.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Permette al frontend di comunicare col backend

        if (req.url === '/api/test-data') {
            try {
                // Qui per ora leggiamo il JSON, in futuro qui metteremo Firebird
                const data = await readFile('./src/data/test-data.json', 'utf-8');
                res.writeHead(200);
                res.end(data);
                return; 
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Errore nel recupero dati" }));
                return;
            }
        }
    }

    // 2. GESTIONE FILE STATICI (Frontend)
    let filePath = join('src', req.url === '/' ? 'index.html' : req.url);

    try {
        const data = await readFile(filePath);
        
        // Mappatura estensioni -> Content-Type
        const map = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
        };

        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': map[ext] || 'text/html' });
        res.end(data);

    } catch (err) {
        // 3. LOGICA FALLBACK PER SPA
        // Se il file non esiste e non ha estensione (es. /mod1), serviamo index.html
        if (extname(filePath)) {
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

server.listen(port, hostname, () => {
    console.log(`🚀 Server in esecuzione su http://${hostname}:${port}/`);
});