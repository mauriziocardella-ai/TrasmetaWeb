const apiRest = {
    get: async (endpoint) => {
        // Chiama il TUO server locale che poi userà il proxy sopra
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
        return await response.json();
    },
    post: async (endpoint, data) => {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.message || errData.error || response.statusText;
            throw new Error(`Errore API (${response.status}): ${errMsg}`);
        }
        return await response.json();
    },
    put: async (endpoint, data) => {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
        return await response.json();
    },
    delete: async (endpoint) => {
        const response = await fetch(`/api/${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Errore API: ${response.status}`);
        return await response.json();
    }
};

export default apiRest;