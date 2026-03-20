import crypto from 'node:crypto';
import { REST_API_URL, DB_SECRET_KEY } from '../../config.js';

export async function ApiRest(pathname, res, req) {
    // 1. CORREZIONE REGEX: Togliamo le virgolette per farla diventare una vera Regex
    // Da "/api/element?codice=123" otteniamo "element?codice=123"
    const resource = pathname;

    // 2. COSTRUZIONE URL: Usiamo baseUrl definito correttamente
    const baseUrl = new URL(REST_API_URL);
    const targetUrl = new URL(resource, baseUrl).href;

    const method = req.method;

    // 3. PATH PER FIRMA: Il server REST solitamente vuole il path relativo pulito
    // Es: "/element?codice=MS.000.001"
    const signaturePath = resource; 

    console.log(`📡 Chiamata Proxy: ${method} ${targetUrl}`);

    try {
        const timestamp = new Date().toISOString();

        // Generazione firma HMAC-SHA256
        const dataToSign = `${timestamp}|${method}|${signaturePath}|`;
        const signature = crypto
            .createHmac('sha256', DB_SECRET_KEY)
            .update(dataToSign)
            .digest('hex');

        // Esecuzione fetch
        const response = await fetch(targetUrl, {
            method: method,
            headers: {
                'X-Timestamp': timestamp,
                'X-Signature': signature,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(`✅ Risposta ricevuta dal server remoto!`);
        console.log(`📊 Status Code: ${response.status}`);
        console.log(`🔗 URL chiamato: ${targetUrl}`);

        // Gestione risposta (testo per sicurezza, poi JSON)
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { message: text };
        }

        // Risposta al frontend
        res.writeHead(response.status, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Timestamp, X-Signature'
        });

        return res.end(JSON.stringify(data));

    } catch (err) {
        console.error("❌ Errore durante la chiamata REST:", err.message);
        res.writeHead(502);
        return res.end(JSON.stringify({
            error: true,
            message: "Errore di comunicazione col server REST",
            detail: err.message 
        }));
    }
}