class TeamGrid {

    constructor(teams, gridId) {
        this.teams = teams;
        this.grid = document.getElementById(gridId);
        this.displayTeams();
    }

    getTeamLetters(teamName) {
        return "ls";
    }

    getShortTeamDescription(teamDescription) {
        return `${teamDescription.slice(0, 37)}...`;
    }

    displayTeams() {
        this.teams.forEach((team) => {
            const card = document.createElement("div");
            const teamCard = document.createElement("div");
            const teamCardHeader = document.createElement("div");
            const teamCardBody = document.createElement("div");
            const teamCardLetters = document.createElement("span");
            const teamCardTitle = document.createElement("h2");
            const teamCardDescription = document.createElement("p");
            card.classList.add("card");
            teamCard.classList.add("team-card");
            teamCardHeader.classList.add("team-card__header");
            teamCardBody.classList.add("team-card__body");
            teamCardLetters.classList.add("team-card__letters");
            teamCardTitle.classList.add("team-card__title");
            teamCardDescription.classList.add("team-card__description");
            teamCardLetters.innerText = this.getTeamLetters(team.name);
            teamCardTitle.innerText = team.name;
            teamCardDescription.innerText = this.getShortTeamDescription(team.description);
            teamCardHeader.appendChild(teamCardLetters);
            teamCardBody.appendChild(teamCardTitle);
            teamCardBody.appendChild(teamCardDescription);
            teamCard.appendChild(teamCardHeader);
            teamCard.appendChild(teamCardBody);
            card.appendChild(teamCard);
            this.grid.appendChild(card);
        });
    }

    clearGrid() {
        this.grid.innerHTML = "";
    }

}

export default TeamGrid;