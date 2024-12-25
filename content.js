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
console.log(`%c[BetterKMR 📗] ` + `%cCore components loaded`, 'color: #9CCC65', 'color: #fff');

// thank you stack overflow
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

function loader() {
    waitForElm('body').then((elm) => {
        const loader = document.createElement('div');
        loader.className = 'loader';

        document.body.appendChild(loader);

        loader.style.visibility = "visible";

        function showContent() {
            loader.classList.add('hidden');
            document.getElementsByClassName("nav-and-main")[0].style.visibility = 'visible';
        }
        (async () => {
            try {
                var url = chrome.runtime.getURL("src/config/scripts.yml")

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            console.log(`%c[BetterKMR 📕] ` + `%cCritical failure! Failed to load base framework "frameworks/js-yaml.min.js":\n      ` + `%cBetterKMR base HTTP error! status: ${response.status}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                        }
                        return response.text();
                    })
                    .then(data => {
                        const yamlToJson = jsyaml.load(data);
                        (async () => {
                            for (let i = 0; i < yamlToJson.length; i++) {
                                console.log(`%c[BetterKMR 📘] ` + `%cLoading dynamic module: ` + yamlToJson[i], 'color: #0091EA', 'color: #fff');
                                try {
                                    var src = chrome.runtime.getURL(yamlToJson[i]);
                                    await import(src);
                                } catch (error) {
                                    console.log(`%c[BetterKMR 📕] ` + `%cFailed loading dynamic module "${yamlToJson[i]}":\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                                }
                            }
                        })();
                    })
                    .catch(error => {
                        console.log(`%c[BetterKMR 📕] ` + `%cCritical failure! Failed to load base framework "frameworks/js-yaml.min.js":\n      ` + `%cBetterKMR failed to fetch the file: ${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                    });
            } catch (error) {
                console.log(`%c[BetterKMR 📕] ` + `%cCritical failure! Failed to load base framework "frameworks/js-yaml.min.js":\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
            }
        })();
        const startTime = Date.now();
        const minDelay = 500;

        const remainingTime = minDelay - (Date.now() - startTime);

        if (remainingTime > 0) {
            setTimeout(showContent, remainingTime);
        } else {
            showContent();
        }
    });
}
loader();