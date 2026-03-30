export default class Bottombar {
    async render() {
        /*html*/
        return `
        <footer class="py-5 mt-5" style="background-color: #003366 !important; color: white !important;">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mb-4 text-center text-md-start">
                        <div class="mb-3">
                            <img src="/src/assets/img/logo-izs-sicilia.png" 
                                 alt="Logo IZS Sicilia" 
                                 style="max-height: 90px; width: auto; display: block;">
                        </div>
                        <p class="small mb-0">Via Marinuzzi, 3 - 90129 Palermo</p>
                        <p class="small">Codice fiscale: 00112740824</p>
                    </div>

                    <div class="col-md-3 mb-4">
                        <h6 class="text-uppercase fw-bold mb-3">Link Utili</h6>
                        <ul class="list-unstyled">
                            <li><a href="https://amministrazione-trasparente.izssicilia.it" target="_blank" class="text-white-50 text-decoration-none small hover-white">Amministrazione Trasparente</a></li>
                            <li><a href="#" class="text-white-50 text-decoration-none small hover-white">Albo Pretorio</a></li>
                            <li><a href="https://amministrazione-trasparente.izssicilia.it/dati-ulteriori/privacy" target="_blank" class="text-white-50 text-decoration-none small hover-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div class="col-md-3 mb-4">
                        <h6 class="text-uppercase fw-bold mb-3">Contatti</h6>
                        <ul class="list-unstyled small text-white-50">
                            <li class="mb-2"><i class="bi bi-envelope-at me-2"></i> protocollogenerale.izssicilia@legalmail.it</li>
                            <li><i class="bi bi-telephone me-2"></i> +39 091 6565 111</li>
                        </ul>
                    </div>
                </div>

                <hr class="my-4 border-white-50">

                <div class="row align-items-center">
                    <div class="col-md-12 text-center">
                        <p class="small mb-0 text-white-50">&copy; 2026 TrasMeta WEB - IZS Sicilia</p>
                    </div>
                </div>
            </div>
            
            <style>
                /* Effetto hover per i link del footer */
                .hover-white:hover {
                    color: white !important;
                    transition: 0.3s;
                }
            </style>
        </footer>
        `

    }

    /**
     * Logica post-rendering (es. inizializzazione tooltips o listener)
     */
    async after_render() {} 
}
