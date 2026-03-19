import PDF from '../../../services/PDF.js'

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
        `
        return view
    },
    after_render: async () => {} 
}

export default Home;