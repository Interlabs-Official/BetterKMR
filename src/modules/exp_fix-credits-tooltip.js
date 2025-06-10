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

/* exp_fix-credits-tooltip.js - src/modules/experiments/exp_fix-credits-tooltip.js */
chrome.storage.sync.get(["exp_fix_credits_tooltip"]).then((result) => {
    if (result["exp_fix_credits_tooltip"] != false) {
        if (window.location.href.includes("results_summary")) {
            const fixHeader = `
            .google-visualization-tooltip g text {
                fill: #000000 !important;
            }
            `
            const style = document.createElement('style');
            style.textContent = fixHeader;
            document.head.appendChild(style);
        }
    }
});
