/**
 * TRASMETAWEB - Router Centrale (SPA)
 * Gestisce il caricamento dinamico dei componenti e delle pagine 
 * basandosi sull'hash dell'URL.
 */

// Import delle Viste (Pages)
import Home from './views/pages/Home.js';
import Error404 from './views/pages/Error404.js';

// Import Moduli Specifici (Radisan)
import Mod1 from './views/pages/radisan/Mod1.js';
import Scheda from './views/pages/radisan/scheda.js';

// Import Componenti UI
import Navbar from './views/components/Navbar.js';
import Bottombar from './views/components/Bottombar.js';

// Import Servizi
import Utils from './services/Utils.js';

/**
 * Mappa delle rotte supportate.
 * Associa un percorso URL al modulo JS corrispondente.
 */
const routes = {
    '/': Home,
    '/mod1': Mod1,   // Accessibile via #/mod1
    '/element': Mod1,    // Aggiunto per supportare la rotta #/element?codice=...
    '/scheda': Scheda
};

/**
 * Funzione principale del Router.
 * Orchestra il rendering di Header, Footer e del contenuto variabile.
 */
const router = async () => {

    // Riferimenti ai contenitori DOM definiti in index.html
    const header = document.getElementById('header_container');
    const content = document.getElementById('page_container');
    const footer = document.getElementById('footer_container');

    // Rendering dei componenti statici (Header e Footer)
    // Nota: after_render() gestisce l'attivazione di listener o animazioni
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();

    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();

    // Analisi dell'URL corrente tramite Utils
    // Esempio: #/element?codice=MS.000.001 -> { resource: 'element', params: { codice: '...' } }
    let request = Utils.parseRequestURL();

    /**
     * Ricostruzione del percorso per il matching con l'oggetto 'routes'.
     * Gestisce i tre livelli: /risorsa /:id /verbo
     */
    let parsedURL = (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    // Selezione della pagina corretta o fallback su 404
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    // Rendering del contenuto principale della pagina
    content.innerHTML = await page.render();

    /**
     * Esecuzione della logica post-caricamento.
     * È qui che Mod1.js leggerà i parametri da Utils.parseRequestURL() 
     * per avviare la chiamata REST verso il Proxy Node.
     */
    await page.after_render();
};

// Listener per il cambio dell'hash (navigazione tra pagine)
window.addEventListener('hashchange', router);

// Listener per il caricamento iniziale della pagina
window.addEventListener('load', router);