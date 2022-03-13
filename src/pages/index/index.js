import "@pages/index/index.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FloatingActionButton from "@scripts/floating-action-button";
import ThemeManager from "@scripts/theme-manager";
import ToggleButton from "@scripts/toggle-button";
import Drawer from "@scripts/drawer";
import Scrim from "@scripts/scrim";

gsap.registerPlugin(ScrollToPlugin);

let currentScrollY = 0;
let previousScrollY = 0;

const hamburgerButton = document.getElementById("hamburger-button");

const themeManager = new ThemeManager();
const themeToggleButton = new ToggleButton("theme-toggle-button", "toggle-button--active");
const floatingActionButton = new FloatingActionButton("floating-action-button", "floating-action-button--visible");
const drawer = new Drawer("drawer");
const scrim = new Scrim();

if (themeManager.theme === "dark") {
    themeToggleButton.activate();
}

window.addEventListener("scroll", () => {
    currentScrollY = window.scrollY;
    floatingActionButton.showOnScroll(previousScrollY, currentScrollY);
    previousScrollY = currentScrollY;
});

window.addEventListener("resize", () => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
        drawer.close();
        if (scrim.isMounted) scrim.htmlElement.removeEventListener("click", handleDrawerClosing);
        scrim.unmount();
    }
});

themeToggleButton.htmlElement.addEventListener("click", () => {
    themeManager.toggleTheme();
    themeToggleButton.toggle();
});

floatingActionButton.htmlElement.addEventListener("click", () => {
    gsap.to(window, {duration: 0.5, scrollTo: 0});
});

function handleDrawerClosing() {
    scrim.unmount();
    drawer.close();
}

hamburgerButton.addEventListener("click", () => {
    drawer.open(currentScrollY);
    scrim.mount();
    scrim.htmlElement.addEventListener("click", handleDrawerClosing, { once: true });
});

/**

scrim.addEventListener("click", () => {
                this.unmount(scrim);
            }, { once: true });
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