/*
    BetterKMR for Chrome
    Copyright (C) 2024 InterLabs

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* upcoming-holiday-bar.js - src/modules/upcoming-holiday-bar.js */
if (!window.location.href.includes("attendance/week")) stop;
    chrome.storage.sync.get(["upcoming-public-holiday-bar"]).then((result) => {
        if (result["upcoming-public-holiday-bar"] == "false" || result["upcoming-public-holiday-bar"] == false) {
            return;
        }
    const holidays = [
        { name: "New Year's Day", date: "2024-01-01" },
        { name: "Day After New Year's Day", date: "2024-01-02" },
        { name: "Waitangi Day", date: "2024-02-06" },
        { name: "Good Friday", date: "2024-03-29" },
        { name: "Easter Monday", date: "2024-04-01" },
        { name: "Anzac Day", date: "2024-04-25" },
        { name: "Queen's Birthday", date: "2024-06-03" },
        { name: "Matariki", date: "2024-07-19" },
        { name: "Labour Day", date: "2024-10-28" },
        { name: "Christmas Day", date: "2024-12-25" },
        { name: "Boxing Day", date: "2024-12-26" }
    ];

    const currentDate = new Date();
    let nextHoliday = null;

    for (const holiday of holidays) {
        const holidayDate = new Date(holiday.date);
        if (holidayDate >= currentDate) {
            nextHoliday = holiday;
            break;
        }
    }

    if (nextHoliday) {
        const targetElement = document.querySelector(".page-title");
        if (targetElement) {
            const injectedHTML = `
                <div class="box-bcd" style="background-color: #004d40; color: white; padding: 10px; position: relative;">
                    <h4 class="h4-upc-pub-hld-left">Upcoming Public Holiday</h4>
                    <h1>${nextHoliday.name}</h1>
                    <h4 class="h4-upc-pub-hld-right">on ${new Date(nextHoliday.date).toLocaleDateString()}</h4>
                    <div class="close-buttons">
                        <button id="close-popup" class="close-btn" style="background-color: #ff5722; color: white; border: none; padding: 5px;">Close</button>
                    </div>
                </div><br>`;
            targetElement.insertAdjacentHTML("afterend", injectedHTML);

            document.getElementById("close-popup").addEventListener("click", () => {
                document.querySelector(".box").style.display = "none";
            });
        }
    }
});