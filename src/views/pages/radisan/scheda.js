import Utils from '/src/services/utils.js';
import { getJson } from '/src/services/json-manager.js';
import messageManager from '/src/services/message-manager.js';

let scheda = {
    render: async () => {
        return /*html*/`
            <div id="modulo_container" class="container mt-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-8">
                                <label for="codice_intervento" class="form-label fw-bold">Intervento Radisan</label>
                                <select id="codice_intervento" class="form-select">
                                    <option value="">Caricamento lista...</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <label class="form-label">Note Operative</label>
                                <input type="text" id="note_interv" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                <div class="col-12 text-end">
                    <button id="btn_test_get" class="btn btn-warning">
                        <i class="bi bi-bug me-2"></i>Test GetFormData
                    </button>
                    <button id="btn_salva" class="btn btn-primary ms-2">
                        <i class="bi bi-save me-2"></i>Salva Pratica
                    </button>
                </div>
            </div>
            </div>
        `;
    },

    after_render: async () => {
        const container = document.getElementById('modulo_container');
        const selectElement = document.getElementById('codice_intervento');

        try {
            messageManager.showLoading();

            // 1. CARICAMENTO DELLA LISTA (I dati per popolare le <option>)
            const responseList = await getJson('/src/json/test2.json');
            const listaElementi = await responseList;

            // Popoliamo il dropdown
            let htmlOptions = '<option value="">-- Seleziona --</option>';
            listaElementi.forEach(item => {
                htmlOptions += `<option value="${item.codice}">${item.codice} - ${item.descrizione}</option>`;
            });
            selectElement.innerHTML = htmlOptions;

            // 2. CARICAMENTO DEL RECORD (I dati da visualizzare nel form)
            // Supponiamo che il server restituisca: { "codice_intervento": "MS.001", "note_interv": "Urgenza" }
            const recordAttuale = { 
                "codice_intervento": "MS.001", 
                "note_interv": "Verifica periodica" 
            };

            /**
             * USARE AUTOMAPDATA QUI:
             * Poiché il dropdown ora ha le sue <option>, autoMapData troverà l'id 
             * 'codice_intervento', vedrà che il valore è 'MS.001' e lo selezionerà.
             */
            Utils.autoMapData(recordAttuale, container);

        } catch (error) {
            console.error(error);
            messageManager.error("Errore nel mapping dei dati.");
        } finally {
            messageManager.hideLoading();
        }
        // Listener per il test
        const btnTest = document.getElementById('btn_test_get');
        btnTest.onclick = () => {
            // 1. Chiamiamo la nostra funzione utility
            const datiRaccolti = Utils.getFormData(container);

            // 2. Feedback visivo
            console.log("🚀 Dati estratti dal form:");
            console.table(datiRaccolti); 

            // 3. Mostriamo un messaggio all'utente usando il tuo messageManager
            const numeroCampi = Object.keys(datiRaccolti).length;
            messageManager.info(`Ho raccolto ${numeroCampi} campi. Controlla la console (F12)!`);
        };
    }
};

export default scheda;