import "@styles/main.scss";
import ThemeManager from "@scripts/components/theme-manager";

const themeManager = new ThemeManager();




/**

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