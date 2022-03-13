import { gsap } from 'gsap';

const VERTICAL_BREAKPOINT = 100;

class FloatingActionButton {

    /**
     * @constructor
     * @param {string} htmlElementId - The FAB html element id.
     */
    constructor(htmlElementId) {
        this.isVisible = false;
        this.htmlElement = document.getElementById(htmlElementId);
    }

    /**
     * Show the FAB.
     */
    show() {
        if (!this.isVisible) {
            gsap.to(this.htmlElement, { y: "-1.6rem", duration: 0.3 });
            this.isVisible = true;
        }
    }

    /**
     * Hide the FAB
     */
    hide() {
        if (this.isVisible) {
            gsap.to(this.htmlElement, { y: "100%", duration: 0.3 });
            this.isVisible = false;
        }
    }

    /**
     * Show when scrolling top.
     * 
     * @param {number} previousScrollY - The previous scroll Y value.
     * @param {number} currentScrollY - The current scroll Y value.
     */
    showOnScroll(previousScrollY, currentScrollY) {
        if (currentScrollY >= VERTICAL_BREAKPOINT) {
            if (currentScrollY < previousScrollY) {
                this.show();
            } else if (currentScrollY > previousScrollY) {
                this.hide();
            }
        } else if (currentScrollY <= VERTICAL_BREAKPOINT) {
            this.hide();
        }
    }

}

export default FloatingActionButton;