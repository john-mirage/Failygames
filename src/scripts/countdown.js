import { gsap } from 'gsap';

const EVENT_DATE_TIME = "2022-03-20T20:00:00";

const flipAnimationOptions = { rotateX: -180, duration: 0.5 };

class Countdown {

    /**
     * @constructor
     * @param {object} timeHtmlElements - HTML elements used to display the time.
     */
    constructor(timeHtmlElements) {
        this.timeLeft = this.getTimeLeft();
        this.daysLeft = 0;
        this.hoursLeft = 0;
        this.minutesLeft = 0;
        this.secondsLeft = 0;
        this.daysAnimation = false;
        this.hoursAnimation = false;
        this.minutesAnimation = false;
        this.secondsFlipAnimation = false;
        this.daysHtmlElements = timeHtmlElements.days;
        this.hoursHtmlElements = timeHtmlElements.hours;
        this.minutesHtmlElements = timeHtmlElements.minutes;
        this.secondsHtmlElements = timeHtmlElements.seconds;
        if (this.timeLeft <= 0) {
            this.launchFireworks();
        } else {
            this.setTimeUnits();
            this.countdown = setInterval(() => {
                this.displayTime();
            }, 1000);
        }
        this.initialCall = true;
        this.displayTime();
        this.initialCall = false;
    }

    /**
     * Get the time left in seconds.
     * 
     * @returns {number} The timeleft.
     */
    getTimeLeft() {
        const eventDateTime = new Date(EVENT_DATE_TIME).getTime();
        const currentDateTime = Date.now();
        return Math.round((eventDateTime - currentDateTime) / 1000);
    }

    /**
     * Set the time units based on the time left in seconds.
     */
    setTimeUnits() {
        let timeLeft = this.timeLeft;
        this.daysLeft = Math.floor(timeLeft / 86400);
        timeLeft %= 86400;
        this.hoursLeft = Math.floor(timeLeft / 3600);
        timeLeft %= 3600;
        this.minutesLeft = Math.floor(timeLeft / 60);
        this.secondsLeft = timeLeft % 60;
    }

    /**
     * Format time unit
     * 
     * If the time unit is less than 10, prepend the returned string with a 0.
     * 
     * @param {number} timeValue 
     * @returns {string} The formated time value as a string.
     */
    formatTimeUnit(timeValue) {
        return timeValue > 9 ? String(timeValue) : `0${timeValue}`;
    }

    /**
     * Display the days in the countdown.
     */
    displayDays() {
        const nextDaysLeft = this.daysLeft - 1;
        for (let index = 0; index < 2; index++) {
            this.daysHtmlElements.current[index].innerText = this.formatTimeUnit(this.daysLeft);
            this.daysHtmlElements.next[index].innerText = this.formatTimeUnit(nextDaysLeft);
        }
        if (!this.initialCall) {
            if (!this.daysAnimation) {
                this.daysAnimation = gsap.to("#days-flip-pannel", flipAnimationOptions);
            } else {
                this.daysAnimation.restart();
            }
            this.daysLeft = nextDaysLeft;
        }
    }

    /**
     * Display the hours in the countdown.
     */
    displayHours() {
        const nextHoursLeft = this.hoursLeft <= 0 ? 23 : this.hoursLeft - 1;
        for (let index = 0; index < 2; index++) {
            this.hoursHtmlElements.current[index].innerText = this.formatTimeUnit(this.hoursLeft);
            this.hoursHtmlElements.next[index].innerText = this.formatTimeUnit(nextHoursLeft);
        }
        if (!this.initialCall) {
            if (!this.hoursAnimation) {
                this.hoursAnimation = gsap.to("#hours-flip-pannel", flipAnimationOptions);
            } else {
                this.hoursAnimation.restart();
            }
            this.hoursLeft = nextHoursLeft;
        }
    }

    /**
     * Display the minutes in the countdown.
     */
    displayMinutes() {
        const nextMinutesLeft = this.minutesLeft <= 0 ? 59 : this.minutesLeft - 1;
        for (let index = 0; index < 2; index++) {
            this.minutesHtmlElements.current[index].innerText = this.formatTimeUnit(this.minutesLeft);
            this.minutesHtmlElements.next[index].innerText = this.formatTimeUnit(nextMinutesLeft);
        }
        if (!this.initialCall) {
            if (!this.minutesAnimation) {
                this.minutesAnimation = gsap.to("#minutes-flip-pannel", flipAnimationOptions);
            } else {
                this.minutesAnimation.restart();
            }
            this.minutesLeft = nextMinutesLeft;
        }
    }

    /**
     * Display the seconds in the countdown.
     */
    displaySeconds() {
        const nextSecondsLeft = this.secondsLeft <= 0 ? 59 : this.secondsLeft - 1;
        for (let index = 0; index < 2; index++) {
            this.secondsHtmlElements.current[index].innerText = this.formatTimeUnit(this.secondsLeft);
            this.secondsHtmlElements.next[index].innerText = this.formatTimeUnit(nextSecondsLeft);
        }
        if (!this.initialCall) {
            if (!this.secondsFlipAnimation) {
                this.secondsFlipAnimation = gsap.to("#seconds-flip-pannel", flipAnimationOptions);
            } else {
                this.secondsFlipAnimation.restart();
            }
            this.secondsLeft = nextSecondsLeft;
        }
    }

    /**
     * Display all the time units (days, hours, minutes, seconds) in the countdown.
     */
    displayTime() {
        const dayHasChanged = this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0;
        const hourHasChanged = this.minutesLeft <= 0 && this.secondsLeft <= 0;
        const minuteHasChanged = this.secondsLeft <= 0;
        if (this.timeLeft < 0 && !this.initialCall) {
            clearInterval(this.countdown);
            this.launchFireworks();
        } else {
            if (dayHasChanged || this.initialCall) this.displayDays();
            if (hourHasChanged || this.initialCall) this.displayHours();
            if (minuteHasChanged || this.initialCall) this.displayMinutes();
            this.displaySeconds();
            this.timeLeft -= 1;
        }
    }

    /**
     * Function used when the countdown is less or equal to 0.
     */
    launchFireworks() {
        console.log("FIREWORKS");
    }

}

export default Countdown;