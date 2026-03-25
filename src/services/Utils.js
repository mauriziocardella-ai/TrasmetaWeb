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
     * Popola un <select> e imposta il primo record come default se non specificato.
     */
    populateSelect: (id, data, valField, descField, selectedValue = null, defaultText = null) => {
        const select = document.getElementById(id);
        if (!select || !data || data.length === 0) return;

        // 1. Se selectedValue è null, prendiamo il valore del primo elemento della lista
        const valueToSet = (selectedValue !== null) ? selectedValue : data[0][valField];

        // 2. Genera le opzioni
        let optionsHTML = "";
        
        // Aggiungiamo l'opzione vuota solo se è stato passato un defaultText (es. "-- Seleziona --")
        if (defaultText) {
            optionsHTML += `<option value="">${defaultText}</option>`;
        }

        optionsHTML += data.map(item => {
            const val = item[valField];
            const desc = item[descField];
            const isSelected = (String(val) === String(valueToSet)) ? 'selected' : '';
            
            return `<option value="${val}" ${isSelected}>${val} - ${desc}</option>`;
        }).join('');

        // 3. Inserisce nel DOM
        select.innerHTML = optionsHTML;
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
    getFormData: (container) => {
        const data = {};
        // Seleziona tutti gli elementi di input, select e textarea con un ID
        const elements = container.querySelectorAll('input[id], select[id], textarea[id]');

        elements.forEach(el => {
            const key = el.id;
            const value = el.value;

            // Salviamo il valore principale
            data[key] = value;

            // LOGICA SPECIALE PER SELECT: estraiamo la descrizione
            if (el.tagName === 'SELECT') {
                const selectedOption = el.options[el.selectedIndex];
                // Creiamo una chiave extra, es: codice_intervento_desc
                // Se non c'è nulla di selezionato, mettiamo stringa vuota
                data[`${key}_desc`] = selectedOption ? selectedOption.text : "";
                
                // Opzionale: se vuoi pulire la descrizione (es. togliere il codice iniziale)
                // data[`${key}_label`] = data[`${key}_desc`].split(' - ').pop();
            }
        });

        return data;
    }
}

export default Utils;