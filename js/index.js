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
		description: "Here you will find all available vehicles",
	},
	vehicles2: {
		template: "../pages/vehicles2.html",
		title: "vehicles2 | " + pageTitle,
		description: "Here you will find all available vehicles",
	},
	contact: {
		template: "../pages/contact.html",
		title: "Contact Us | " + pageTitle,
		description: "From here you will be able to contact us",
	},
	company: {
		template: "../pages/company.html",
		title: "Company | " + pageTitle,
		description: "In this page you can know more about us",
	},
	financing: {
		template: "../pages/financing.html",
		title: "Financing | " + pageTitle,
		description: "Here you can learn and request more information about financing.",
	},



	model1: {
		template: "../pages/models/model1.html",
		title: "Model1 | " + pageTitle,
		description: "Here you will find more information about the vehicle you are looking for.",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const locationHandler = async () => {

	// Redirect the viewport to the top, when changing pages
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
	document
	.querySelector('meta[name="description"]')
	.setAttribute("content", route.description);


	// get html elements for manual slider
	const slider = document.querySelector('.img-container')
	const sliderNavigation = document.querySelectorAll('.miniImage')
	// Manual Slider script for model page
	sliderNavigation.forEach( ( imagesList , i )=> {
		sliderNavigation[i].addEventListener('click',()=>{
	
			let posicion = i
			let operation = posicion * -25
	
			slider.style.transform = `translateX(${ operation }%)`
	
			sliderNavigation.forEach( ( imagesList , i )=>{
				sliderNavigation[i].classList.remove('active')
			})
			sliderNavigation[i].classList.add('active')
	
		})
	});



	// Function to send forms
	function contactForm(){
		const $form = document.querySelector(".form");

		document.addEventListener("submit", (event) => {
			event.preventDefault();

			const $loader = document.querySelector(".loader");
			const $response = document.querySelector(".form-response");

			$loader.classList.remove("none");
			// After https://formsubmit.co/ajax/ you must enter the email address
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
				let message = err.statusText || "An error occurred while sending, please try again.";
				$response.innerHTML = `<h2>Error ${err.status}: ${message}</h2>`;
			 })
			 .finally(() => setTimeout(() => {
				$response.classList.add("none");
				$response.innerHTML = "";
			 }, 3000))
		})
	}
	contactForm();


	// Indicate the current page
	const headerLinks = document.querySelectorAll('.header-link')

	headerLinks.forEach( ( linksList , i )=> {
		headerLinks[i].addEventListener('click',()=>{

			headerLinks.forEach( ( linksList , i )=>{
				headerLinks[i].classList.remove('selected')
			})
			headerLinks[i].classList.add('selected')

		})
	
	});

	// Remove the indicator, from home, when it is not the current page. 
	const homeLink = document.getElementById('homeLink')

	if (location != "/"){
		homeLink.classList.remove('selected')
	};

};

// create a function that watches the hash and calls the urlLocationHandler
window.addEventListener("hashchange", locationHandler);
// call the urlLocationHandler to load the page
locationHandler();