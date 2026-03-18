import PDF from '../../../services/PDF.js';

let Mod1_Detail = {
    render : async (jsonData) => {
        console.log(jsonData);
        const utenti = jsonData.data.utenti_attivi || [];
        let view =  /*html*/`
              <button id="btn-print" type="button" class="btn btn-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                </svg>
                Stampa
              </button>
            <section id="print-section">
                <div class="container my-5">
                    <h1 class="h2 border-bottom pb-2">Modulo Radisan - Gestione Utenti</h1>
                    <div class="table-responsive mt-4">
                        <table class="table table-hover">
                            <thead>
                                <tr class="text-uppercase small">
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Ruolo</th>
                                    <th class="text-end">Stato</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${utenti.map(user => `
                                    <tr>
                                        <td>${user.id}</td>
                                        <td><span class="text-primary fw-bold">${user.nome}</span></td>
                                        <td>${user.ruolo}</td>
                                        <td class="text-end">
                                            <span class="badge bg-success">Attivo</span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `
        return view
    },
    after_render: async () => {
                const btn = document.getElementById('btn-print');
        
                btn.addEventListener('click', async () => {
                    // 1. Seleziona l'elemento HTML che vuoi trasformare
                    const elemento = document.getElementById('print-section');
        
                    PDF.open_browser(elemento)
        
                })
    }
        
}

export default Mod1_Detail;