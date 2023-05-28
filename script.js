const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader= document.getElementById('loader');
const darkModeBtn= document.getElementById('dark-mode');

let apiQuotes=[];

//dark mode 
function darkMode(){
    
    var element= document.body;
    element.classList.toggle("dark-mode");
}

//show loading

function loading(){
    loader.hidden= false;
    quoteContainer.hidden=true;
}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true
}

//Show New Quotes
function newQuote(){
    loading();
    //pick a random quote from apiQuotes array
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //console.log(quote);
    //Check if author field is null
    if(!quote.author){
        autherText.textContent='Unknown';
    }
    else{
        autherText.textContent=quote.author;
    }

    //Check quote lenght for styling 
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent=quote.text;
    complete();
}
// Get Quotes From a API
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try {
      const response= await fetch(apiUrl);
      apiQuotes= await response.json();
      //console.log(apiQuotes[12]);
      newQuote();
    }catch(error){
        //error here
    }
}

//tweet a quote
function tweetQuote() {
   const twitterUrl= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
   window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//darkModeBtn.addEventListener('click', darkMode);


getQuotes();
