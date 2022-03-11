import "@styles/main.scss";
import { mountDrawer, closeDrawerOnDesktop } from "@scripts/components/drawer";
import { mountTimer } from "@scripts/components/timer";
import { mountFloatingActionButton, showFloatingActionButtonOnScroll } from "@scripts/components/floating-action-button";
import { fadeTopAppBarOnScroll } from "@scripts/components/top-app-bar";
import { mountLeaderboard } from "@scripts/components/leaderboard";
import globalJson from "@data/global.json";
import firstQualificationJson from "@data/q1.json";
import secondQualificationJson from "@data/q2.json";
import thirdQualificationJson from "@data/q3.json";

/**
 * Handle the scrolling of the page.
 */
function handleScroll() {
  const currentScrollY = window.scrollY;
  document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
  //fadeTopAppBarOnScroll();
  showFloatingActionButtonOnScroll();
  document.documentElement.style.setProperty('--previous-scroll-y', `${currentScrollY}px`);
}

/**
 * Handle the resize of the page.
 */
function handleResize() {
  closeDrawerOnDesktop();
}

/**
 * Mount global listeners to the page.
 */
function mountGlobalListeners() {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
}

/**
 * Initialization.
 */
//fadeTopAppBarOnScroll(window.scrollY);
mountGlobalListeners();
mountDrawer();
mountTimer();
mountFloatingActionButton();
mountLeaderboard(globalJson, "leaderboard-global", "search-bar-global");
mountLeaderboard(firstQualificationJson, "leaderboard-q1", "search-bar-q1");
mountLeaderboard(secondQualificationJson, "leaderboard-q2", "search-bar-q2");
mountLeaderboard(thirdQualificationJson, "leaderboard-q3", "search-bar-q3");

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
})

const themeToggler = document.getElementById("theme-toggler");
const themeTogglerDot = document.getElementById("theme-toggler-dot");
themeToggler.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  themeTogglerDot.classList.toggle("toggle-button__dot--active");
});