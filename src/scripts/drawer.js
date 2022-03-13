import { gsap } from 'gsap';

class Drawer {

    /**
     * @constructor
     * @param {string} htmlElementId - The drawer Html element id.
     */
    constructor(htmlElementId) {
        this.isOpen = false;
        this.htmlElement = document.getElementById(htmlElementId);
    }

    /**
     * Open the drawer.
     * 
     * @param {number} currentScrollY - The current scroll Y value.
     */
    open(currentScrollY) {
        if (!this.isOpen) {
            gsap.to(this.htmlElement, { x: "0", duration: 0.3 });
            document.body.style.position = 'fixed';
            document.body.style.top = `-${currentScrollY}px`;
            document.body.style.left = '0';
            document.body.style.width = '100%';
            this.isOpen = true;
        }
    }

    /**
     * Close the drawer.
     */
    close() {
        if (this.isOpen) {
            const scrollY = document.body.style.top;
            gsap.to(this.htmlElement, { x: "-100%", duration: 0.3 });
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            this.isOpen = false;
        }
    }

}

export default Drawer;