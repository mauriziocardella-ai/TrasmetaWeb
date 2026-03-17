let PDF = {
    open_browser : async (elemento) => {
    // 2. Configura le opzioni (opzionale)
        const opzioni = {
            margin:       10,
            filename:     'documento_trasmeta.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 }, // Maggiore è il numero, migliore è la risoluzione
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // 3. Genera e scarica il file
        //html2pdf().set(opzioni).from(elemento).save();
        // Generiamo il PDF ma non lo salviamo
        html2pdf().set(opzioni).from(elemento).outputPdf('blob').then(function(blob) {
            // Creiamo un URL temporaneo per il file generato
            const url = URL.createObjectURL(blob);
            
            // Lo apriamo in una nuova scheda del browser
            window.open(url, '_blank');
        });
    }
}
export default PDF;