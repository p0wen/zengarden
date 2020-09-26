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
let streakBar = document.getElementById("streakbar");
let yourStreak = parseInt(localStorage.getItem("yourStreak"));
let streakBarDummy = "";
let sevenDayStreak = 7;
/**
for (var i = 0; i < sevenDayStreak; i++) {
  if (yourStreak > 0) {
    streakBarDummy += '<i class="far fa-check-square"></i>';
    yourStreak -= 1;
  } else {
    streakBarDummy += '<i class="far fa-square"></i>';
  }
}
 */

// Using innerHTML without += to increase DOM Performances
streakBar.innerHTML = streakBarDummy;

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

const outline = document.querySelector(".moving-outline circle");
const outlineLength = outline.getTotalLength();

let meditationTimeElem = document.querySelector(".meditationtime");
let meditationDuration = 10;
let meditationProgress = meditationDuration;
let meditationTimer;
let countdownTimer;
let medTimeSetBtn = document.querySelectorAll(".meditationduration button");
let changeBackgroundBTN = document.querySelectorAll(".changebackground button");
let startStopButton = document.querySelector(".starttimer");
let startStopBtnIcon = startStopButton.querySelector("i");
let timeLeft;
let currentTime = 0;
let progress;
let status = startStopButton.getAttribute("data-status");

init();

// Circle

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

function animateCircle() {}

// Updating the Meditation Duration based on settings‚

function init() {
  dateSetup();
  timeSensitivBackground(currentHour);
  timerSettings();
  controlTimer();
  streakInit()
  checkStreak();
  changeBackground();
  updateStreakData(streak);
}

// Timer Settings

function timerSettings() {
  meditationTimeElem.textContent = `${Math.floor(
    meditationDuration / 60
  )}:${Math.floor(meditationDuration % 60)}`;
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
      meditationTimeElem.innerHTML = `${Math.floor(
        meditationDuration / 60
      )}:${Math.floor(meditationDuration % 60)}`;
      option.classList.add("active");
    });
  });
}

// Control Start Stop Button

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

// Reset Active State on none chosen Settings

function removeActive(settingsTimer) {
  settingsTimer.forEach((setting) => {
    setting.classList.remove("active");
  });
}

// Counting down the meditationduration (Solution based on https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)
let startSoundPlayed = false;

function playStartSound() {
  if (!startSoundPlayed) {
    startSound.play();
    startSoundPlayed = true;
  }
}

let showCountDown = true;
let counter;
let countdownleft = 3;

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

function pauseCountdown() {
  console.log("nothing is happening");
  clearInterval(countdownTimer);
  countdownleft = counter;
  meditationTimeElem.innerHTML = counter;
  showCountDown = true;
}

function startTimer() {
  playStartSound();
  meditationTimer = setInterval(function () {
    if (meditationProgress <= 0) {
      progress =
        outlineLength - (currentTime / meditationDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
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
      progress =
        outlineLength - (currentTime / meditationDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
      console.log(progress);
      console.log(currentTime);
      console.log(meditationProgress);
      console.log(meditationTimer);
      meditationTimeElem.innerHTML = `${Math.floor(
        meditationProgress / 60
      )}:${Math.floor(meditationProgress % 60)}`;
      meditationProgress -= 1;
      currentTime += 1;
    }
  }, 1000);
}

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

function resetTimer() {
  currentTime = 0;
  meditationProgress = meditationDuration;
  progress = 0;
  outline.style.strokeDashoffset = outlineLength;
  timerSettings();
}

function pauseTimer() {
  clearInterval(meditationTimer);
  timeLeft = meditationProgress;
  progressStatus = progress;
  meditationTimeElem.innerHTML = `${Math.floor(timeLeft / 60)}:${Math.floor(
    timeLeft % 60
  )}`;
}

// Use Background based on Time or Settings

function timeSensitivBackground(currentHour) {
    console.log("current hours", currentHour)
  if (currentHour >= 0 && currentHour < 12) {
    // after Midnight and before 12:00PM
    document.getElementById("myDiv").style.backgroundImage =
      "url('assets/media/img/sunrise.jpg')";
      console.log("its morning")
  } else if (currentHour >= 12) {
    // after 12:00P
    document.getElementById("myDiv").style.backgroundImage =
      "url('assets/media/img/afternoon.jpg')";
      console.log("its afternoon")
  }
}

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

function dateSetup() {
    setDates();
    setTodayDate();
    setOneDayAgo();
}

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

function setTodayDate() {
    setDates();
    todayDate = currYear + "-" + currMonth + "-" + currDay;
}

function setOneDayAgo() {
    setDates();
    oneDayAgo = currYear + "-" + currMonth + "-" + (currDay - 1);
} 

//Sets a date value for the last day completed in, or marks it as Never.

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

function mediStreak() {
  localStorage.setItem("dateLastDone", todayDate);
  if (streak == 6) {
    streak += 1;
    console.log("Congratz");
    showCongratzPopup();
    streakReset();
  } else if (streak === 0) {
    console.log("you did it the first time");
    streak += 1;
    updateStreakData(streak);
    dateLastDone = localStorage.getItem("dateLastDone", todayDate);
  } else if (streak > 0 && dateLastDone == oneDayAgo) {
    console.log("you are getting there");
    streak += 1;
    updateStreakData(streak);
    dateLastDone = localStorage.getItem("dateLastDone", todayDate);
  } else if (streak > 0 && dateLastDone == todayDate) {
    console.log("you already did it today");
    updateStreakData(streak);
  } else checkStreak();
}

function checkStreak() {
  console.log("dateLastDone:", dateLastDone);
  console.log("oneDayAgo:", oneDayAgo);
  console.log("todayDate", todayDate);
  if (dateLastDone != oneDayAgo && dateLastDone != todayDate) {
    console.log("seems you didnt make it");
    streakReset();
    return false;
  } else {
    console.log("you are on a run");
    return true;
  }
}

function streakReset() {
  localStorage.removeItem("dateLastDone");
  localStorage.removeItem("yourStreak");
  streak = 0;
  lastDone = "";
  dateLastDone = "";
  setTodayDate();
  updateStreakData();
}

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

function showCongratzPopup() {
  this.successModal = $("#streak-success");
  this.successModal.modal("show");
}

function controlAmbientSound() {
  let ambientnoise = ambientSound.playing();
  if (ambientnoise) {
    ambientSound.pause();
  } else {
    ambientSound.play();
  }
}

/** Update Sound Volume **/

function updateVolume() {
  let volume = document.getElementById("myRange").value;
  ambientSound.volume(volume);
}
