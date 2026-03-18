let modREST = {
    render : async (data) => {
        console.log(data);
        let view =  /*html*/`
            <div class="container my-5">
                <h1 class="h2 border-bottom pb-2">WY API REST</h1>
                ${data}
               <h2>
            </div>
        `
        return view
    },
    after_render: async () => {}
        
}

export default modREST;