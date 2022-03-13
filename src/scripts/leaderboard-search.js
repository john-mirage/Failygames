import Fuse from "fuse.js";

class LeaderboardSearch {

    /**
     * @constructor
     * @param {Leaderboard} leaderboard - The leaderboard.
     */
    constructor(leaderboard) {
        this.leaderboard = leaderboard;
        this.fuse = new Fuse(this.leaderboard.tableRows, { keys: ["team"] });
    }

    /**
     * Search in the leaderboard.
     * 
     * @param {string} userInput - The user search input. 
     */
    search(userInput) {
        if (userInput.length > 0) {
            const results = this.fuse.search(userInput).map((result) => result.item);
            this.leaderboard.displayTableBody(results);
            this.leaderboard.hasBeenSearched = true;
        } else {
            this.leaderboard.displayTableBody();
            this.leaderboard.hasBeenSearched = false;
        }
    }

}

export default LeaderboardSearch;