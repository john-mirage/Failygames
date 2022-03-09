import { gsap } from 'gsap';

const daysCurrentTime = document.getElementsByClassName("days-current-time");
const hoursCurrentTime = document.getElementsByClassName("hours-current-time");
const minutesCurrentTime = document.getElementsByClassName("minutes-current-time");

const secondsCurrentTime = document.getElementsByClassName("seconds-current-time");
const secondsNextTime = document.getElementsByClassName("seconds-next-time");

const EVENT_DATE_TIME = "2022-03-20T20:00:00";

let daysLeft = 0;
let hoursLeft = 0;
let minutesLeft = 0;
let secondsLeft = 0;


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

function displayDays() {
  console.log(daysLeft + " days");
  for (let index = 0; index < 2; index++) {
    daysCurrentTime[index].innerText = daysLeft;
  }
}

function displayHours() {
  console.log(hoursLeft + " hours");
  for (let index = 0; index < 2; index++) {
    hoursCurrentTime[index].innerText = hoursLeft;
  }
}

function displayMinutes() {
  console.log(minutesLeft + " minutes");
  for (let index = 0; index < 2; index++) {
    minutesCurrentTime[index].innerText = minutesLeft;
  }
}

function displaySeconds() {
  console.log(secondsLeft + " seconds");
  const nextSecondsLeft = secondsLeft <= 0 ? 59 : secondsLeft - 1;
  for (let index = 0; index < 2; index++) {
    secondsCurrentTime[index].innerText = secondsLeft;
    secondsNextTime[index].innerText = nextSecondsLeft;
  }
  if (secondsLeft <= 0) {
    minutesLeft -= 1;
    secondsLeft = 59;
    displayMinutes();
  } else {
    secondsLeft -= 1;
  }
}

export function mountTimer() {
  const timeLeft = getTimeLeft();
  setTimeUnits(timeLeft);

  displayDays();
  displayHours();
  displayMinutes();
  displaySeconds();

  gsap.to("#seconds-flip-pannel", {
    rotationX: -180,
    duration: 1,
    repeat: -1,
    onRepeat: displaySeconds,
  });
}

/*
function updateTime() {
  currentTime = nextTime;
  currentFormatedTime = nextFormatedTime;
  nextTime = nextTime - 1;
  nextFormatedTime = getFormatedTime(nextTime);
}
*/

/*
currentTime = timeLeft;
currentFormatedTime = getFormatedTime(currentTime);
nextTime = currentTime - 1;
nextFormatedTime = getFormatedTime(nextTime);
*/

/*
Object.keys(formatedTime).forEach((unit) => {
  formatedTime[unit] = `0${formatedTime[unit].toString()}`.slice(-2);
});
*/

/*
gsap.to("#seconds-flip-pannel", {
  rotationX: -180,
  duration: 1,
  repeat: -1,
  onRepeat: displayTime,
});
*/