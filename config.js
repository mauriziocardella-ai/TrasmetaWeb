// Verifica se siamo in Node.js o nel Browser
const isNode = typeof process !== 'undefined' && process.env;

// Estraiamo e formattiamo le variabili dal sistema
export const HOST = isNode ? (process.env.HOST || 'localhost') : 'localhost';

// Se siamo su Node, prendi PORT dal .env. Se siamo nel browser, usa 5000.
export const PORT = (typeof process !== 'undefined') 
    ? parseInt(process.env.PORT, 10) || 5000 
    : 5000;

// Il Server Node punta a Firebird, il Browser punta al tuo Proxy (/api)
export const REST_API_URL = isNode 
    ? process.env.REST_API_URL 
    : '/api';

// La chiave segreta: Fondamentale per la sicurezza!
export const DB_SECRET_KEY = (typeof process !== 'undefined') 
    ? process.env.DB_SECRET_KEY 
    : null; // <-- Nel browser sarà SEMPRE null. Sicurezza garantita.

// Log di controllo: utile ma occhio che apparirà anche nella console del browser!
if (isNode) {
    console.log(`📡 Backend Config: ${HOST}:${PORT}`);
}