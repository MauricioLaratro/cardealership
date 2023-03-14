const pageTitle = "Car Dealership";
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
	vehicles2: {
		template: "../pages/vehicles2.html",
		title: "vehicles2 | " + pageTitle,
		description: "This is the about page",
	},
	contact: {
		template: "../pages/contact.html",
		title: "Contact Us | " + pageTitle,
		description: "This is the contact page",
	},
	company: {
		template: "../pages/company.html",
		title: "Company | " + pageTitle,
		description: "This is the company page",
	},
	financing: {
		template: "../pages/financing.html",
		title: "Financing | " + pageTitle,
		description: "This is the financing page",
	},



	model1: {
		template: "../pages/models/model1.html",
		title: "Model1 | " + pageTitle,
		description: "This is the model page",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {

	// script para que al cambiar de page, el view se vaya hasta el top
	window.scroll({
		top: 0,
	});	

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
	// document
	// 	.querySelector('meta[name="description"]')
	// 	.setAttribute("main-page", route.description);


	// Script del slider
	const slider = document.querySelector('.img-container')
	const sliderNavigation = document.querySelectorAll('.miniImage')
	
	sliderNavigation.forEach( ( cadaMiniImage , i )=> {
		sliderNavigation[i].addEventListener('click',()=>{
	
			let posicion = i
			let operation = posicion * -25
	
			slider.style.transform = `translateX(${ operation }%)`
	
			sliderNavigation.forEach( ( cadaMiniImage , i )=>{
				sliderNavigation[i].classList.remove('active')
			})
			sliderNavigation[i].classList.add('active')
	
		})
	});



	// Script para enviar el form
	function contactForm(){
		const $form = document.querySelector(".form");

		document.addEventListener("submit", (event) => {
			event.preventDefault();

			const $loader = document.querySelector(".loader");
			const $response = document.querySelector(".form-response");

			$loader.classList.remove("none");

			fetch("https://formsubmit.co/ajax/mauriciolaratro@gmail.com", {
				method: "POST",
				body: new FormData(event.target)
			})
			 .then(res => res.ok ? res.json(): Promise.reject(res))
			 .then(json => {
				console.log(json);
				$loader.classList.add("none");
				$response.classList.remove("none");
				$response.innerHTML = `<h2>${json.message}</h2>`;
				$form.reset();
			 })
			 .catch(err => {
				console.log(err);
				let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente.";
				$response.innerHTML = `<h2>Error ${err.status}: ${message}</h2>`;
			 })
			 .finally(() => setTimeout(() => {
				$response.classList.add("none");
				$response.innerHTML = "";
			 }, 3000))
		})
	}
	contactForm();



	// script para dar background al link del header en el que estes posicionado
	const headerLinks = document.querySelectorAll('.header-link')

	headerLinks.forEach( ( cadaLinkHeader , i )=> {
		headerLinks[i].addEventListener('click',()=>{

			headerLinks.forEach( ( cadaLinkHeader , i )=>{
				headerLinks[i].classList.remove('here')
			})
			headerLinks[i].classList.add('here')

		})
	
	});

	// quitamos el background seleccionado de home cuando estamos en una page diferente a esta
	const homeLink = document.getElementById('homeLink')

	if (location != "/"){
		homeLink.classList.remove('here')
	};

};





// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();