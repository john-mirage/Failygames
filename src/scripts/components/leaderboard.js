import Fuse from "fuse.js";

/**
 * Get the leaderboard data from json file.
 *
 * @param {HTMLElement} jsonFilename - The filename of the json file.
 */
async function getLeaderboardData(jsonFilename) {
  return await fetch(`./src/data/${jsonFilename}.json`)
    .then((response) => response.json())
    .then((data) => data);
}

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
  if (userInput.length > 2) {
    const results = fuse.search(userInput).map((result) => result.item);
    displayLeaderboardData(results, tableElement);
  } else if (userInput.length <= 0) {
    displayLeaderboardData(tableData, tableElement);
  }
}

/**
 * Mount Leaderboard.
 *
 * @param {string} jsonFilename - The filename of the json file.
 * @param {string} tableId - The table html id (tbody).
 */
export async function mountLeaderboard(jsonFilename, tableId, searchBarId) {
  const tableElement = document.getElementById(tableId);
  const searchBarElement = document.getElementById(searchBarId);
  const tableData = await getLeaderboardData(jsonFilename);
  const fuse = new Fuse(tableData, { keys: ["team"] });
  searchBarElement.addEventListener("keyup", (event) => {
    handleTableSearch(event, fuse, tableData, tableElement);
  });
  displayLeaderboardData(tableData, tableElement);
}
