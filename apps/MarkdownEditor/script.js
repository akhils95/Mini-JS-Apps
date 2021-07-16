const compiled = document.querySelector('.compiler');
const editor = document.querySelector('#editor');
		
document.addEventListener('input', function (event) {

    // Only run if the change happened in the #editor
    // if (!event.target.matches('#editor')) return;

    compiled.innerHTML = marked(event.target.value, { sanitize: true });

}, false);