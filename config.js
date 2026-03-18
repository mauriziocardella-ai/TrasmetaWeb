// Estraiamo e formattiamo le variabili dal sistema
export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT, 10) || 5000;
export const REST_API_URL = process.env.REST_API_URL;
export const DB_SECRET_KEY = process.env.DB_SECRET_KEY;

// Log di controllo (opzionale, utile in fase di sviluppo)
console.log(`Configurazione caricata: ${HOST}:${PORT}`);