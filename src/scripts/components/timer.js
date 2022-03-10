import { gsap } from 'gsap';
import { sum } from 'lodash';

const daysCurrentTime = document.getElementsByClassName("days-current-time");
const daysNextTime = document.getElementsByClassName("days-next-time");

const hoursCurrentTime = document.getElementsByClassName("hours-current-time");
const hoursNextTime = document.getElementsByClassName("hours-next-time");

const minutesCurrentTime = document.getElementsByClassName("minutes-current-time");
const minutesNextTime = document.getElementsByClassName("minutes-next-time");

const secondsCurrentTime = document.getElementsByClassName("seconds-current-time");
const secondsNextTime = document.getElementsByClassName("seconds-next-time");

const EVENT_DATE_TIME = "2022-03-20T20:00:00";
//const EVENT_DATE_TIME = "2022-03-10T00:33:00";

let timeLeft = 0;
let daysLeft = 0;
let hoursLeft = 0;
let minutesLeft = 0;
let secondsLeft = 0;

let daysAnimation = false;
let hoursAnimation = false;
let minutesAnimation = false;
let secondsFlipAnimation = false;
let secondsFrontAnimation = false;
const flipAnimationOptions = { rotateX: -180, duration: 0.5 };
const frontAnimationOptions= { keyframes: { opacity: [1, 1, 0] }, duration: 0.5 };

let countDown = false;
let timeIsOver = false;

function getTimeLeft() {
  const eventDateTime = new Date(EVENT_DATE_TIME).getTime();
  const currentDateTime = Date.now();
  return Math.round((eventDateTime - currentDateTime) / 1000);
}

function setTimeUnits(timeLeft) {
  daysLeft = Math.floor(timeLeft / 86400);
  timeLeft %= 86400;
  hoursLeft = Math.floor(timeLeft / 3600);
  timeLeft %= 3600;
  minutesLeft = Math.floor(timeLeft / 60);
  secondsLeft = timeLeft % 60;
}

function formatTime(timeValue) {
  return timeValue > 9 ? timeValue : `0${timeValue}`;
}

function displayDays(initialCall) {
  const nextDaysLeft = daysLeft - 1;
  for (let index = 0; index < 2; index++) {
    daysCurrentTime[index].innerText = formatTime(daysLeft);
    daysNextTime[index].innerText = formatTime(nextDaysLeft);
  }
  if (!initialCall) {
    if (!daysAnimation) {
      daysAnimation = gsap.to("#days-flip-pannel", flipAnimationOptions);
    } else {
      daysAnimation.restart();
    }
    daysLeft = nextDaysLeft;
  }
}

function displayHours(initialCall) {
  const nextHoursLeft = hoursLeft <= 0 ? 23 : hoursLeft - 1;
  for (let index = 0; index < 2; index++) {
    hoursCurrentTime[index].innerText = formatTime(hoursLeft);
    hoursNextTime[index].innerText = formatTime(nextHoursLeft);
  }
  if (!initialCall) {
    if (!hoursAnimation) {
      hoursAnimation = gsap.to("#hours-flip-pannel", flipAnimationOptions);
    } else {
      hoursAnimation.restart();
    }
    hoursLeft = nextHoursLeft;
  }
}

function displayMinutes(initialCall) {
  const nextMinutesLeft = minutesLeft <= 0 ? 59 : minutesLeft - 1;
  for (let index = 0; index < 2; index++) {
    minutesCurrentTime[index].innerText = formatTime(minutesLeft);
    minutesNextTime[index].innerText = formatTime(nextMinutesLeft);
  }
  if (!initialCall) {
    if (!minutesAnimation) {
      minutesAnimation = gsap.to("#minutes-flip-pannel", flipAnimationOptions);
    } else {
      minutesAnimation.restart();
    }
    minutesLeft = nextMinutesLeft;
  }
}

function displaySeconds(initialCall) {
  const nextSecondsLeft = secondsLeft <= 0 ? 59 : secondsLeft - 1;
  for (let index = 0; index < 2; index++) {
    secondsCurrentTime[index].innerText = formatTime(secondsLeft);
    secondsNextTime[index].innerText = formatTime(nextSecondsLeft);
  }
  if (!initialCall) {
    if (!secondsFlipAnimation) {
      secondsFlipAnimation = gsap.to("#seconds-flip-pannel", flipAnimationOptions);
      secondsFrontAnimation = gsap.to("#seconds-front-face", frontAnimationOptions);
    } else {
      secondsFlipAnimation.restart();
      secondsFrontAnimation.restart();
    }
    secondsLeft = nextSecondsLeft;
  }
}

function displayTime(initialCall = false) {
  const dayHasChanged = hoursLeft <= 0 && minutesLeft <= 0 && secondsLeft <= 0;
  const hourHasChanged = minutesLeft <= 0 && secondsLeft <= 0;
  const minuteHasChanged = secondsLeft <= 0;
  if (timeLeft < 0 && !initialCall) {
    console.log("Time is Over !!!");
    clearInterval(countDown);
  } else {
    if (dayHasChanged || initialCall) displayDays(initialCall);
    if (hourHasChanged || initialCall) displayHours(initialCall);
    if (minuteHasChanged || initialCall) displayMinutes(initialCall);
    displaySeconds(initialCall);
    timeLeft -= 1;
  }
}

export function mountTimer() {
  timeLeft = getTimeLeft();
  if (timeLeft <= 0) timeIsOver = true;
  if (!timeIsOver) {
    setTimeUnits(timeLeft);
    countDown = setInterval(displayTime, 1000);
  } else {
    console.log("Time is Over !!!");
  }
  displayTime(true);
}
