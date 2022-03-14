class SponsorGrid {

    constructor(sponsors, gridId) {
        this.sponsors = sponsors;
        this.grid = document.getElementById(gridId);
        this.displaySponsors();
    }

    getShortSponsorDescription(sponsorDescription) {
        return `${sponsorDescription.slice(0, 37)}...`;
    }

    displaySponsors() {
        this.sponsors.forEach((sponsor) => {
            const surface = document.createElement("div");
            const sponsorContainer = document.createElement("div");
            const sponsorLogo = document.createElement("div");
            const sponsorBody = document.createElement("div");
            const sponsorTitle = document.createElement("h2");
            const sponsorDescription = document.createElement("p");
            surface.classList.add("surface");
            sponsorContainer.classList.add("sponsor");
            sponsorLogo.classList.add("sponsor__logo");
            sponsorBody.classList.add("sponsor__body");
            sponsorTitle.classList.add("sponsor__title");
            sponsorDescription.classList.add("sponsor__description");
            sponsorTitle.innerText = sponsor.name;
            sponsorDescription.innerText = sponsor.description;
            sponsorBody.appendChild(sponsorTitle);
            sponsorBody.appendChild(sponsorDescription);
            sponsorContainer.appendChild(sponsorLogo);
            sponsorContainer.appendChild(sponsorBody);
            surface.appendChild(sponsorContainer);
            this.grid.appendChild(surface);
        });
    }

    clearGrid() {
        this.grid.innerHTML = "";
    }

}

export default SponsorGrid;