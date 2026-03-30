import Utils from '/src/services/utils.js';
import jsonManager from '/src/services/json-manager.js';

import BasePage from '../BasePage.js';

export default class scheda extends BasePage {
    async render() {
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
    };

    async after_render() {
        await this.withLoading(async () => {
            // 1. Carichiamo le tabelle di decodifica (fisse) dai JSON locali
            const tabelle = await this.loadResources({
                interventi: '/src/json/interventi.json',
                matrici: '/src/json/matrici.json'
            }, jsonManager);


            // 3. Salviamo tutto nel 'this' per averlo a disposizione
            this.interventi = tabelle.interventi;
            this.matrici = tabelle.matrici;

            // 4. Popoliamo
            Utils.populateSelect('codice_intervento', this.interventi, 'codice_intervento', 'descrizione');
            Utils.populateSelect('codice_matrice', this.matrici, 'codice_matrice', 'descrizione');
        });
    }
};
