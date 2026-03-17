import PDF from '../../../services/PDF.js'
import WY_REST from '../../../services/WY_trassmetarest.js'

let Home = {
    render : async () => {
        let view =  /*html*/`
            <section id="home-section">
                <div class="p-5 mb-4 bg-light rounded-3 border shadow-sm">
                    <div class="container-fluid py-5">
                        <h1 class="display-5 fw-bold text-agid">Benvenuti in TrasMeta WEB</h1>
                        <p class="col-md-8 fs-4 text-muted">Portale gestionale dell'Istituto Zooprofilattico Sperimentale della Sicilia.</p>
                        <hr class="my-4">
                        <p>Utilizza la navigazione per accedere ai servizi e ai dati della piattaforma.</p>
                    </div>
                </div>
            </section>
            <button id="btn-PDF" class="button is-primary" style="margin-top: 1rem;">
                Stampa PDF
            </button>
            <button id="btn-REST" class="button is-primary" style="margin-top: 1rem;">
                REST
            </button>
        `
        return view
    },
    after_render: async () => {
        const btn = document.getElementById('btn-PDF');

        btn.addEventListener('click', async () => {
            // 1. Seleziona l'elemento HTML che vuoi trasformare
            const elemento = document.getElementById('home-section');

            PDF.open_browser(elemento)

        })

        const btn_REST = document.getElementById('btn-REST');

        btn_REST.addEventListener('click', async () => {
            // 1. Seleziona l'elemento HTML che vuoi trasformare
            console.log("btn-rest")
            WY_REST.testHealth();

        })

    } 
}

export default Home;