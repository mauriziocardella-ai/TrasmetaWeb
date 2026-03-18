 import crypto from 'node:crypto';
 import { REST_API_URL, DB_SECRET_KEY } from './config.js';

 let WY_REST = {
    testHealth : async () => {
        console.log("dentro")

    const secretKeyStr = 'D9F1E4A8C76B4F3D92A3FCBB128EF001';
    const url = 'http://10.254.254.65:16384/api/health';
    const path = '/api/health';
    const method = 'GET';
    
    // 1. Timestamp
    const timestamp = new Date().toISOString();
    
    // 2. Stringa da firmare
    const dataToSign = `${timestamp}|${method}|${path}|`;

    // 3. Calcolo HMAC-SHA256 (Web Crypto API è asincrona)
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKeyStr);
    const msgData = encoder.encode(dataToSign);

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    
    const signatureBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
    
    // Converti buffer in stringa Hex
    const signature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    // 4. Esegui la Fetch
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'X-Timestamp': timestamp,
                'X-Signature': signature
            }
        });
        const result = await response.json();
        console.log('Risposta Server:', result);
    } catch (error) {
        console.error('Errore nella chiamata:', error);
    }
}


//testHealth();
}
export default WY_REST;