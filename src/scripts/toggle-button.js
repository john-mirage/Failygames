class ToggleButton {

    /**
     * @constructor
     * @param {string} htmlElementId - The toggle button html element id.
     * @param {string} htmlElementActiveClass - The toggle button active class.
     */
    constructor(htmlElementId, htmlElementActiveClass) {
        this.htmlElement = document.getElementById(htmlElementId);
        this.htmlElementActiveClass = htmlElementActiveClass;
        this.isActive = false;
    }

    /**
     * Toggle the button.
     */
    toggle() {
        if (this.isActive) {
            this.deactivate();
        } else if (!this.isActive) {
            this.activate();
        }
    }

    /**
     * Activate the toggle button.
     */
    activate() {
        if (!this.isActive) {
            this.htmlElement.classList.add(this.htmlElementActiveClass);
            this.isActive = true;
        }
    }

    /**
     * Deactivate the toggle button.
     */
    deactivate() {
        if (this.isActive) {
            this.htmlElement.classList.remove(this.htmlElementActiveClass);
            this.isActive = false;
        }
    }

}

export default ToggleButton;