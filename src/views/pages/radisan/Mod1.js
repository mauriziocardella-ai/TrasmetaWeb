import Mod1_Detail from './Mod1_Detail.js'

// server.mjs
import { getJson } from '../../../services/jsonManager.js';

let Mod1 = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> Modello 1 </h1>
                
                <button id="btn-azione" class="btn btn-primary px-4 shadow" style="background-color: #0066cc; border: none;">
                    List
                </button>

                <div id="mod1_page_container" class="container pageEntry" style="margin-top: 2rem;">
                    <article> Attendere il caricamento...</article>
                </div>
            </section>
        `
        
        return view
    },
    after_render: async () => {
        const btn = document.getElementById('btn-azione');
        const container = document.getElementById('mod1_page_container'); // Corretto ID con underscore

        if(btn && container) {
            btn.addEventListener('click', async () => {            
                // 1. Preleviamo i dati (il percorso è relativo alla index.html o assoluto)
                const dati = await getJson('http://localhost:5000/api/test-data');
                if (dati) {
                    console.log("Progetto locale:", dati.data.progetto);
                    console.log("Caricamento Mod1_Detail...");

                    // Renderizziamo il dettaglio dentro il container
                    container.innerHTML = await Mod1_Detail.render(dati);
                    
                    // Se Mod1_Detail ha un suo after_render:
                    if (Mod1_Detail.after_render) {
                        await Mod1_Detail.after_render();
                    }
                }

            });
        }
    }
}

export default Mod1;