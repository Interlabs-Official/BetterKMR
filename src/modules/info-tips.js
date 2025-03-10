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

/* info-tips.js - src/modules/info-tips.js */

chrome.storage.sync.get(["show_attendance_info_class_name_tips"]).then((result) => {
    if (result["show_attendance_info_class_name_tips"] == "false" || result["show_attendance_info_class_name_tips"] == false) {
        return;
    }

    try {
        fetch(/* webpackIgnore: true */ chrome.runtime.getURL("details/classLists/school01.yml"))
        .then(response => response.text())
        .then(data => {
            const infoClasses = jsyaml.load(data);
            const targets = document.querySelectorAll(".b-block");
            targets.forEach((target) => {
                const key = target.textContent.trim();
                if (infoClasses[key]) {
                    const tooltipHTML = `
                        <div class="tooltip" style="">🛈
                            <span class="tooltiptext" data-tooltip="${infoClasses[key]}">${infoClasses[key]}</span>
                        </div>
                        `;
                    target.innerHTML += tooltipHTML;
                }
            });
        })
        .catch(error => console.error("Failed to load school list:", error));
    } catch (error) {
        console.error('Error loading or parsing details/classLists/school01.yml:', error);
    }
});