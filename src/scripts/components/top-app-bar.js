/**
 * Get the top app bar html element.
 */
 const topAppBar = document.getElementById("top-app-bar");

 /**
  *
  */
 const topAppBarLabels = document.getElementsByClassName("top-app-bar__label");
 
 /**
  *
  */
 const hamburgerButton = document.getElementById("hamburger-button");
 
 /**
  *
  */
 let topAppBarIsFaded = false;
 
 /**
  *
  */
 function fadeTopAppBar() {
   if (!topAppBarIsFaded) {
     topAppBar.classList.add("top-app-bar--dark");
     for (let index = 0; index < topAppBarLabels.length; index++) {
       topAppBarLabels[index].classList.add("top-app-bar__label--on-dark");
     }
     hamburgerButton.classList.add("hamburger-button--on-dark");
     topAppBarIsFaded = true;
   }
 }
 
 /**
  *
  */
 function showTopAppBar() {
   if (topAppBarIsFaded) {
     topAppBar.classList.remove("top-app-bar--dark");
     for (let index = 0; index < topAppBarLabels.length; index++) {
       topAppBarLabels[index].classList.remove("top-app-bar__label--on-dark");
     }
     hamburgerButton.classList.remove("hamburger-button--on-dark");
     topAppBarIsFaded = false;
   }
 }
 
 /**
  * Fade the top app bar when user scroll down.
  *
  * @param {number} currentScrollY - The current vertical scroll value.
  */
 export function fadeTopAppBarOnScroll(currentScrollY) {
   if (currentScrollY > 0) {
     fadeTopAppBar();
   } else if (currentScrollY <= 0) {
     showTopAppBar();
   }
 }
 