import { currentScrollY } from "@scripts/main";

/**
 * Get the drawer html element.
 */
const drawer = document.getElementById("drawer");

/**
 * Get the hamburger button html element.
 */
const hamburgerButton = document.getElementById("hamburger-button");
 
/**
 * Get the scrim html element.
 */
const scrim = document.getElementById("scrim");
 
/**
 * Initial drawer state
 * 
 * This variable is used to check the drawer state before applying logic
 * preventing useless actions and performance loss.
 *
 * @example
 * A drawer that is already open do not need to be open.
 */
let drawerIsOpen = false;
 
/**
 * Open the drawer.
 *
 * If the drawer is open, this function does nothing.
 *
 * @param {Event} event - The event.
 */
function openDrawer(event) {
  event.preventDefault();
  if (!drawerIsOpen) {
    drawer.classList.add("drawer--open");
    scrim.classList.add("scrim--visible");
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    drawerIsOpen = true;
  }
}
 
/**
 * Close the drawer.
 *
 * If the drawer is NOT open, this function does nothing.
 */
function closeDrawer() {
  if (drawerIsOpen) {
    const scrollY = document.body.style.top;
    drawer.classList.remove("drawer--open");
    scrim.classList.remove("scrim--visible");
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    drawerIsOpen = false;
  }
}
 
/**
 * Close the drawer (sidebar on the left) when user resize the viewport
 * to 1024px. Usefull for users who have devices that can switch to landscape mode.
 *
 * @example
 * Open project in mobile screen size, open drawer and resize the
 * screen to at least 1024px. Drawer should automatically close.
 */
export function closeDrawerOnDesktop() {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (isDesktop && drawerIsOpen) closeDrawer();
}
 
/**
 * Load the drawer logic.
 *
 */
export function mountDrawer() {
  hamburgerButton.addEventListener("click", openDrawer);
  scrim.addEventListener("click", closeDrawer);
}
 