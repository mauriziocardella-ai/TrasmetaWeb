Script Pre-request per Postman 

// 1. Definisci la chiave segreta
const secretKey = "D9F1E4A8C76B4F3D92A3FCBB128EF001";

// 2. Genera il Timestamp DINAMICO in formato ISO 8601
const timestamp = new Date().toISOString(); 

// 3. Estrai Metodo, Path e Body dalla richiesta Postman
const method = pm.request.method.toUpperCase();
const path = pm.request.url.getPath();
let body = pm.request.body ? pm.request.body.toString() : "";

// 4. Costruisci la stringa da firmare
const dataToSign = `${timestamp}|${method}|${path}|${body}`;

// 5. Calcola l'HMAC-SHA256
const signature = CryptoJS.HmacSHA256(dataToSign, secretKey).toString(CryptoJS.enc.Hex);

// 6. Imposta gli header automaticamente
pm.request.headers.add({ key: 'X-Timestamp', value: timestamp });
pm.request.headers.add({ key: 'X-Signature', value: signature });


Esempio in JavaScript / Node.js


const crypto = require('crypto');
const axios = require('axios');

const SECRET_KEY = 'D9F1E4A8C76B4F3D92A3FCBB128EF001';
const BASE_URL = 'http://10.254.254.65:16384'; // Cambia con l'IP del server

async function makeAuthenticatedRequest(method, path, bodyObj = null) {
    // Genero il timestamp al momento esatto della chiamata
    const timestamp = new Date().toISOString(); 
    const bodyStr = bodyObj ? JSON.stringify(bodyObj) : '';
    
    // Costruisco la stringa: Timestamp|Metodo|Path|Body
    const dataToSign = `${timestamp}|${method.toUpperCase()}|${path}|${bodyStr}`;
    
    // Calcolo HMAC-SHA256
    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(dataToSign)
        .digest('hex');

    // Configuro e invio la chiamata Axios
    const config = {
        method: method,
        url: `${BASE_URL}${path}`,
        headers: {
            'X-Timestamp': timestamp,
            'X-Signature': signature,
            'Content-Type': 'application/json'
        },
        data: bodyStr
    };

    try {
        const response = await axios(config);
        console.log('Risposta OK:', response.data);
    } catch (error) {
        console.error('Errore:', error.response ? error.response.data : error.message);
    }
}

