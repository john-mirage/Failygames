import "swiper/scss";
import "swiper/scss/thumbs";
import "./index.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FloatingActionButton from "@scripts/floating-action-button";
import ThemeManager from "@scripts/theme-manager";
import ToggleButton from "@scripts/toggle-button";
import Drawer from "@scripts/drawer";
import Scrim from "@scripts/scrim";
import Countdown from "@scripts/countdown";

gsap.registerPlugin(ScrollToPlugin);

let currentScrollY = 0;
let previousScrollY = 0;

const hamburgerButton = document.getElementById("hamburger-button");

const themeManager = new ThemeManager();
const themeToggleButton = new ToggleButton("theme-toggle-button", "toggle-button--active");
const floatingActionButton = new FloatingActionButton("floating-action-button", "floating-action-button--visible");
const drawer = new Drawer("drawer");
const scrim = new Scrim();

const countdown = new Countdown({
    days: {
        current: document.getElementsByClassName("days-current-time"),
        next: document.getElementsByClassName("days-next-time"),
    },
    hours: {
        current: document.getElementsByClassName("hours-current-time"),
        next: document.getElementsByClassName("hours-next-time"),
    },
    minutes: {
        current: document.getElementsByClassName("minutes-current-time"),
        next: document.getElementsByClassName("minutes-next-time"),
    },
    seconds: {
        current: document.getElementsByClassName("seconds-current-time"),
        next: document.getElementsByClassName("seconds-next-time"),
    },
});

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
