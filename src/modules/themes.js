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
import jsyaml from 'js-yaml';
// webpack needs this context for some reason to stop it from showing a warning
const themesJsContext = require.context('../themes/js/', false, /\.js$/);
let themeLoaded = false;
// thank you stack overflow - copied from content.js

/* apparently this can do something */
function addPreconnect() {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = chrome.runtime.getURL('');
    document.head.appendChild(link);
}

function waitForElm(selector) {
    return new Promise(resolve => {
        const element = document.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        const observer = new MutationObserver(mutations => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

const UUID_REGEX = /^[a-z,0-9,-]{36,36}$/;

function isCustomUUID(id) {
    return UUID_REGEX.test(id);
}

function addStyle(styleString) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(styleString));
    document.head.appendChild(style);
}

// code to hide the school logo until all has loaded. works really well on pure dark theme.
waitForElm(".sk_header_content").then(element => {
    addPreconnect();
    element.style.visibility = "hidden";
});

fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/config/themes.yml"))
    .then(response => response.text())
    .then(data => {
        if (!themeLoaded) { // prevents double loading
            const yamlToJson = jsyaml.load(data);
            injectTheme(yamlToJson);
            themeLoaded = true;
        }
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
                            const jsFileName = themePath["js"];
                            const module = await themesJsContext(`./${jsFileName}`);
                            if (module.default) {
                                module.default();
                            }
                        } catch (error) {
                            console.log(`%c[BetterKMR 📕] ` + `%cFailed loading external JS for "${themePath["name"]}":\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                        }
                    })();
                }
            } else if (isCustomUUID(url)) { // is custom theme
                chrome.storage.local.get('themes', function(data) {
                    let themes = data.themes || {};
                    let theme = themes[url];
                    if (theme) {
                        holdfunc.notify("The custom theme you have chosen \"" + theme.name + "\" will now load.");
                        addStyle(theme.code);
                    }
                });
            }
        });
    }