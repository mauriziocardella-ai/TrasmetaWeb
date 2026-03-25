let Navbar = {
    render: async () => {
        let view =  /*html*/
            `
                <nav class="navbar navbar-expand-lg navbar-dark bg-agid shadow-sm">
                    <div class="container">
                        <a class="navbar-brand d-flex flex-column" href="/#/">
                        <span class="fw-bold lh-1" style="font-size: 1rem;">Istituto Zooprofilattico Sperimentale della Sicilia</span>
                        <span class="small fw-light">TrasMeta WEB</span>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="/#/">Home</a></li>
                             <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Radisan
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/#/mod1">Modello 1 Residui Fitosanitari</a></li>
                                <li><a class="dropdown-item" href="/#/scheda">Scheda</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Modello 3 ....</a></li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            `
        return view
    },
    after_render: async () => { }

}

export default Navbar;