let Mod1_Detail = {
    render : async (par) => {
        console.log(par);
        let view =  /*html*/`
            <section class="section">
                <h1> Modello 1 Pagina di dettaglio ${par} </h1>
                    <div id="page_container" class="container pageEntry" style="margin-top: 2rem;">
                        <article> Attendere il caricamento...</article>
                    </div>
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default Mod1_Detail;