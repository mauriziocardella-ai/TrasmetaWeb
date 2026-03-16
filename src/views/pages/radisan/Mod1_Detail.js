let Mod1_Detail = {
    render : async (jsonData) => {
        console.log(jsonData);
        const utenti = jsonData.data.utenti_attivi || [];
        let view =  /*html*/`
            <div class="container my-5">
                <h1 class="h2 border-bottom pb-2">Modulo Radisan - Gestione Utenti</h1>
                <div class="table-responsive mt-4">
                    <table class="table table-hover">
                        <thead>
                            <tr class="text-uppercase small">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ruolo</th>
                                <th class="text-end">Stato</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${utenti.map(user => `
                                <tr>
                                    <td>${user.id}</td>
                                    <td><span class="text-primary fw-bold">${user.nome}</span></td>
                                    <td>${user.ruolo}</td>
                                    <td class="text-end">
                                        <span class="badge bg-success">Attivo</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `
        return view
    },
    after_render: async () => {}
        
}

export default Mod1_Detail;