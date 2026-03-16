import Mod1_Detail from './Mod1_Detail.js'

let Mod1 = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> Modello 1 </h1>
                
                <button id="btn-azione" class="button is-primary" style="margin-top: 1rem;">
                    Modello 1 Sub Form Detail
                </button>

                <div id="mod1_page_container" class="container pageEntry" style="margin-top: 2rem;">
                    <article> Attendere il caricamento...</article>
                </div>
            </section>
        `
        
        return view
    },
    after_render: async () => {
        const btn = document.getElementById('btn-azione');
        const container = document.getElementById('mod1_page_container'); // Corretto ID con underscore

        if(btn && container) {
            btn.addEventListener('click', async () => {
                console.log("Caricamento Mod1_Detail...");
                // Renderizziamo il dettaglio dentro il container
                container.innerHTML = await Mod1_Detail.render("PARAMETRO");
                
                // Se Mod1_Detail ha un suo after_render, ricordati di chiamarlo qui:
                if (Mod1_Detail.after_render) {
                    await Mod1_Detail.after_render();
                }
            });
        }
    }
}

export default Mod1;