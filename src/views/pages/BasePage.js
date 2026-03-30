// src/views/pages/BasePage.js
import jsonManager from '/src/services/json-manager.js';
import messageManager from '/src/services/message-manager.js';

export default class BasePage {
    constructor() {
        this.containerId = 'modulo_container';
    }

    // Metodo comune per mostrare il caricamento
    async withLoading(action) {
        try {
            messageManager.showLoading();
            await action();
        } catch (error) {
            console.error("Errore nel modulo:", error);
            messageManager.error("Errore durante l'operazione.");
        } finally {
            messageManager.hideLoading();
        }
    }

/**
     * Carica risorse in parallelo da una sorgente specifica.
     * @param {Object} resources - Mappa delle risorse { nome: 'url' }
     * @param {Object} manager - Il manager da usare (default: jsonManager)
     */
    async loadResources(resources, manager = jsonManager) {
        const keys = Object.keys(resources);
        // Usiamo il manager passato (jsonManager o apiRest)
        const promises = keys.map(key => manager.get(resources[key]));
        const results = await Promise.all(promises);
        
        return keys.reduce((acc, key, i) => {
            acc[key] = results[i];
            return acc;
        }, {});
    }
}