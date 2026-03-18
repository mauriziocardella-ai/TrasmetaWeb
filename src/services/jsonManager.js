// services/jsonManager.js

/**
 * Recupera JSON tramite fetch. 
 * Funziona sia per URL esterni che per file locali al progetto (se serviti da un web server)
 */
export async function getJson(path) {
    // Se siamo nel browser, assicuriamoci che il path sia relativo alla root
    const url = path.startsWith('http') ? path : window.location.origin + path;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`❌ Errore fetch su ${url}:`, error.message);
        return null;
    }
}