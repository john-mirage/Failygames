import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

/**
* Get the floating action button html element.
*
* @constant {HTMLElement} floatingActionButton - The floating action button.
*/
const floatingActionButton = document.getElementById("floating-action-button");

/**
 * Set the vertical breakpoint that trigger the floating action button visibility.
 *
 * @constant {number} VERTICAL_BREAKPOINT - The vertical breakpoint.
 */
const VERTICAL_BREAKPOINT = 200;
 
/**
 * Floating Action Button initial visibility state.
 */
let floatingActionButtonIsVisible = false;
 
/**
 * Scroll the viewport of the user to the very top left.
 *
 * @param {Event} event - The event.
 */
function scrollTop(event) {
   event.preventDefault();
   gsap.registerPlugin(ScrollToPlugin);
   gsap.to(window, {duration: 0.5, scrollTo: 0});
}
 
/**
 * Show the floating action button on the page.
 *
 * If the floating action button is visible, this function does nothing.
 */
function showFloatingActionButton() {
  if (!floatingActionButtonIsVisible) {
    floatingActionButton.classList.add("floating-action-button--visible");
    floatingActionButtonIsVisible = true;
  }
}
 
/**
 * Hide the floating action button from the page.
 *
 * If the floating action button is not visible, this function does nothing.
 */
function hideFloatingActionButton() {
  if (floatingActionButtonIsVisible) {
    floatingActionButton.classList.remove("floating-action-button--visible");
    floatingActionButtonIsVisible = false;
  }
}
 
/**
 * Decide if the Floating action button in the bottom right of the screen
 * should be visible.
 *
 * To change the breakpoint, modify VERTICAL_BREAKPOINT constant at the top of the file.
 *
 * @example
 * If the user viewport is scrolled below VERTICAL_BREAKPOINT pixels,
 * FAB become visible if the user scroll up.
 * FAB become invisible if the user scroll down.
 *
 * If the user viewport is scrolled above VERTICAL_BREAKPOINT pixels,
 * FAB become invisible.
 */
export function showFloatingActionButtonOnScroll() {
  const previousScrollYPixels = document.documentElement.style.getPropertyValue('--previous-scroll-y');
  const currentScrollYPixels = document.documentElement.style.getPropertyValue('--scroll-y');
  const previousScrollY = Number(previousScrollYPixels.slice(0, -2));
  const currentScrollY = Number(currentScrollYPixels.slice(0, -2));
  if (currentScrollY >= VERTICAL_BREAKPOINT) {
    if (currentScrollY < previousScrollY) {
      showFloatingActionButton();
    } else if (currentScrollY > previousScrollY) {
      hideFloatingActionButton();
    }
  } else if (currentScrollY <= VERTICAL_BREAKPOINT) {
    hideFloatingActionButton();
  }
}
 
 /**
  * Mount the Floating Action Button.
  */
 export function mountFloatingActionButton() {
   floatingActionButton.addEventListener("click", scrollTop);
 }
 