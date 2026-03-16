// services/jsonManager.js

/**
 * Recupera JSON tramite fetch. 
 * Funziona sia per URL esterni che per file locali al progetto (se serviti da un web server)
 */
export async function getJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`❌ Errore nel recupero del JSON:`, error.message);
        return null;
    }
}