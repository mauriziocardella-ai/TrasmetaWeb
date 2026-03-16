// Estraiamo e formattiamo le variabili dal sistema
export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT, 10) || 5000;

// Log di controllo (opzionale, utile in fase di sviluppo)
console.log(`Configurazione caricata: ${HOST}:${PORT}`);