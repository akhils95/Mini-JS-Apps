const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function changeImage(mode) {
	image1.src = `images/undraw_conceptual_idea_${mode}.svg`;
	image2.src = `images/undraw_feeling_proud_${mode}.svg`;
	image3.src = `images/undraw_proud_coder_${mode}.svg`;
}

function isLight(value) {
	nav.style.backgroundColor = value ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
	textBox.style.backgroundColor = value ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
	toggleIcon.children[0].textContent = value ? 'Light Mode' : 'Dark Mode';
	value ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
	value ? changeImage('light') : changeImage('dark');
}

function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		isLight(false);
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		isLight(true);
	}
}

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
		isLight(false);
	}
}