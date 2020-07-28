const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true

let count = 5;
const apiKey='_fJNm9UfrU5bbYxbgtPdA8YF9XwYRVj4PmzIPGhWFBA';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount (picCount) {
	apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

function imageLoadedCheck() {
	loadedImages++;
	if (loadedImages === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

function setAtr(element, attributes) {
	for (key in attributes) {
		element.setAttribute(key, attributes[key]);
	};
}

function displayPhotos() {
	loadedImages = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		const linkToOriginal = document.createElement('a');
		setAtr(linkToOriginal, {
			href: photo.links.html,
			target: '_blank'
		});
		const img = document.createElement('img');
		setAtr(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});
		img.addEventListener('load', imageLoadedCheck);
		linkToOriginal.appendChild(img);
		imageContainer.appendChild(linkToOriginal);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (isInitialLoad) {
			updateAPIURLWithNewCount(30);
			isInitialLoad = false;
    	}
	} catch(error) {

	}
}

window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();