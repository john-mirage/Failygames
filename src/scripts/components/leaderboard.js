import Fuse from "fuse.js";
import { debounce } from "lodash";
import goldMedal from "@images/gold-medal.svg";
import silverMedal from "@images/silver-medal.svg";
import bronzeMedal from "@images/bronze-medal.svg";

function getMedalImage(position) {
  const image = document.createElement("img");
  image.classList.add("leaderboard__medal");
  switch (position) {
    case 1:
      image.setAttribute("src", goldMedal);
      image.setAttribute("alt", "Gold medal illustration");
      break;
    case 2:
      image.setAttribute("src", silverMedal);
      image.setAttribute("alt", "Silver medal illustration");
      break;
    case 3:
      image.setAttribute("src", bronzeMedal);
      image.setAttribute("alt", "Bronze medal illustration");
      break;
    default:
      throw new Error("The position is invalid");
  }
  return image;
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
    Object.values(row).forEach((value, index) => {
      const tableDataCell = document.createElement("td");
      if (index === 0 && row.position <= 3) {
        const tableDataCellText = document.createElement("span");
        const medalImage = getMedalImage(row.position);
        tableDataCellText.innerText = value;
        tableDataCellText.classList.add("leaderboard__position");
        tableDataCell.classList.add("leaderboard__data", "leaderboard__data--with-medal");
        tableDataCell.appendChild(tableDataCellText);
        tableDataCell.appendChild(medalImage);
      } else {
        tableDataCell.innerText = value;
        tableDataCell.classList.add("leaderboard__data");
      }
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
 * Sort the table data in descending order.
 * 
 * If two teams have the same amount of points,they will have the same position.
 * 
 * @param {object[]} tableData - The table data rows.
 * @returns {object[]} The sorted table data rows.
 */
function sortTableData(tableData) {
  let previousPoints = 0;
  let currentPosition = 1;
  const table = [...tableData];
  table.sort((a, b) => b.points - a.points);
  return table.map((row, index) => {
    if (index === 0) {
      previousPoints = row.points;
      return { position: currentPosition, ...row }
    } else {
      if (row.points === previousPoints) {
        return { position: currentPosition, ...row }
      } else {
        previousPoints = row.points;
        currentPosition += 1;
        return { position: currentPosition, ...row }
      }
    }
  });
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
  const sortedTableData = sortTableData(tableData);
  const fuse = new Fuse(sortedTableData, { keys: ["team"] });
  const debouncedTableSearch = debounce(handleTableSearch, 500);
  searchBarElement.addEventListener("keyup", (event) => debouncedTableSearch(event, fuse, sortedTableData, tableElement));
  displayLeaderboardData(sortedTableData, tableElement);
}
