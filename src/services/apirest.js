import crypto from 'node:crypto';
import { REST_API_URL, 
         DB_SECRET_KEY } from '../../config.js';

export async function ApiRest(pathname, res, req) {
    const resource = pathname.replace('/api/', '');
    const targetUrl = `${REST_API_URL}/${resource}`;
    const method = req.method;
    const path = `/api/${resource}`; // Il path che il server REST si aspetta di verificare

    try {
        // 1. Generazione Timestamp
        const timestamp = new Date().toISOString();

        // 2. Creazione della firma HMAC-SHA256 (Versione Node.js)
        const dataToSign = `${timestamp}|${method}|${path}|`;
        const signature = crypto
            .createHmac('sha256', DB_SECRET_KEY)
            .update(dataToSign)
            .digest('hex');

        // 3. Eseguiamo la fetch dal server Node al server REST
        console.log (targetUrl);
        const response = await fetch(targetUrl, {
            method: method,
            headers: {
                'X-Timestamp': timestamp,
                'X-Signature': signature,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // 4. Risposta al frontend con Header CORS
        res.writeHead(response.status, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Timestamp, X-Signature'
        });

        return res.end(JSON.stringify(data));

    } catch (err) {
        console.error("❌ Errore durante la firma o la chiamata:", err.message);
        res.writeHead(502);
        return res.end(JSON.stringify({ error: "Errore di comunicazione col server REST" }));
    }
}