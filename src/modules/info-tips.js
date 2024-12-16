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

/* info-tips.js - src/modules/info-tips.js */
try {
    const jsonUrl = chrome.runtime.getURL('details/classInfo.json');
    const response = await fetch(jsonUrl);
    const infoClasses = await response.json();
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
} catch (error) {
    console.error('Error loading or parsing details/classInfo.json:', error);
}