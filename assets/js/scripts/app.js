// Accessing the Quotes - How to work with APIs based on this tuttorial https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data
var quote;
var quoteTextElem = document.querySelector('.quotetext');
var quoteAuthorElem = document.querySelector('.author');

// Fetch JSON feed from type.fit
fetch("https://type.fit/api/quotes")
.then(function(response) {
    return response.json();
})
.then(function(data) {
    quote = data[Math.floor(Math.random()*100) + 1];
    quoteTextElem.innerHTML = `"${quote.text}"`;
    quoteAuthorElem.innerHTML = quote.author;
});