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

/* themes.js - src/modules/themes.js */

// thank you stack overflow - copied from content.js
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

function isCustomUUID(id) {
    let regex = /^[a-z,0-9,-]{36,36}$/;
    return regex.test(id);
}

    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
      }

// code to hide the school logo until all has loaded. works really well on pure dark theme.
(async () => {
    let curInterval = setInterval(function() {
        if (document.getElementsByClassName("sk_header_content")[0]) {
            document.getElementsByClassName("sk_header_content")[0].style.visibility = "hidden";
            clearInterval(curInterval);
        }
    }, 40);
})();

fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/config/themes.yml"))
    .then(response => response.text())
    .then(data => {
        const yamlToJson = jsyaml.load(data);
        injectTheme(yamlToJson);
    })
    .catch(error => console.error("Failed to load themes:", error));

function injectTheme(yamlToJson) {
    chrome.storage.sync.get(["theme-id-text"]).then((result) => {
        const url = result["theme-id-text"] || "0";
        const themePath = yamlToJson[url];
        if (themePath) {
                holdfunc.notify("The theme you have chosen \"" + themePath["css"] + "\" will begin loading shortly.");
                const link = document.createElement("link");
                link.href = /* webpackIgnore: true */ chrome.runtime.getURL("src/themes/" + themePath["css"]);
                link.type = "text/css";
                link.rel = "stylesheet";
                document.head.appendChild(link);
                if (themePath["js"] != null) {
                    (async () => {
                        console.log(`%c[BetterKMR 📘] ` + `%cLoading external JS for theme: ` + themePath["name"], 'color: #0091EA', 'color: #fff');
                        try {
                            let src = /* webpackIgnore: true */ chrome.runtime.getURL("src/themes/js/" + themePath["js"]);
                            await import(src);
                        } catch (error) {
                            console.log(`%c[BetterKMR 📕] ` + `%cFailed loading external JS for "${themePath["name"]}":\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                        }
                    })();
                }
            } else {
                if (isCustomUUID(url)) { // is custom theme
                    chrome.storage.local.get('themes', function(data) {
                        let themes = data.themes || {};
                        let theme = themes[url];
                        if (theme) {
                            holdfunc.notify("The custom theme you have chosen \"" + theme.name + "\" will now load.");
                            addStyle(theme.code);
                        }
                    });
                }
            }
    });
}