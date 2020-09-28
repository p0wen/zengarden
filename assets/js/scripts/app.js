// Register Service Worker -  https://developers.google.com/web/fundamentals/primers/service-workers //

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/zengarden/sw.js", { scope: "/zengarden/" })
      .then(
        function (registration) {
          // Registration was successful
          printLog(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          // registration failed :(
          printLog("ServiceWorker registration failed: ", err);
        }
      );
  });
}

//get today's date for all kinds of function
let currentHour = new Date().getHours();
let currDate = new Date();
let currYear = currDate.getFullYear();
let currMonth = currDate.getMonth() + 1;
let dateLastDone;
let oneDayAgo;
let todayDate;
currDate.setHours(0, 0, 0, 0);

// generate current streakBar based on localStorage
let streak = 0;
let streakBar = document.getElementById("streakbar"); // change it to streakBarElem - rename symbol
let yourStreak = parseInt(localStorage.getItem("yourStreak"));
let streakBarDummy = "";
const sevenDayStreak = 7;

// Accessing the Quotes - How to work with APIs based on this tutorial https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data
let quote;
let quoteTextElem = document.querySelector(".quotetext");
let quoteAuthorElem = document.querySelector(".author");

// Fetch JSON feed from type.fit
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    quote = data[Math.floor(Math.random() * 100) + 1];
    quoteTextElem.innerHTML = `"${quote.text}"`;
    quoteAuthorElem.innerHTML = quote.author;
  });

// Define Sounds for howler.js

const startSound = new Howl({
  src: [
    "assets/media/sounds/startbell.webm",
    "assets/media/sounds/startbell.mp3",
  ],
  html5: true,
});
const ambientSound = new Howl({
  src: [
    "assets/media/sounds/ambientsound.webm",
    "assets/media/sounds/ambientsound.mp3",
  ],
  volume: 0.5,
  loop: true,
  autoplay: true,
});
const endSound = new Howl({
  src: ["assets/media/sounds/endbell.webm", "assets/media/sounds/endbell.mp3"],
  html5: true,
});

// Building a Timer
/**
 * Define the meditation Time
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

// Global Variables
let meditationDuration = 900;
let meditationProgress = meditationDuration;
let meditationTimer;
let countdownTimer;
let timeLeft;
let currentTime = 0;
let progress;
let showCountDown = true;
let counter;
let countdownleft = 3;
let startSoundPlayed = false;

// Const
const debugmode = false;

// Elements / BTNs

let meditationTimeElem = document.querySelector(".meditationtime");
let medTimeSetBtn = document.querySelectorAll(".meditationduration button");
let changeBackgroundBTN = document.querySelectorAll(".changebackground button");
let startStopButton = document.querySelector(".starttimer");
let startStopBtnIcon = startStopButton.querySelector("i");
let status = startStopButton.getAttribute("data-status");

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

init();

// Circle Stroke Setup

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

// Initiliazation of the App

function init() {
  dateSetup();
  timeSensitivBackground(currentHour);
  timerSettings();
  controlTimer();
  streakInit();
  checkStreak();
  changeBackground();
  updateStreakData(streak);
}

/**
 * If debugmode is true all console.logs are printed
 * otherwise console.log isdeactivated
 * @param {value} message
 */

function printLog(message) {
  if (debugmode) {
    console.log(message);
  }
}

/**
 * Setup the Timer after changes are made in the Modal Settings by the user
 */


function timerSettings() {
  meditationTimeElem.textContent = formatDuration(meditationDuration);
  medTimeSetBtn.forEach((option) => {
    option.addEventListener("click", function () {
      stopTimer();
      resetTimer();
      removeActive(medTimeSetBtn);
      startStopButton.dataset.status = "";
      status = startStopButton.getAttribute("data-status");
      startStopBtnIcon.classList.remove("fa-redo");
      startStopBtnIcon.classList.add("fa-play");
      outline.style.strokeDashoffset = outlineLength;
      meditationDuration = this.getAttribute("data-time");
      meditationProgress = meditationDuration;
      meditationTimeElem.innerHTML = formatDuration(meditationDuration);
      option.classList.add("active");
    });
  });
}

/**
 * This function seperates Minutes and Seconds for meditationDuration
 * @param {INTEGER} meditationDuration
 */

function formatDuration(meditationDuration) {
  let minutes = `${Math.floor(meditationDuration / 60)}`;
  let seconds = `${Math.floor(meditationDuration % 60)}`;
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

/**
 * Control the timer based on the status
 * Change Icons
 * Stop Timer
 * Reset Timer
 * Start/Resume Timer
 */

function controlTimer() {
  startStopButton.addEventListener("click", function () {
    if (status === "playing") {
      pauseTimer();
      startStopButton.dataset.status = "stopped";
      status = startStopButton.getAttribute("data-status");
      startStopBtnIcon.classList.remove("fa-pause");
      startStopBtnIcon.classList.add("fa-play");
    } else if (status === "complete") {
      startStopButton.dataset.status = "stopped";
      status = startStopButton.getAttribute("data-status");
      resetTimer();
      startStopBtnIcon.classList.remove("fa-redo");
      startStopBtnIcon.classList.add("fa-play");
    } else if (status === "countdown") {
      pauseCountdown();
      startStopButton.dataset.status = "stopped";
      status = startStopButton.getAttribute("data-status");
      startStopBtnIcon.classList.remove("fa-pause");
      startStopBtnIcon.classList.add("fa-play");
    } else {
      startStopButton.dataset.status = "playing";
      status = startStopButton.getAttribute("data-status");
      countDown();
      startStopBtnIcon.classList.remove("fa-play");
      startStopBtnIcon.classList.add("fa-pause");
    }
  });
}

/**
 * Remove the active state from all Timer Settings
 * @param {Status} settingsTimer
 */
function removeActive(settingsTimer) {
  settingsTimer.forEach((setting) => {
    setting.classList.remove("active");
  });
}

/**
 * Play Startbell when not played yet
 */
function playStartSound() {
  if (!startSoundPlayed) {
    startSound.play();
    startSoundPlayed = true;
  }
}

/**  Counting down the countdown & meditationduration
 * (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)
 * */

/**
 * Countdown is played before meditation starts
 * Countdown is not played if it was completed and meditation is paused and resumed
 */
function countDown() {
  counter = countdownleft;
  if (showCountDown) {
    countdownTimer = setInterval(function () {
      if (counter > 0) {
        meditationTimeElem.innerHTML = counter;
        counter -= 1;
        status = startStopButton.dataset.status = "countdown";
        startStopButton.getAttribute("data-status");
      } else if (counter === 0) {
        meditationTimeElem.innerHTML = "Go";
        clearInterval(countdownTimer);
        countdownleft = 3;
        status = startStopButton.dataset.status = "playing";
        startStopButton.getAttribute("data-status");
        startTimer();
      }
    }, 1000);
  } else {
    startTimer();
    status = startStopButton.dataset.status = "playing";
    startStopButton.getAttribute("data-status");
  }
  showCountDown = false;
}

/**
 * Controling the Countdown and stopping it if the pause button was hit
 * Timeleft is stored to resume the countdown after play button wass hit
 */
function pauseCountdown() {
  printLog("nothing is happening");
  clearInterval(countdownTimer);
  countdownleft = counter;
  meditationTimeElem.innerHTML = counter;
  showCountDown = true;
}

/**
 * This function controls the meditation time incl. the coloring of the outline circle
 */
function startTimer() {
  playStartSound();
  meditationTimer = setInterval(function () {
    // trying to also be prepared for unexpected edge cases in the if statement since meditationeProgress should never be smaller 0
    if (meditationProgress <= 0) {
      caluclateProgress();
      clearInterval(meditationTimer);
      endSound.play();
      meditationTimeElem.innerHTML = `Seize the day!`;
      status = startStopButton.dataset.status = "complete";
      startStopButton.getAttribute("data-status");
      startStopBtnIcon.classList.remove("fa-pause");
      startStopBtnIcon.classList.add("fa-redo");
      mediStreak();
      startSoundPlayed = false;
      showCountDown = true;
      counter = 3;
    } else {
      caluclateProgress();
      printLog(progress);
      printLog(currentTime);
      printLog(meditationProgress);
      printLog(meditationTimer);
      meditationTimeElem.innerHTML = formatDuration(meditationProgress);
      meditationProgress -= 1;
      currentTime += 1;
    }
  }, 1000);
}

/**
 * Calculate Progress
 * @param {} message
 */

function caluclateProgress() {
  progress = outlineLength - (currentTime / meditationDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
}



/**
 * Stopping the Timer if the settings are changed while the timer is running
 */
function stopTimer() {
  clearInterval(meditationTimer);
  currentTime = 0;
  meditationProgress = 0;
  progress = 0;
  status = startStopButton.dataset.status = "stopped";
  startStopButton.getAttribute("data-status");
  startStopBtnIcon.classList.remove("fa-pause");
  startStopBtnIcon.classList.add("fa-play");
}

/**
 * After succesful meditation the timer can be reset
 */
function resetTimer() {
  currentTime = 0;
  meditationProgress = meditationDuration;
  progress = 0;
  outline.style.strokeDashoffset = outlineLength;
  timerSettings();
}

/**
 * The moment when the user hits the button the time left is stored,
 * so that the user can continue right where they left
 */
function pauseTimer() {
  clearInterval(meditationTimer);
  timeLeft = meditationProgress;
  progressStatus = progress;
  meditationTimeElem.innerHTML = formatDuration(timeLeft);
}

/**
 * Depending on the day of time 0-12 and 12-24 a different background is presented
 * @param {Integer} currentHour
 */

function timeSensitivBackground(currentHour) {
  printLog("current hours", currentHour);
  if (currentHour >= 0 && currentHour < 12) {
    // after Midnight and before 12:00PM
    document.getElementById("myDiv").style.backgroundImage =
      "url('assets/media/img/sunrise.jpg')";
    printLog("its morning");
  } else if (currentHour >= 12) {
    // after 12:00PM and befor Midnight
    document.getElementById("myDiv").style.backgroundImage =
      "url('assets/media/img/afternoon.jpg')";
    printLog("its afternoon");
  }
}

/**
 * Enables the user to change background by herself
 */
function changeBackground() {
  let bgimage = "";
  changeBackgroundBTN.forEach((option) => {
    option.addEventListener("click", function () {
      bgimage = this.getAttribute("background-img");
      if (bgimage == "morning") {
        // Use Morning Background
        document.getElementById("myDiv").style.backgroundImage =
          "url('assets/media/img/sunrise.jpg')";
      } else if (bgimage == "afternoon") {
        // after 12:00PM
        document.getElementById("myDiv").style.backgroundImage =
          "url('assets/media/img/afternoon.jpg')";
      } else if (bgimage == "random") {
        // use random background from unsplash
        document.getElementById("myDiv").style.backgroundImage =
          "url('https://source.unsplash.com/random/1080')";
      }
    });
  });
}

/** Build a Streak Recording for past 7 days Inspiration by https://github.com/sanspoint/justdothething
 * look what day is today
 * Look if meditation was done yesterday
 * if yes
 *      look up amount of streaks
 *      loop through amounts of streak
 *          set checkmark for each
 * if not
 *  reset streak amount
 *  reset dateLastDone
 * if streak = 7
 *  display popup State "You are on a roll"
 *  reset streak amount
 *  reset dateLastDone
 */

//Set streak (days completed) by converting locally stored value to Int

/**
 * Calling and setting the date variables through their respective function
 */
function dateSetup() {
  setDates();
  setTodayDate();
  setOneDayAgo();
}

/**
 * Define the various date variables
 */

function setDates() {
  currDate = new Date();
  currYear = currDate.getFullYear();
  currMonth = currDate.getMonth() + 1;
  currDate.setHours(0, 0, 0, 0);
  if (currMonth < 10) {
    currMonth = "0" + currMonth;
  }
  currDay = currDate.getDate();
  if (currDay < 10) {
    currDay = "0" + currDay;
  }
}

/**
 * Define the date of today
 */
function setTodayDate() {
  setDates();
  todayDate = currYear + "-" + currMonth + "-" + currDay;
}

/**
 * Calculate and define yesterdays date
 */
function setOneDayAgo() {
  setDates();
  oneDayAgo = currYear + "-" + currMonth + "-" + (currDay - 1);
}

/**
 * Sets a date value for the last day completed in from the localStorage, or marks it as Never.
 * Set a value for consecutives days from the localStorage, or define it as Never
 */
function streakInit() {
  if (!localStorage.getItem("dateLastDone")) {
    dateLastDone = "Never";
  } else {
    dateLastDone = localStorage.getItem("dateLastDone");
  }
  streak = parseInt(localStorage.getItem("yourStreak"));
  if (isNaN(streak)) {
    streak = 0;
  }
}

/**
 * Controlls the
 */
function mediStreak() {
  localStorage.setItem("dateLastDone", todayDate);
  // if streak is 6 the user reached a full week --> Streak completed and congratz shown
  if (streak == 6) {
    streak += 1;
    printLog("Congratz");
    showCongratzPopup();
    streakReset();
    // if streak is 0 the user just completed her first meditation
  } else if (streak === 0) {
    printLog("you did it the first time");
    streak += 1;
    updateStreakData(streak);
    dateLastDone = localStorage.getItem("dateLastDone", todayDate);
    // if streak bigger than 0 and dateLastDone from the localStorage are equal a succesful attempt is undertaken
  } else if (streak > 0 && dateLastDone == oneDayAgo) {
    printLog("you are getting there");
    streak += 1;
    updateStreakData(streak);
    dateLastDone = localStorage.getItem("dateLastDone", todayDate);
    // if streak bigger than 0 and dateLastDone equal to todays date the streak does not get increased
  } else if (streak > 0 && dateLastDone == todayDate) {
    printLog("you already did it today");
    updateStreakData(streak);
    // if none of the above works, the checkStreak() function is called to see if the streak was broken
  } else checkStreak();
}
/**
 * Compare the dates and see if the day-to-day streak was failed to complete
 */
function checkStreak() {
  printLog("dateLastDone:", dateLastDone);
  printLog("oneDayAgo:", oneDayAgo);
  printLog("todayDate", todayDate);
  if (dateLastDone != oneDayAgo && dateLastDone != todayDate) {
    printLog("seems you didnt make it");
    streakReset();
    return false;
  } else {
    printLog("you are on a run");
    return true;
  }
}

/**
 * Reset the streak if day-to-day streak was failed to complete
 */
function streakReset() {
  localStorage.removeItem("dateLastDone");
  localStorage.removeItem("yourStreak");
  streak = 0;
  lastDone = "";
  dateLastDone = "";
  setTodayDate();
  updateStreakData();
}

/**
 * Build the streak boxes in the streakbar section of the App
 * @param {Integer} streak
 */

function updateStreakData(streak) {
  yourStreak = streak;
  streakBarDummy = "";
  for (var i = 0; i < sevenDayStreak; i++) {
    if (yourStreak > 0) {
      streakBarDummy += '<i class="far fa-check-square"></i>';
      yourStreak -= 1;
    } else {
      streakBarDummy += '<i class="far fa-square"></i>';
    }
  }
  // Using innerHTML without += to increase DOM Performance
  streakBar.innerHTML = streakBarDummy;
  localStorage.setItem("yourStreak", streak);
}

/**
 * If user meditates 7 days in a row
 * show modal with congratulation
 */
function showCongratzPopup() {
  this.successModal = $("#streak-success");
  this.successModal.modal("show");
}

/**
 * Control the Whitenoise in the Settings
 */
function controlAmbientSound() {
  let ambientnoise = ambientSound.playing();
  if (ambientnoise) {
    ambientSound.pause();
  } else {
    ambientSound.play();
  }
}

/**
 *  Update Sound Volume
 */

function updateVolume() {
  let volume = document.getElementById("myRange").value;
  ambientSound.volume(volume);
}
