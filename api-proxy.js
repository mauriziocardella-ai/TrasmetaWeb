// /server/api-proxy.js
import crypto from 'node:crypto';

import { REST_API_URL, DB_SECRET_KEY } from './config.js'; 

export async function apiRest(pathname, res, req) {
    // pathname arriva già pulito dal server.mjs (es: "get-pratica?id=502")
    const resource = pathname.startsWith('/') ? pathname : `/${pathname}`;

    // Costruzione URL target verso Firebird
    const baseUrl = new URL(REST_API_URL);
    const targetUrl = new URL(resource.substring(1), baseUrl).href; 

    const method = req.method;

    console.log(`📡 Proxy: ${method} -> ${targetUrl}`);

    try {
        const timestamp = new Date().toISOString();

        // 🔐 Generazione firma HMAC-SHA256
        // Assicurati che signaturePath inizi con / se il server Firebird lo richiede
        const signaturePath = resource; 
        const dataToSign = `${timestamp}|${method}|${signaturePath}|`;
        
        const signature = crypto
            .createHmac('sha256', DB_SECRET_KEY)
            .update(dataToSign)
            .digest('hex');

        // Lettura asincrona del body (se presente)
        let bodyString = null;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            if (buffers.length > 0) {
                bodyString = Buffer.concat(buffers).toString();
            }
        }

        const fetchOptions = {
            method: method,
            headers: {
                'X-Timestamp': timestamp,
                'X-Signature': signature,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (bodyString) {
            fetchOptions.body = bodyString;
        }

        // Esecuzione chiamata reale al server Firebird
        const response = await fetch(targetUrl, fetchOptions);

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { message: text };
        }

        // 📤 Risposta al tuo Frontend (SPA)
        res.writeHead(response.status, {
            'Content-Type': 'application/json',
            // CORS non strettamente necessario se chiami lo stesso dominio, ma utile per test
            'Access-Control-Allow-Origin': '*' 
        });

        return res.end(JSON.stringify(data));

    } catch (err) {
        console.error("❌ Errore Proxy:", err.message);
        res.writeHead(502);
        return res.end(JSON.stringify({
            error: true,
            message: "Errore di comunicazione col server Firebird",
            detail: err.message
        }));
    }
}