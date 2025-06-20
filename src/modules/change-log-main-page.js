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

/* change-log-main-page.js - src/modules/change-log-main-page.js */
import jsyaml from 'js-yaml';
function doStuff() {
    chrome.storage.sync.get(['update_notice_closed'], function(result) {
        if (result.update_notice_closed == true) return;
        try {
            var url = chrome.runtime.getURL("src/config/general.yml")
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  console.log(`%c[BetterKMR 📕] %cHTTP error! status: ${response.status}`, 'color: #F44336', 'color: #fff');
                }
                return response.text();
              })
              .then(data => {
                const yamlToJson = jsyaml.load(data);
                console.log(yamlToJson);
                if (yamlToJson["changelog-highlight"]) {
                    const mainNav = document.querySelector(".sk-main-content");
                    if (mainNav) {
                        mainNav.insertAdjacentHTML("beforebegin", `
                                    <div id="update-notice" class="update-notice">
                                        <span class="update-text">BetterKMR has updated to v${chrome.runtime.getManifest().version} - ${yamlToJson["changelog-highlight"]} Click here to read the change log.</span>
                                        <span class="smaller-text">This notice will go away when you refresh.</span>
                                    </div>
                            `)
                        document.getElementById("update-notice").addEventListener("click", () => {
                            window.open(
                                "https://interlabs-official.github.io/betterkmr-docs/changelog/1_2_2",
                                '_blank'
                            );
                        });
                        chrome.storage.sync.set({'update_notice_closed': true});
                    }
                }
        });
    } catch (e) {
        console.log(`%c[BetterKMR 📕] %cError occurred while loading update highlight: ${e}`, 'color: #F44336', 'color: #fff') ;
    }
    });
}

setTimeout(() => {
    doStuff();
}, 500);