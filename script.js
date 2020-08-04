const toggleSwitch = document.querySelector('input[type="checkbox"]');
const text = document.querySelector('ul');
const toggleIcon = document.getElementById('toggle-icon');

function isLight(value) {
	toggleIcon.children[0].textContent = value ? 'Light Mode' : 'Dark Mode';
	value ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
	text.style.color = value ? 'rgb(255 255 255)' : 'rgb(66 66 66)';
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