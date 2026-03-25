import Utils from '/src/services/utils.js';
import jsonManager from '/src/services/json-manager.js';
import messageManager from '/src/services/message-manager.js';

let scheda = {
    render: async () => {
        return /*html*/`
            <div id="modulo_container" class="container mt-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-8">
                                <label for="codice_intervento" class="form-label fw-bold">Intervento</label>
                                <select id="codice_intervento" class="form-select">
                                    <option value="">Caricamento lista...</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <label class="form-label">Note Operative</label>
                                <input type="text" id="note_interv" class="form-control">
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-8">
                                <label for="codice_matrice" class="form-label fw-bold">Matrici</label>
                                <select id="codice_matrice" class="form-select">
                                    <option value="">Caricamento lista...</option>
                                </select>
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

            // Carichiamo i vari JSON (o chiamate API)
            const [interventi, matrici] = await Promise.all([
                jsonManager.get('/src/json/interventi.json'),
                jsonManager.get('/src/json/matrici.json')
            ]);

            // 1. Popoliamo tutti i dropdown usando la funzione generale
            Utils.populateSelect('codice_intervento', interventi, 'codice_intervento', 'descrizione');
            Utils.populateSelect('codice_matrice', matrici, 'codice_matrice', 'descrizione');


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