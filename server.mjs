import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';


import { HOST, PORT } from './config.js';
const hostname = HOST;
const port = PORT;

const server = createServer(async (req, res) => {
  // Se la richiesta è per la radice, serviamo l'index.html
  let filePath = join('src', req.url === '/' ? 'index.html' : req.url);

  try {
    const data = await readFile(filePath);
    // Impostiamo il Content-Type in base all'estensione del file
    let contentType = 'text/html';
    switch (extname(filePath)) {
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.ico':
        contentType = 'image/x-icon';
        break;
      // Aggiungi altri casi se necessario
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    // Se il file richiesto non viene trovato, controlliamo se l'URL ha un'estensione.
    // Se sì, restituiamo un errore 404, altrimenti serviamo l'index.html per le SPA.
    if (extname(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File non trovato');
    } else {
      try {
        const indexData = await readFile(join('src', 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexData);
      } catch (err2) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File non trovato');
      }
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server in esecuzione su http://${port}:${hostname}/`);
});