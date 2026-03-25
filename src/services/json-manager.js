/**
 * Gestore JSON centralizzato
 */
const jsonManager = {
    /**
     * Recupera JSON tramite fetch. 
     */
    get: async (path) => {
        // Gestione URL (root-relative)
        const url = path.startsWith('http') ? path : window.location.origin + path;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            
            // Restituisce direttamente l'oggetto JSON
            return await response.json();
        } catch (error) {
            console.error(`❌ Errore jsonManager su ${url}:`, error.message);
            return null;
        }
    }
};

// Esportazione di default per poter usare: import jsonManager from '...'
export default jsonManager;