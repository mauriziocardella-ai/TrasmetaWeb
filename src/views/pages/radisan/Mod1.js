import Mod1_Detail from './Mod1_Detail.js'
import modREST from './modREST.js';
// server.mjs

import jsonManager from '/src/services/json-manager.js';
import messageManager from '/src/services/message-manager.js';


import BasePage from '../BasePage.js';
export default class Mod1 extends BasePage {
    async render() {
        return `
            <section class="section">
                <h1> Modello 1 </h1>
                
                <button id="btn-json" class="btn btn-primary px-4 shadow" style="background-color: #0066cc; border: none;">
                    List JSON File
                </button>
                <button id="btn-rest" class="btn btn-primary px-4 shadow" style="background-color: #0066cc; border: none;">
                    API Rest
                </button>

                <div id="mod1_page_container" class="container pageEntry" style="margin-top: 2rem;">
                    <article> Attendere il caricamento...</article>
                </div>
            </section>
        `
    }
    async after_render() {
        const btn_json = document.getElementById('btn-json');
        const btn_rest = document.getElementById('btn-rest');
        const container = document.getElementById('mod1_page_container');



        // GESTIONE JSON LOCALE
        if (btn_json && container) {
            btn_json.addEventListener('click', async () => {
                console.log("Richiesta file JSON locale via jsonManager...");

                const tabelle = await this.loadResources({
                    utenti: '/src/json/test-data.json'
                }, jsonManager);

                container.innerHTML = await Mod1_Detail.render(tabelle.utenti);
 
                //container.innerHTML = `<p style="color:red">Errore nel caricamento del file JSON locale.</p>`;
            })
            
        }


        if (btn_rest && container) {
            btn_rest.addEventListener('click', async () => {
                console.log("btn-rest");
                try {
                    // Questo funziona già bene perché passa dal tuo Proxy HMAC nel server.mjs
                    //const response = await fetch('/api/element?codice=MS.000.001'); 
                    const response = await fetch('/api/element?codice=MS.000.100');
                    const data = await response.json();

                    // Assicurati che modREST.render accetti la stringa data.status
                    if (!response.ok || data.error) {
                        // ✅ Qui document esiste ed è corretto usare il manager
                        messageManager.error(data.message || "Errore durante la richiesta");
                        return;
                    }

                    messageManager.success("Server Firebird Online!");
                    container.innerHTML = await modREST.render(data);
                    if (modREST.after_render) {
                        await modREST.after_render();
                    }
                } catch (err) {
                    messageManager.error('Errore durante il recupero dello stato REST:', err);
                }
            });
        }
    }
}