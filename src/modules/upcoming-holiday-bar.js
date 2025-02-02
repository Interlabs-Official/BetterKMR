/*
    BetterKMR for Chrome
    Copyright (C) 2025 InterLabs

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
if (window.location.href.includes("attendance/week")) {
    chrome.storage.sync.get(["upcoming-public-holiday-bar"]).then((result) => {
        if (result["upcoming-public-holiday-bar"] == "false" || result["upcoming-public-holiday-bar"] == false) {
            return;
        }

        const holidays = [
            {
                name: "New Year's Day",
                date: "2025-01-01",
                colors: ["#ffffff", "#ff0000"]
            }, // White and Red
            {
                name: "Day after New Year's Day",
                date: "2025-01-02",
                colors: ["#ffffff", "#00bcd4"]
            }, // White and Cyan
            {
                name: "Waitangi Day",
                date: "2025-02-06",
                colors: ["#000000", "#ffffff"]
            }, // Black and White
            {
                name: "Good Friday",
                date: "2025-04-18",
                colors: ["#8b0000", "#000000"]
            }, // Dark Red and Black
            {
                name: "Easter Monday",
                date: "2025-04-21",
                colors: ["#ffff00", "#ffa500"]
            }, // Yellow and Orange
            {
                name: "Anzac Day",
                date: "2025-04-25",
                colors: ["#ff0000", "#000000"]
            }, // Red and Black
            {
                name: "King's Birthday",
                date: "2025-06-02",
                colors: ["#ffffff", "#00008b"]
            }, // White and Dark Blue
            {
                name: "Matariki",
                date: "2025-06-20",
                colors: ["#2e2e2e", "#1e90ff"]
            }, // Grey and Light Blue
            {
                name: "Labour Day",
                date: "2025-10-27",
                colors: ["#ffffff", "#ff4500"]
            }, // White and Orange-Red
            {
                name: "Christmas Day",
                date: "2025-12-25",
                colors: ["#ffffff", "#ff0000"]
            }, // White and Red
            {
                name: "Boxing Day",
                date: "2025-12-26",
                colors: ["#00ff00", "#ffffff"]
            } // Green and White
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
                const [color1, color2] = nextHoliday.colors;

                const injectedHTML = `
                <div class="box-bcd" style="
                    --gradient-color1: ${color1};
                    --gradient-color2: ${color2};
                    background-color: #004d40; 
                    color: white; 
                    padding: 10px; 
                    position: relative;">
                    <h4 class="h4-upc-pub-hld-left">Next Public Holiday</h4>
                    <h1>${nextHoliday.name}</h1>
                    <h4 class="h4-upc-pub-hld-right">on ${new Date(nextHoliday.date).toLocaleDateString()}</h4>
                    <div class="close-buttons">
                        <button id="close-popup" class="close-btn" style="background-color: #ff5722; color: white; border: none; padding: 5px;">Close</button>
                    </div>
                </div><br>`;

                targetElement.insertAdjacentHTML("afterend", injectedHTML);

                document.getElementById("close-popup").addEventListener("click", () => {
                    document.querySelector(".box-bcd").style.display = "none";
                });
            }
        }
    });
}