let Error404 = {

    render : async () => {
        let view =  /*html*/
        `
<main id="main-content" class="container my-5">

    <section id="about-section" style="display: none;">
        <div class="row">
            <div class="col-md-12">
                <h2 class="border-bottom pb-2">Informazioni sul Progetto</h2>
                <p class="lead">TrasMeta WEB è il sistema di interoperabilità per la gestione dei metadati scientifici.</p>
            </div>
        </div>
    </section>

    <section id="error-404" ">
        <div class="row justify-content-center py-5">
            <div class="col-md-6 text-center">
                <div class="display-1 fw-bold text-danger mb-3">404</div>
                <h2 class="h1 fw-bold mb-3">Pagina non trovata</h2>
                <p class="text-muted mb-4">
                    Spiacenti, la risorsa che stai cercando nel portale 
                    <strong>IZSS</strong> non è disponibile o è stata spostata.
                </p>
                <div class="card bg-light border-0 p-4 mb-4">
                    <p class="small text-uppercase fw-bold text-secondary mb-2">Cosa puoi fare?</p>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <a href="/#/" class="btn btn-primary px-4 shadow" style="background-color: #0066cc; border: none;">
                            Torna alla Home
                        </a>
                        <a href="mailto:trasmeta@izssicilia.it" class="btn btn-outline-dark px-4">
                            Contatta Supporto
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<style>
    .bg-agid { background-color: #0066cc !important; }
    .text-agid { color: #0066cc !important; }
    #main-content section { min-height: 60vh; }
</style>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;