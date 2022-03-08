import "@styles/main.scss";
import { mountDrawer, closeDrawerOnDesktop } from "@scripts/components/drawer";
import { mountTimer } from "@scripts/components/timer";
import { mountFloatingActionButton, showFloatingActionButtonOnScroll } from "@scripts/components/floating-action-button";
import { fadeTopAppBarOnScroll } from "@scripts/components/top-app-bar";
import { mountLeaderboard } from "@scripts/components/leaderboard";
import { setTabCarouselMinHeight } from "@scripts/components/tab-list";

import globalJson from "@data/global.json";
import firstQualificationJson from "@data/q1.json";
import secondQualificationJson from "@data/q2.json";
import thirdQualificationJson from "@data/q3.json";


/**
 * Previous vertical scroll value.
 *
 * This variable is used to check if the current vertical scroll is
 * higher or lower than the previous value.
 */
let previousScrollY = 0;

/**
 * current vertical scroll value.
 *
 * This variable is used to check if the current vertical scroll is
 * higher or lower than the previous value.
 */
let currentScrollY = 0;

/**
 * Handle the scrolling of the page.
 */
function handleScroll() {
  currentScrollY = window.scrollY;
  fadeTopAppBarOnScroll(currentScrollY, previousScrollY);
  showFloatingActionButtonOnScroll(currentScrollY, previousScrollY);
  previousScrollY = currentScrollY;
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
fadeTopAppBarOnScroll(window.scrollY);
mountGlobalListeners();
mountDrawer();
mountTimer();
mountFloatingActionButton();
mountLeaderboard(globalJson, "leaderboard-global", "search-bar-global");
mountLeaderboard(firstQualificationJson, "leaderboard-q1", "search-bar-q1");
mountLeaderboard(secondQualificationJson, "leaderboard-q2", "search-bar-q2");
mountLeaderboard(thirdQualificationJson, "leaderboard-q3", "search-bar-q3");
setTabCarouselMinHeight();

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
})