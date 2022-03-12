import "@pages/index/index.scss";
import ThemeManager from "@scripts/theme-manager";
import ToggleButton from "@scripts/toggle-button";

const themeManager = new ThemeManager();
const themeToggleButton = new ToggleButton("theme-toggle-button", "toggle-button--active");

if (themeManager.theme === "dark") {
    themeToggleButton.activate();
}

themeToggleButton.htmlElement.addEventListener("click", () => {
    themeManager.toggleTheme();
    themeToggleButton.toggle();
});

/**
 * 
 *
 const drawer = document.getElementById("drawer");
const hamburgerButton = document.getElementById("hamburger-button");
const scrim = document.getElementById("scrim");

const daysCurrentTime = document.getElementsByClassName("days-current-time");
const daysNextTime = document.getElementsByClassName("days-next-time");
const hoursCurrentTime = document.getElementsByClassName("hours-current-time");
const hoursNextTime = document.getElementsByClassName("hours-next-time");
const minutesCurrentTime = document.getElementsByClassName("minutes-current-time");
const minutesNextTime = document.getElementsByClassName("minutes-next-time");
const secondsCurrentTime = document.getElementsByClassName("seconds-current-time");
const secondsNextTime = document.getElementsByClassName("seconds-next-time");

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

* event.preventDefault();
gsap.registerPlugin(ScrollToPlugin);
gsap.to(window, {duration: 0.5, scrollTo: 0});

function handleScroll() {
const currentScrollY = window.scrollY;
document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
//fadeTopAppBarOnScroll();
showFloatingActionButtonOnScroll();
document.documentElement.style.setProperty('--previous-scroll-y', `${currentScrollY}px`);
}

function handleResize() {
closeDrawerOnDesktop();
}

function mountGlobalListeners() {
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);
}

mountGlobalListeners();
mountDrawer();
mountTimer();
mountFloatingActionButton();

window.addEventListener("load", () => {
document.body.classList.remove("preload");
})

const tabSwiper = new Swiper("#swiper-tabs", {
slidesPerView: 3,
loopedSlides: 5,
resistanceRatio: 0,
watchSlidesProgress: true,
});
const contentSwiper = new Swiper("#swiper-content", {
autoHeight: true,
resistanceRatio: 0,
loopedSlides: 5,
thumbs: {
swiper: tabSwiper,
},
});
*/