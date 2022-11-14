const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
let apiQuotes = [];

// Show New Quote
function newQuote() {
    // Pick a Random Qoute from ApiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   // authorText.textContent = quote.author;
   // Check if author field is blank
   if (!quote.author) {
    authorText.textContent ='Unknown';
   }else {
    authorText.textContent = quote.author;
   }

   // check quote length to determne styling
   if (quote.text.length > 200) {
    quoteText.classList.add('long-quote');
   } else {
    quoteText.classList.remove('long-quote');
   }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try { 
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
        complete();
    } catch (error) {
        //catch error here
    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl =`https//:twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//onload
getQuotes();
//loading();
