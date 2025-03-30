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

/* custom-page.js - src/modules/custom-page.js */
import jsyaml from 'js-yaml';
function doCustomPage() {
    try {
        var url = chrome.runtime.getURL("src/config/pages.yml")
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.log(`%c[BetterKMR 📕] %cHTTP error! status: ${response.status}`, 'color: #F44336', 'color: #fff');
                }
                return response.text();
            })
            .then(data => {
                const yamlToJson = jsyaml.load(data);
                Object.entries(yamlToJson["pages"]).forEach(([key, page]) => {
                    if (window.location.pathname == "/" + key.toLowerCase()) {
                        const sk_text = document.getElementsByClassName("sk_text")[0];
                        const sk_main = document.getElementsByClassName("sk-main")[0];
                        sk_text.remove();
                        try {
                            var secondURL = chrome.runtime.getURL(`/src/pages/${page}`);
                            fetch(secondURL)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    return response.text();
                                })
                                .then(data => {
                                    document.title = key + " (BetterKMR)";
                                    sk_main.innerHTML = "<br>" + data;
                                    sk_main.style.color = "#ffffff";
                                })
                                .catch(error => {
                                    console.log(
                                        `%c[BetterKMR 📕] %cFailed to load page ${page}: ${error}`, 
                                        'color: #F44336', 
                                        'color: #fff'
                                    );
                                    sk_main.innerHTML = `<div class="error" style="color: #fff; margin-top: 20px;"><img src="${/* webpackIgnore: true */ chrome.runtime.getURL("icon/icon_transparent_48.png")}" width="24px" height="24px"> Failed to load custom BetterKMR page. Please contact the author of this page and check the console for more information.</div>`;
                                });
                        } catch (e) {
                            console.log(
                                `%c[BetterKMR 📕] %cError occurred while loading custom page: ${e}`, 
                                'color: #F44336', 
                                'color: #fff'
                            );
                        }
                        /* to delete the whole lot, use document.documentElement.innerHTML = "" */
                    }
                });
            });
        } catch (e) {
            console.log(`%c[BetterKMR 📕] %cError occurred while loading custom page: ${e}`, 'color: #F44336', 'color: #fff') ;
        }
}
doCustomPage();
/*if (window.location.pathname == "/example-page") {
    const sk_text = document.getElementsByClassName("sk_text")[0];
    const sk_main = document.getElementsByClassName("sk-main")[0];
    sk_text.remove();

    /* sk_main.innerHTML = marked.parse(`
    <div class="sk_text sk_page sk-main-content">
        <br>
        <h1>Welcome to your custom BetterKMR page!</h1>
        <p>Here, you can define your own HTML as well as extra JavaScript and CSS.<br>
        If a page defined already exists, BetterKMR will automatically override it.</p>
	</div>
    # What's up?
    `)
    sk_main.innerHTML = marked.parse("# Welcome to your custom BetterKMR page! \nHere, you can define your own HTML as well as extra JavaScript and CSS.\n\nIf a page defined already exists, BetterKMR will automatically override it.\n\nCustom HTML pages also support standard markdown, too!")
    sk_main.style.color = "#ffffff"
} */