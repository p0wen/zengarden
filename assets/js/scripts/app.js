// Accessing the Quotes - How to work with APIs based on this tutorial https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data
let quote;
let quoteTextElem = document.querySelector('.quotetext');
let quoteAuthorElem = document.querySelector('.author');

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


// Building a Timer 
/**
 * Define the meditation Time
 * Define the warmup time
 * define the cool down time
 * calculate total length 
 * press play -> switch icon to pause & show reset button
 * count down 3 seconds
 * play start sound
 * run through first timer
 * play start sound
 * start main timer
 * play start sound
 * after main timer ends start cool down timer
 * play end bell
 * display text "seize the day"
 * store successfully finished session to local storage
 */
// Getting the HTML Element and declare meditation duration standard
var meditationTimeElem = document.querySelector('.meditationtime') 
var meditationDuration = 600;

// Updating the Meditation Duration based on settings‚
meditationTimeElem.textContent = `${Math.floor(meditationDuration / 60)}:${Math.floor(meditationDuration % 60)}`;
var meditationTime = document.querySelectorAll('.meditationduration button');

meditationTime.forEach(option => {
    option.addEventListener("click", function() {
        meditationDuration = this.getAttribute("data-time");
        meditationTimeElem.innerHTML = `${Math.floor(meditationDuration /60)}:${Math.floor(meditationDuration % 60)}`;
                console.log('Timer set');
    });
});

// Counting down the meditationduration (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)

let meditationtimer = setInterval(function () {
    if (meditationDuration <= 0){
        clearInterval(meditationtimer);
        meditationTimeElem.innerHTML = `Seize the day!`
    } else {
        meditationTimeElem.innerHTML = `${Math.floor(meditationDuration /60)}:${Math.floor(meditationDuration % 60)}`
    }
    meditationDuration -= 1;
}, 1000)