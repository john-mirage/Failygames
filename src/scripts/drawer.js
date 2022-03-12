class Drawer {

    /**
     * @constructor
     * @param {HTMLElement} htmlElement - The drawer Html element.
     */
    constructor(htmlElement) {
        this.isOpen = false;
        this.htmlElement = htmlElement;
    }

    /**
     * Open the drawer.
     * 
     * @param {number} currentScrollY 
     */
    open(currentScrollY) {
        if (!this.isOpen) {
            this.htmlElement.classList.add("drawer--open");
            document.body.style.position = 'fixed';
            document.body.style.top = `-${currentScrollY}`;
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
            this.htmlElement.classList.remove("drawer--open");
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            this.isOpen = false;
        }
    }

    /**
     * Close the drawer on desktop.
     */
    closeOnDesktop() {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        if (isDesktop && this.isOpen) this.close();
    }

}

export default Drawer;