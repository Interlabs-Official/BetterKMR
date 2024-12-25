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

/* themes.js - src/modules/themes.js */
// One annoying thing is that it takes a second for the theme to load. Makes the page look weird.
 chrome.storage.local.get("cachedThemes").then((cache) => {
    if (cache.cachedThemes) {
        injectTheme(cache.cachedThemes);
    } else {
        fetch(chrome.runtime.getURL("src/config/themes.yml"))
            .then(response => response.text())
            .then(data => {
                const yamlToJson = jsyaml.load(data);
                chrome.storage.local.set({ "cachedThemes": yamlToJson });
                injectTheme(yamlToJson);
            })
            .catch(error => console.error("Failed to load themes:", error));
    }
});

function injectTheme(yamlToJson) {
    chrome.storage.sync.get(["theme-id-text"]).then((result) => {
        const url = result["theme-id-text"] || "0";
        const themePath = yamlToJson[url];
        if (themePath) {
            const link = document.createElement("link");
            link.href = chrome.runtime.getURL(themePath);
            link.type = "text/css";
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    });
}