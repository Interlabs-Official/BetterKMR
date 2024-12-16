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

/*
   List of scripts, in order, that get asynchronously loaded as modules on KAMAR pages.
   Note that if an error occurs in a script, it doesn't halt the execution of the next scripts.
   Don't forget to append your script(s) in "web_accessible_resources" in manifest.json.
*/
const scripts = [
    "src/modules/navbar.js",
    "src/modules/attendance-streak.js",
    "src/modules/upcoming-holiday-bar.js",
    "src/modules/settings.js",
    "src/modules/footer.js",
    "src/modules/info-tips.js",
]

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
            for (let i = 0; i < scripts.length; i++) {
                console.log(`%c[BetterKMR 📘] ` + `%cLoading dynamic module: ` + scripts[i], 'color: #0091EA', 'color: #fff');
                try {
                    const src = chrome.runtime.getURL(scripts[i]);
                    const contentMain = await import(src);
                } catch (error) {
                    console.log(`%c[BetterKMR 📕] ` + `%cFailed loading dynamic module "${scripts[i]}":\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                }
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