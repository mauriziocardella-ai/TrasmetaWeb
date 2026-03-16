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
        `
        return view
    },
    after_render: async () => {
        const btn = document.getElementById('btn-PDF');

        btn.addEventListener('click', async () => {
            // 1. Seleziona l'elemento HTML che vuoi trasformare
            const elemento = document.getElementById('home-section');

            // 2. Configura le opzioni (opzionale)
            const opzioni = {
                margin:       10,
                filename:     'documento_trasmeta.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 }, // Maggiore è il numero, migliore è la risoluzione
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // 3. Genera e scarica il file
            //html2pdf().set(opzioni).from(elemento).save();
            // Generiamo il PDF ma non lo salviamo
            html2pdf().set(opzioni).from(elemento).outputPdf('blob').then(function(blob) {
                // Creiamo un URL temporaneo per il file generato
                const url = URL.createObjectURL(blob);
                
                // Lo apriamo in una nuova scheda del browser
                window.open(url, '_blank');
            });
        })
    } 
}

export default Home;