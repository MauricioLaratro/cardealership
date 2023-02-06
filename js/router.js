const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "./pages/404.html",
    "/": "./pages/index.html",
    "/vehicles": "./pages/vehicles.html",
    "/vehicles2": "./pages/vehicles2.html",
    "/company": "./pages/company.html",
    "/contact": "./pages/contact.html",
    "/financing": "./pages/financing.html",
    "/model1": "./pages/models/model1.html",
};


const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    // Almaceno el elemento de mainpage en una variable para acceder a sus atributos después
    let mainpage = document.getElementById("main-page");
    // Reemplazo el contenido del elemento con .innerHTML por el valor de la constante html (ya estaba en el código)
    mainpage.innerHTML = html;
    // Obtengo la dirección de la página con .baseURI
    let uri = mainpage.baseURI;
    /* Busco la posición de la URL en donde aparece el "#" del slide con .indexOf y utilizo esa
    posición para obtener solamente el # de slide en el que estoy haciendo click con .substring.
    En caso de que esté en el index (cuando no existe el slider) la variable uri tendrá solamente
    el valor de la uri actual. */
    uri = uri.substring(uri.indexOf('#'));
    /* Verifico que uri tenga un "#". Si entra al if es porque ya estoy haciendo click en algún número
    del slide. */
    if(uri.includes("#")){
        /* Hago lo mismo que hice en la línea 38, pero le añado el + 1 para obtener el número
        del slide sin el "#". */
        let sliderID = uri.substring(uri.indexOf('#') + 1)
        // Utilizo el sliderID para obtener el elemento html correspondiente
        let slider = document.getElementById(sliderID);
        // Seteo la propiedad de opacity a 1 para que se vea
        slider.setAttribute("style","display:flex" /*,"opacity:1"*/);
    }
};


window.onpopstate = handleLocation;
window.route = route;

handleLocation();