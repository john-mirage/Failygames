import { gsap } from 'gsap';

// Get all the DOM elements for the timer.
const daysDisplay = document.getElementById("days-display");
const daysNext = document.getElementById("days-next");
const daysCurrent = document.getElementById("days-current");

const hoursDisplay = document.getElementById("hours-display");
const hoursNext = document.getElementById("hours-next");
const hoursCurrent = document.getElementById("hours-current");

const minutesDisplay = document.getElementById("minutes-display");
const minutesNext = document.getElementById("minutes-next");
const minutesCurrent = document.getElementById("minutes-current");

const secondsDisplay = document.getElementById("seconds-display");
const secondsNext = document.getElementById("seconds-next");
const secondsCurrent = document.getElementById("seconds-current");

/**
 * Set the event date time.
 *
 * @constant {string} EVENT_DATE_TIME - The event date time.
 */
const EVENT_DATE_TIME = "2022-03-20T20:00:00";

let currentTime = 0;
let currentFormatedTime = {};
let nextTime = 0;
let nextFormatedTime = {};
let timerInterval = false;

/**
 * Get the time left in seconds.
 *
 * @returns {number} The time left in seconds.
 */
function getTimeLeft() {
  const eventTime = new Date(EVENT_DATE_TIME).getTime();
  const currentTime = Date.now();
  return Math.round((eventTime - currentTime) / 1000);
}

/**
 * Return the time formated in an object with days, hours, minutes and seconds.
 *
 * "Object.keys forEach...." part make sure that every number with only one digit
 * like 1/2/3/4/5/6/7/8/9 is prepended with a 0. Thats why instead of 7 hours you see
 * 07 hours.
 *
 * @param {number} seconds - The time in seconds.
 * @returns {object} The time formated in an object.
 */
function getFormatedTime(seconds) {
  const formatedTime = { seconds: seconds };
  formatedTime.days = Math.floor(formatedTime.seconds / 86400);
  formatedTime.seconds %= 86400;
  formatedTime.hours = Math.floor(formatedTime.seconds / 3600);
  formatedTime.seconds %= 3600;
  formatedTime.minutes = Math.floor(formatedTime.seconds / 60);
  formatedTime.seconds %= 60;
  Object.keys(formatedTime).forEach((unit) => {
    formatedTime[unit] = `0${formatedTime[unit].toString()}`.slice(-2);
  });
  return formatedTime;
}

/**
 * 
 * @param {*} displayCurrentTime 
 * @param {*} displayNextTime 
 * @param {*} unit 
 */
function createFlipPannel(displayCurrentTimeElt, displayCurrentTime, displayNextTime, display) {
  const pannel = document.createElement("div");
  const face = document.createElement("div");
  const back = document.createElement("div");
  const bottomNumber = document.createElement("span");
  const topNumber = document.createElement("span");
  pannel.classList.add("timer__pannel", "timer__pannel--flip");
  face.classList.add("timer__face", "timer__face--front");
  back.classList.add("timer__face", "timer__face--back");
  bottomNumber.classList.add("timer__number", "timer__number--bottom");
  topNumber.classList.add("timer__number", "timer__number--top");
  bottomNumber.innerText = displayCurrentTime;
  topNumber.innerText = displayNextTime;
  pannel.appendChild(face);
  face.appendChild(bottomNumber);
  pannel.appendChild(back);
  back.appendChild(topNumber);
  display.appendChild(pannel);
  gsap.to(".timer__pannel--flip", { rotationX: -180, duration: 0.5 });
  setTimeout(() => {
    displayCurrentTimeElt.innerText = displayNextTime;
    display.removeChild(pannel);
  }, 900);
}

/**
 * Display the time in the DOM, Only change the inner text.
 *
 * on the first call lastTimeLeft = false.
 * Time will be rendered to the DOM because number !== undefined.
 * lastTimeLeft is not FALSE because we try to get a days/hours/minutes/seconds property.
 * lastTimeLeft -> boolean (false) | lastTimeLeft.days -> undefined
 *
 * Conditions prevents the DOM to be updated each seconds when it is not needed.
 */
function displayTime(initialCall = false) {
  if (currentFormatedTime.days !== nextFormatedTime.days || initialCall) {
    daysNext.innerText = nextFormatedTime.days;
    daysCurrent.innerText = currentFormatedTime.days;
    if (!initialCall) createFlipPannel(daysCurrent, currentFormatedTime.days, nextFormatedTime.days, daysDisplay);
  }
  if (currentFormatedTime.hours !== nextFormatedTime.hours || initialCall) {
    hoursNext.innerText = nextFormatedTime.hours;
    hoursCurrent.innerText = currentFormatedTime.hours;
    if (!initialCall) createFlipPannel(hoursCurrent, currentFormatedTime.hours, nextFormatedTime.hours, hoursDisplay);
  }
  if (currentFormatedTime.minutes !== nextFormatedTime.minutes || initialCall) {
    minutesNext.innerText = nextFormatedTime.minutes;
    minutesCurrent.innerText = currentFormatedTime.minutes;
    if (!initialCall) createFlipPannel(minutesCurrent, currentFormatedTime.minutes, nextFormatedTime.minutes, minutesDisplay);
  }
  secondsNext.innerText = nextFormatedTime.seconds;
  secondsCurrent.innerText = currentFormatedTime.seconds;
  createFlipPannel(secondsCurrent, currentFormatedTime.seconds, nextFormatedTime.seconds, secondsDisplay);
}

/**
 * Mount the timer.
 */
export function mountTimer() {
  const timeLeft = getTimeLeft();
  currentTime = timeLeft;
  currentFormatedTime = getFormatedTime(currentTime);
  nextTime = currentTime - 1;
  nextFormatedTime = getFormatedTime(nextTime);
  displayTime(true);
  timerInterval = setInterval(() => {
    displayTime();
    if (currentTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = false;
    } else {
      currentTime = nextTime;
      currentFormatedTime = nextFormatedTime;
      nextTime = nextTime - 1;
      nextFormatedTime = getFormatedTime(nextTime);
    }
  }, 1000);
}
