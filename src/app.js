//pages
import Home         from './views/pages/Home.js'
import Error404     from './views/pages/Error404.js'

//pages/radisan
import Mod1         from './views/pages/radisan/Mod1.js'

//component
import Navbar       from './views/components/Navbar.js'
import Bottombar    from './views/components/Bottombar.js' 

//services
import Utils        from './services/Utils.js'

// Elenco delle rotte supportate (hash). Qualsiasi URL diverso da queste rotte restituirà un errore 404
const routes = {
    '/'      : Home
    ,'/mod1' : Mod1
};


// Il codice del router. 
// Prende un URL, lo confronta con l'elenco delle rotte supportate e quindi renderizza la pagina di contenuto corrispondente
const router = async () => {

    // Carica l'elemento della pagina solo al momento dell'uso
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    // Render header e footer della pagina
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();


    // Ottieni l'URL analizzato (o parsato) dalla barra degli indirizzi
    let request = Utils.parseRequestURL()

    // Analizza l'URL e, se contiene una parte relativa all'ID, sostituiscila con la stringa ':id
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Recupera la pagina dall'elenco delle rotte supportate
    // Se l'URL analizzato non è nella lista di rotte supportate, seleziona invece la pagina 404
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
