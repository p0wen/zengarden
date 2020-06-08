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
let meditationTimeElem = document.querySelector('.meditationtime') 
let meditationDuration = 600;
let meditationTimer;
let meditationTime = document.querySelectorAll('.meditationduration button'); // Rename let to medTimeSetBtn
let startStopButton = document.querySelector('.starttimer');
let startStopBtnIcon = startStopButton.querySelector("i");

init();

// Updating the Meditation Duration based on settings‚

function init() {
    timerSettings()

}

// Timer Settings

function timerSettings () {
    meditationTimeElem.textContent = `${Math.floor(meditationDuration / 60)}:${Math.floor(meditationDuration % 60)}`;
    meditationTime.forEach(option => {
    option.addEventListener("click", function() {
        removeActive(meditationTime);
        meditationDuration = this.getAttribute("data-time");
        meditationTimeElem.innerHTML = `${Math.floor(meditationDuration /60)}:${Math.floor(meditationDuration % 60)}`;
        option.classList.add("active")
    })
})
}

// Control Start Stop Button

function controlTimer() {
    let status = startStopButton.getAttribute("data-status");
    startStopButton.addEventListener("click", function() {
        if (status === "stopped") {
            startTimer();
            this.dataSet.status = "playing";
            startStopBtnIcon /klasse löschen und neue hinzufügen
        } 
        wenn stopped dannn
        startTimer ausführen
        button ändern
        wenn play dann
        stopTimer ausführen
        button ändern
    })
}

// Reset Active State on none chosen Settings

function removeActive(settingsTimer) {
    settingsTimer.forEach(setting => {
        setting.classList.remove("active");
    });
}

// Counting down the meditationduration (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)

function startTimer() {
    meditationtimer = setInterval(function () {
    if (meditationDuration <= 0){
        clearInterval(meditationtimer);
        meditationTimeElem.innerHTML = `Seize the day!`
    } else {
        meditationTimeElem.innerHTML = `${Math.floor(meditationDuration /60)}:${Math.floor(meditationDuration % 60)}`
    }
    meditationDuration -= 1;
}, 1000)
}

function pauseTimer() {
    
}

/** Build a Streak Recording for past 7 days
 * Look if meditation was done yesterday
 * if yes
 * check date before yesterday
 * if yes check the day before yesterday
 * if no clear local storage 
 * mark square with an "x"
 * if 7 days in a row State "You are on a roll" & clear for the next week
 * 
 */