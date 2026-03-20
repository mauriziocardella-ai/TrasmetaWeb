const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id, verb and query params
    // --------------------------------
    parseRequestURL : () => {
        // Prendiamo l'hash (es: #/element?codice=MS.000.001)
        let url = location.hash.slice(1).toLowerCase() || '/';
        
        // Separiamo il percorso dai parametri di ricerca (?)
        let [path, queryString] = url.split('?');
        
        let r = path.split("/");
        let request = {
            resource    : r[1] || null,
            id          : r[2] || null,
            verb        : r[3] || null,
            params      : {} // Nuovo oggetto per i parametri ?chiave=valore
        }

        // Se esistono parametri dopo il ?, li trasformiamo in un oggetto
        if (queryString) {
            const searchParams = new URLSearchParams(queryString);
            for (let [key, value] of searchParams) {
                request.params[key] = value;
            }
        }

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;