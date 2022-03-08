const tabCarousel = document.getElementById("tab-list-carousel");

export function setTabCarouselMinHeight() {
    const tabCarouselHeight = tabCarousel.scrollHeight;
    tabCarousel.style.minHeight = `${tabCarouselHeight}px`;
}