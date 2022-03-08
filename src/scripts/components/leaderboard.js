import Fuse from "fuse.js";
import { debounce } from "lodash";

/**
 * Display The rows in the table.
 *
 * @param {object[]} tableData - The data objects.
 * @param {HTMLElement} tableElement - The table html element (tbody).
 */
function displayLeaderboardData(tableData, tableElement) {
  if (tableElement.hasChildNodes()) tableElement.innerHTML = "";
  tableData.forEach((row) => {
    const tableRow = document.createElement("tr");
    tableRow.classList.add("leaderboard__row");
    Object.values(row).forEach((value) => {
      const tableDataCell = document.createElement("td");
      tableDataCell.textContent = value;
      tableDataCell.classList.add("leaderboard__data");
      tableRow.appendChild(tableDataCell);
    });
    tableElement.appendChild(tableRow);
  });
}

/**
 * Handle the search of a team.
 *
 * @param {Event} event - The event.
 * @param {Fuse} fuse - The Fuse instance.
 * @param {object[]} tableData - The tableData.
 * @param {HTMLElement} tableElement - The table html element (tbody).
 */
function handleTableSearch(event, fuse, tableData, tableElement) {
  const userInput = event.target.value;
  if (userInput.length > 0) {
    const results = fuse.search(userInput).map((result) => result.item);
    displayLeaderboardData(results, tableElement);
  } else {
    displayLeaderboardData(tableData, tableElement);
  }
}

/**
 * Mount Leaderboard.
 *
 * @param {string} jsonFilename - The filename of the json file.
 * @param {string} tableId - The table html id (tbody).
 */
export function mountLeaderboard(tableData, tableId, searchBarId) {
  const tableElement = document.getElementById(tableId);
  const searchBarElement = document.getElementById(searchBarId);
  const fuse = new Fuse(tableData, { keys: ["team"] });
  const debouncedTableSearch = debounce(handleTableSearch, 500);
  searchBarElement.addEventListener("keyup", (event) => debouncedTableSearch(event, fuse, tableData, tableElement));
  displayLeaderboardData(tableData, tableElement);
}
