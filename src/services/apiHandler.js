import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function handleApiRequest(pathname, res) {
    // Estraiamo il nome del file dall'URL (es. /api/ordini -> ordini)
    const fileName = pathname.replace('/api/', '');
    
    // Costruiamo il percorso verso la cartella dei dati
    const filePath = join('src', 'data', `${fileName}.json`);

    try {
        const data = await readFile(filePath, 'utf-8');
        
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(data);
        return true; // Indica che la richiesta è stata gestita con successo
    } catch (err) {
        console.error(`Errore: il file ${fileName}.json non esiste.`);
        
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Risorsa '${fileName}' non trovata` }));
        return true;
    }
}