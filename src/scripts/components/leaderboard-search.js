import Fuse from "fuse.js";
import { debounce } from "lodash";

class LeaderboardSearch {

    constructor(leaderboard, searchBarId) {
        this.leaderboard = leaderboard;
        this.searchBar = document.getElementById(searchBarId);
        this.fuse = new Fuse(this.leaderboard.rows, { keys: ["team"] });
    }

    set current(leaderboard) {
        this.fuse = new Fuse(this.leaderboard.rows, { keys: ["team"] });
    }

    loadSearch(leaderboard = this.leaderboard) {
        const fuse = new Fuse(leaderboard.rows, { keys: ["team"] });
        const debouncedSearch = debounce(this.search, 500);
        this.searchBar.addEventListener("keyup", (event) => {
            const userInput = event.target.value;
            debouncedSearch(event, fuse, leaderboard.rows, leaderboard.table)
        });
    }

    search() {
        const userInput = event.target.value;
        if (userInput.length > 0) {
            const results = fuse.search(userInput).map((result) => result.item);
            displayLeaderboardData(results, tableElement);
        } else {
            displayLeaderboardData(tableData, tableElement);
        }
    }

}

export default LeaderboardSearch;