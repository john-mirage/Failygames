import { gsap } from 'gsap';

class Scrim {

    /**
     * @constructor
     */
    constructor() {
        this.htmlElement = false;
        this.isMounted = false;
    }

    /**
     * Mount the scrim on the DOM.
     */
    mount() {
        if (!this.isMounted) {
            if (!this.htmlElement) {
                this.htmlElement = document.createElement("div");
                this.htmlElement.classList.add("scrim");
            }
            document.body.prepend(this.htmlElement);
            gsap.to(this.htmlElement, { opacity: 1, duration: 0.3 });
            this.isMounted = true;
        }
    }

    /**
     * Unmount the scrim from the DOM.
     */
    unmount() {
        if (this.isMounted) {
            gsap.to(this.htmlElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    document.body.removeChild(this.htmlElement);
                },
            });
            this.isMounted = false;
        }
    }

}

export default Scrim;