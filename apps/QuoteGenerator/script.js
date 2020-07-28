const container = document.getElementById('container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const changeQuoteBtn = document.getElementById('change-quote');
const loader = document.getElementById('loader');

function showLoader() {
	loader.hidden = false;
	container.hidden = true;
}

function hideLoader() {
	if (!loader.hidden) {
		container.hidden = false;
		loader.hidden = true;
	}
}

async function getQuote() {
	showLoader();
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try{
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		if (data.quoteAuthor === '') {
			author.innerText = 'Unknown';
		} else {
			author.innerText = data.quoteAuthor;
		}
		if (data.quoteText.length > 120) {
			quote.classList.add('long-text');
		} else{
			quote.classList.remove('long-text');
		}
		quote.innerText = data.quoteText;
		hideLoader();
	} catch(error) {
		getQuote();
		
	}
}

function tweetQuote() {
	const quoteTweet = quote.innerText;
	const authorTweet = author.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTweet} - ${authorTweet}`;
	window.open(twitterUrl, '_blank'); 
}

changeQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();