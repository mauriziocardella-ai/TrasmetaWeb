/**
 * src/services/utils.js
 * Utility condivise per la gestione dell'URL e del Data Binding (Mapping)
 */

const Utils = { 
    /**
     * Analizza l'URL (hash) e lo scompone in risorsa, id, verbo e parametri query.
     * Esempio: #/radisan/123/edit?codice=MS001
     */
    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        
        // Separiamo il percorso dai parametri di ricerca (?)
        let [path, queryString] = url.split('?');
        
        let r = path.split("/");
        let request = {
            resource    : r[1] || null,
            id          : r[2] || null,
            verb        : r[3] || null,
            params      : {} 
        }

        // Trasformiamo la query string in un oggetto accessibile
        if (queryString) {
            const searchParams = new URLSearchParams(queryString);
            for (let [key, value] of searchParams) {
                request.params[key] = value;
            }
        }

        return request;
    },

    /**
     * Implementazione semplice di una pausa asincrona
     */
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * AUTO-MAPPING: Dal JSON del Database ai Campi HTML
     * Cerca gli elementi per ID (case-insensitive) e ne popola il valore.
     */
    autoMapData: (data, container = document) => {
        if (!data) return;
        
        Object.keys(data).forEach(key => {
            // Cerca ID sia minuscolo che originale (es: codice o CODICE)
            const el = container.querySelector(`#${key.toLowerCase()}`) || container.querySelector(`#${key}`);
            
            if (el) {
                if (el.type === 'checkbox') {
                    el.checked = !!data[key];
                } else if (el.type === 'radio') {
                    // Se è un radio, seleziona quello con il valore corrispondente
                    const radio = container.querySelector(`input[name="${el.name}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    el.value = data[key] ?? '';
                }
            }
        });
    },

    /**
     * GET FORM DATA: Dai Campi HTML al JSON per il salvataggio
     * Estrae i valori da tutti gli input/select/textarea dotati di ID.
     */
    getFormData: (container = document) => {
        const data = {};
        const inputs = container.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.id) {
                // Gestione specifica per i tipi di dati
                if (input.type === 'checkbox') {
                    data[input.id] = input.checked ? 1 : 0; // Standard Firebird per booleani
                } else if (input.type === 'number') {
                    data[input.id] = input.value !== '' ? parseFloat(input.value) : null;
                } else {
                    data[input.id] = input.value.trim();
                }
            }
        });
        
        return data;
    }
}

export default Utils;