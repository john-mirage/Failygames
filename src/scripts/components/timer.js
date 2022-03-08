// Get all the DOM elements for the timer.
const timeDays = document.getElementById("timer-days");
const timeHours = document.getElementById("timer-hours");
const timeMinutes = document.getElementById("timer-minutes");
const timeSeconds = document.getElementById("timer-seconds");

/**
 * Set the event date time.
 *
 * @constant {string} EVENT_DATE_TIME - The event date time.
 */
const EVENT_DATE_TIME = "2022-03-20T20:00:00";

/**
 * Previous time left.
 *
 * This variable is used to prevent the re-render of the time units that are unchanged since
 * the previous time left.
 *
 * @example
 * ->13<- 10 00 00  will change to ->13<- 09 59 59
 * 13 do not need to be re-render on the DOM.
 */
let previousTimeLeft = false;

/**
 * Current time left.
 *
 * This variable is used as a reference.
 *
 * This variable is also used to prevent the re-render of the time units that are unchanged since
 * the previous time left.
 *
 * @example
 * ->13<- 10 00 00  will change to ->13<- 09 59 59
 * 13 do not need to be re-render on the DOM.
 */
let currentTimeLeft = getTimeLeft();

/**
 * Initial interval state.
 */
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
 * Display the time in the DOM, Only change the inner text.
 *
 * on the first call lastTimeLeft = false.
 * Time will be rendered to the DOM because number !== undefined.
 * lastTimeLeft is not FALSE because we try to get a days/hours/minutes/seconds property.
 * lastTimeLeft -> boolean (false) | lastTimeLeft.days -> undefined
 *
 * Conditions prevents the DOM to be updated each seconds when it is not needed.
 *
 * @param {number} seconds - The time in seconds.
 */
function displayTime(seconds = currentTimeLeft) {
  const time = getFormatedTime(seconds);
  if (time.days !== previousTimeLeft.days) timeDays.innerText = time.days;
  if (time.hours !== previousTimeLeft.hours) timeHours.innerText = time.hours;
  if (time.minutes !== previousTimeLeft.minutes)
    timeMinutes.innerText = time.minutes;
  timeSeconds.innerText = time.seconds;
  previousTimeLeft = time;
}

/**
 * Decrease the time by one second.
 *
 * If the time is 0, the function will unmount the timer.
 */
function decreaseTime() {
  currentTimeLeft = currentTimeLeft - 1;
  displayTime(currentTimeLeft);
  if (currentTimeLeft <= 0) unMountTimer();
}

/**
 * Mount the timer.
 */
export function mountTimer() {
  displayTime();
  timerInterval = setInterval(decreaseTime, 1000);
}

/**
 * Unmount the timer.
 */
export function unMountTimer() {
  clearInterval(timerInterval);
  timerInterval = false;
}
