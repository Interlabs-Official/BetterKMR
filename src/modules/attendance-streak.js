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

/* attendance-streak.js - src/modules/attendance-streak.js */
// I had to replace return with something that stopped the script, so I put "stop" and it worked lol
if (window.location.href.includes("attendance/week")) {

    const targetElement = document.querySelector(".page-title");

    chrome.storage.sync.get(["showAttendanceStreak"]).then((result) => {
        if (result.showAttendanceStreak && targetElement) {
            const injectedHTML = `
            <div class="box" style="background-color: #000; padding: 10px; position: relative;">
                <h4>You're on a</h4>
                <h1>1 / 200</h1>
                <h4>day attendance streak!</h4>
                <div class="close-buttons">
                    <button id="close-popup" class="close-btn">Close</button>
                    <button id="close-forever-popup" class="close-btn">Close and don't remind again</button>
                </div>
            </div><br>`;
            targetElement.insertAdjacentHTML("afterend", injectedHTML);

            document.getElementById("close-popup").addEventListener("click", () => {
                document.querySelector(".box").style.display = "none";
            });

            document.getElementById("close-forever-popup").addEventListener("click", () => {
                localStorage.setItem("hideAttendancePopup", true);
                document.querySelector(".box").style.display = "none";
            });
        }
    });

    const calendarCard = document.querySelector(".card-body");
    calendarCard.innerHTML += `
    <br>
    <img src="${chrome.runtime.getURL("icon/icon_transparent_48.png")}" width="24px" height="24px">
    <a href="https://support.google.com/calendar/answer/37118" target="_blank">
        Click here for instructions on importing into Google Calendar ꜛ
    </a>`;
}