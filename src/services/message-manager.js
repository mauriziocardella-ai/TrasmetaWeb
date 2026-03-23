/**
 * Gestore messaggi centralizzato per TrasmetaWEB
 */
const messageManager = {
    /**
     * Mostra un messaggio a video
     * @param {string} message - Il testo da mostrare
     * @param {string} type - 'success', 'danger' (error), 'warning', 'info'
     * @param {number} duration - Durata in millisecondi (default 5000)
     */
    show: (message, type = 'info', duration = 5000) => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        // Crea l'ID univoco per il toast
        const id = 'toast-' + Date.now();

        // Mappatura icone Bootstrap per tipo
        const icons = {
            success: 'check-circle-fill',
            danger: 'exclamation-triangle-fill',
            warning: 'exclamation-circle-fill',
            info: 'info-circle-fill'
        };

        // Template HTML del Toast (stile AgID/Bootstrap)
        const toastHTML = `
            <div id="${id}" class="toast align-items-center text-white bg-${type} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center">
                        <i class="bi bi-${icons[type]} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        // Inserisce il toast nel contenitore
        container.insertAdjacentHTML('beforeend', toastHTML);

        // Inizializza e mostra il toast usando l'oggetto bootstrap (già presente nel progetto)
        const toastElement = document.getElementById(id);
        const bsToast = new bootstrap.Toast(toastElement, { delay: duration });
        bsToast.show();

        // Rimuove l'elemento dal DOM dopo che è sparito per non appesantire la pagina
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    },

    // Metodi scorciatoia (shorthands)
    success: (msg) => messageManager.show(msg, 'success'),
    error: (msg) => messageManager.show(msg, 'danger'),
    warn: (msg) => messageManager.show(msg, 'warning'),
    info: (msg) => messageManager.show(msg, 'info')
}

export default messageManager;