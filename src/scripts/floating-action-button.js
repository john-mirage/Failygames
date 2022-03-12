const VERTICAL_BREAKPOINT = 200;

class FloatingActionButton {

    /**
     * @constructor
     * @param {HTMLElement} htmlElement - The FAB html element.
     * @param {string} - The FAB active class.
     */
    constructor(htmlElement, htmlElementActiveClass) {
        this.isVisible = false;
        this.htmlElementActiveClass = htmlElementActiveClass;
        this.htmlElement = htmlElement;
    }

    /**
     * Show the FAB.
     */
    show() {
        if (!this.isVisible) {
            this.htmlElement.classList.add(this.htmlElementActiveClass);
            this.isVisible = true;
        }
    }

    /**
     * Hide the FAB
     */
    hide() {
        if (this.isVisible) {
            this.htmlElement.classList.remove(this.htmlElementActiveClass);
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