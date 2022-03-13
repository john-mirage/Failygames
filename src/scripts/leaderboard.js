import goldMedal from "@images/gold-medal.svg";
import silverMedal from "@images/silver-medal.svg";
import bronzeMedal from "@images/bronze-medal.svg";
import { isEqual } from "lodash";

class Leaderboard {

    /**
     * @constructor
     * @param {object} table - The table object. 
     */
    constructor(table) {
        this.tableRows = table.rows;
        this.tableHead = document.getElementById(table.head);
        this.tableBody = document.getElementById(table.body);
        this.tableColumns = this.getTableColumns();
        this.hasBeenSearched = false;
        this.sortTable();
        this.displayTable();
    }

    /**
     * Get the table columns.
     * 
     * @returns {string[]} The table column names.
     */
    getTableColumns() {
        if (this.tableRows.length > 0 && Array.isArray(this.tableRows)) {
            const firstRowColumns = Object.keys(this.tableRows[0]);
            const tableColumnsAreValid = this.tableRows.every((tableRow, index) => {
                return index > 0 ? isEqual(firstRowColumns, Object.keys(tableRow)) : true;
            });
            if (!tableColumnsAreValid) {
                throw new Error("The JSON file objects are not valid");
            } else {
                return firstRowColumns;
            }
        } else {
            throw new Error("The JSON file is not valid");
        }
    }

    /**
     * Sort the table by points.
     * 
     * @todo
     * check if the points property is present.
     */
    sortTable() {
        let previousPoints = 0;
        let currentPosition = 1;
        this.tableRows.sort((a, b) => b.points - a.points);
        this.tableRows = this.tableRows.map((row, index) => {
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
     * Get the medal corresponding to a position.
     * 
     * @param {number} position - The position.
     * @returns {HTMLElement} The medal image as HTML Element.
     */
    getMedal(position) {
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
     * Display the table head.
     */
    displayTableHead() {
        const tableRow = document.createElement("tr");
        this.tableColumns = ["position", ...this.tableColumns];
        this.tableColumns.forEach((tableColumn) => {
            const tableHeader = document.createElement("th");
            tableHeader.classList.add("leaderboard__header");
            tableHeader.setAttribute("scope", "col");
            tableHeader.innerText = tableColumn;
            tableRow.appendChild(tableHeader);
        });
        this.tableHead.appendChild(tableRow);
    }

    /**
     * Display the table body.
     * 
     * @param {object[]} rows - The rows to display in the table.
     */
    displayTableBody(rows = this.tableRows) {
        if (this.tableBody.hasChildNodes()) this.tableBody.innerHTML = "";
        rows.forEach((row) => {
            const tableRow = document.createElement("tr");
            tableRow.classList.add("leaderboard__row");
            Object.values(row).forEach((value, index) => {
                const tableCell = document.createElement("td");
                if (index === 0 && row.position <= 3) {
                    const tableCellText = document.createElement("span");
                    const medal = this.getMedal(row.position);
                    tableCellText.innerText = value;
                    tableCellText.classList.add("leaderboard__position");
                    tableCell.classList.add("leaderboard__data", "leaderboard__data--with-medal");
                    tableCell.appendChild(tableCellText);
                    tableCell.appendChild(medal);
                } else {
                    tableCell.innerText = value;
                    tableCell.classList.add("leaderboard__data");
                }
                tableRow.appendChild(tableCell);
            });
            this.tableBody.appendChild(tableRow);
        });
    }

    /**
     * Display the table head and body.
     */
    displayTable() {
        this.displayTableHead();
        this.displayTableBody();
    }

}

export default Leaderboard;