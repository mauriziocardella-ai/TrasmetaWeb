const apiRest = {
    get: async (endpoint) => {
        // Chiama il TUO server locale che poi userà il proxy sopra
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
        return await response.json();
    }
};

export default apiRest;