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

/* footer.js - src/modules/footer.js */
const footer = document.getElementById("footer");
if (footer) {
    const schoolName = document.getElementsByClassName("sk_school_name")[0];
    if (schoolName) {
        footer.innerHTML = `
        <div class="container">
            <p>2024 - ${schoolName.textContent.trim()}. BetterKMR v${chrome.runtime.getManifest().version}</p>
        </div>`;
    }
}