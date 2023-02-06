
const pageTitle = "JS Single Page Application Router";
// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "../pages/404.html",
		title: "404 | " + pageTitle,
		description: "Page not found",
	},
	"/": {
		template: "../pages/index.html",
		title: "Home | " + pageTitle,
		description: "This is the home page",
	},
	vehicles: {
		template: "../pages/vehicles.html",
		title: "vehicles | " + pageTitle,
		description: "This is the about page",
	},
	contact: {
		template: "../pages/contact.html",
		title: "Contact Us | " + pageTitle,
		description: "This is the contact page",
	},



	model1: {
		template: "../pages/models/model1.html",
		title: "Model1 | " + pageTitle,
		description: "This is the model page",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {
	// get the url path, replace hash with empty string
	var location = window.location.hash.replace("#", "");
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the routes object
	const route = routes[location] || routes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	document.getElementById("main-page").innerHTML = html;
	// set the title of the document to the title of the route
	document.title = route.title;
	// set the description of the document to the description of the route
	document
		.querySelector('meta[name="description"]')
		.setAttribute("main-page", route.description);
};
// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();




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
