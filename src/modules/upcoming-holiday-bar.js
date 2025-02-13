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
chrome.storage.sync.get(["public_holiday_bar-enabled_pages"]).then((result) => {
    if (result["public_holiday_bar-enabled_pages"]) {
        const mainResult = result["public_holiday_bar-enabled_pages"].split(", ");
        for (const item of mainResult) {
            if (window.location.href.includes(item)) {
                doEnabledPages();
                break;
            }
        }
    } else {
        if (window.location.href.includes("attendance/week") || window.location.href.includes("calendar")) {
            doEnabledPages();
        }
    }
});
function doEnabledPages() {
    chrome.storage.sync.get(["public_holiday_bar"]).then((result) => {
        if (result["public_holiday_bar"] == false) {
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
    
        // taken from lib.js in settings
        function loadSettingPromise(key) {
            return new Promise((resolve, reject) => {
              if (window.chrome && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.get(key, function(result) {
                  resolve(result[key]);
                });
              } else {
                resolve(JSON.parse(localStorage.getItem(key)));
              }
            });
          }

        let injectedHTML = null;
        //(function doHolidayBar() {
            if (nextHoliday) {
                let difference_in_time = new Date(nextHoliday.date).getTime() - currentDate.getTime();
                let difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
        
                const targetElement = document.querySelector(".page-title");
                
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                
                let holiday = new Date(nextHoliday.date);
                let dayNumber = holiday.getDate();
                let monthName = months[holiday.getMonth()];
                
                let ordinalSuffix = "th";
                if (!(dayNumber % 100 >= 11 && dayNumber % 100 <= 13)) {
                  if (dayNumber % 10 === 1) {
                    ordinalSuffix = "st";
                  } else if (dayNumber % 10 === 2) {
                    ordinalSuffix = "nd";
                  } else if (dayNumber % 10 === 3) {
                    ordinalSuffix = "rd";
                  }
                }
                
                let holidayDate = "on " + dayNumber + ordinalSuffix + " " + monthName;
                let dayDifference = "in " + difference_in_days + " days";
                if (difference_in_days <= 1) { 
                  dayDifference = "Tomorrow!"; 
                }
                var currentSelected = holidayDate; // by default                
                Promise.all([
                    loadSettingPromise("public_holiday_bar-show_actual_date"),
                    loadSettingPromise("public_holiday_bar-show_when_near"),
                  ]).then(([showActualDate, showWhenNear]) => {
                    if (targetElement) {
                        if (showActualDate == false || showActualDate == null) currentSelected = dayDifference;
                        if (showWhenNear == true && difference_in_days > 7) return;
                        const [color1, color2] = nextHoliday.colors;
        
                        injectedHTML = `
                        <div class="box-bcd" style="
                            --gradient-color1: ${color1};
                            --gradient-color2: ${color2};
                            background-color: #004d40; 
                            color: white; 
                            padding: 10px; 
                            position: relative;">
                            <h4 class="h4-upc-pub-hld-left">Next Public Holiday</h4>
                            <h1>${nextHoliday.name}</h1>
                            <h4 class="h4-upc-pub-hld-right">${currentSelected}</h4>
                            <div class="close-buttons">
                                <button id="close-popup" class="close-btn" style="background-color: #ff5722; color: white; border: none; padding: 5px;">Close</button>
                            </div>
                        </div><br>`;
        
                        targetElement.insertAdjacentHTML("afterend", injectedHTML);
        
                        document.getElementById("close-popup").addEventListener("click", () => {
                            document.querySelector(".box-bcd").style.display = "none";
                        });
                        console.log("done");
                    }
                });
            }
    });
}