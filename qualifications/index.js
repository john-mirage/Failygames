import "swiper/scss";
import "swiper/scss/thumbs";
import { debounce } from "lodash";
import "./index.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FloatingActionButton from "@scripts/floating-action-button";
import ThemeManager from "@scripts/theme-manager";
import ToggleButton from "@scripts/toggle-button";
import Drawer from "@scripts/drawer";
import Scrim from "@scripts/scrim";
import Leaderboard from "@scripts/leaderboard";
import globalTableRows from "@data/leaderboard/global.json";
import q1TableRows from "@data/leaderboard/q1.json";
import q2TableRows from "@data/leaderboard/q2.json";
import q3TableRows from "@data/leaderboard/q3.json";
import Swiper, { Thumbs, Navigation } from 'swiper';
import LeaderboardSearch from "@scripts/leaderboard-search";

gsap.registerPlugin(ScrollToPlugin);

let currentScrollY = 0;
let previousScrollY = 0;

const hamburgerButton = document.getElementById("hamburger-button");

const themeManager = new ThemeManager();
const themeToggleButton = new ToggleButton("theme-toggle-button", "toggle-button--active");
const floatingActionButton = new FloatingActionButton("floating-action-button", "floating-action-button--visible");
const drawer = new Drawer("drawer");
const scrim = new Scrim();

const globalLeaderboard = new Leaderboard({
    rows: globalTableRows,
    head: "leaderboard-head-global",
    body: "leaderboard-body-global",
});

const q1Leaderboard = new Leaderboard({
    rows: q1TableRows,
    head: "leaderboard-head-q1",
    body: "leaderboard-body-q1",
});

const q2Leaderboard = new Leaderboard({
    rows: q2TableRows,
    head: "leaderboard-head-q2",
    body: "leaderboard-body-q2",
});

const q3Leaderboard = new Leaderboard({
    rows: q3TableRows,
    head: "leaderboard-head-q3",
    body: "leaderboard-body-q3",
});

const leaderboards = [globalLeaderboard, q1Leaderboard, q2Leaderboard, q3Leaderboard];

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

const tabsSwiper = new Swiper("#swiper-tabs", {
    allowTouchMove: false,
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
});

const swiper = new Swiper("#swiper-content", {
    allowTouchMove: false,
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
    autoHeight: true,
    thumbs: {
        swiper: tabsSwiper,
    },
});

const leaderboardSearchBar = document.getElementById("leaderboard-search-bar");

function debounceSearch(leaderboardSearch, userInput) {
    leaderboardSearch.search(userInput);
}

const debouncedSearch = debounce(debounceSearch, 200);

swiper.on('slideChange', () => {
    debouncedSearch.cancel();
    leaderboardSearchBar.value = "";
    leaderboards.forEach((leaderboard) => {
        if (leaderboard.hasBeenSearched) leaderboard.displayTableBody();
    });
});

leaderboardSearchBar.addEventListener("keyup", (event) => {
    const userInput = event.target.value;
    const leaderboardSearch = new LeaderboardSearch(leaderboards[swiper.activeIndex]);
    debouncedSearch(leaderboardSearch, userInput)
});
