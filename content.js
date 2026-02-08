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
import jsyaml from 'js-yaml';
console.log(`%c[BetterKMR 📗] ` + `%cCore components loaded. Dynamic modules will now begin loading.`, 'color: #9CCC65', 'color: #fff');

// thank you stack overflow
const waitForElm = function(selector) {
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

const ignoreList = [
    "src/modules/themes.js"
]

function getAllCustomPlugins(callback) {
	chrome.storage.local.get('plugins', data => callback(data.plugins || {}));
};

function addUserScript(code) {
  const script = document.createElement("script");
  script.textContent = code;
  document.head.appendChild(script);
}

function loader() {
  if (window.location.pathname === "/rss") {
    console.log(`%c[BetterKMR 📕] %cSkipping loading dynamic modules because this is not a direct Kamar page.`, 'color:rgb(105, 58, 138)', 'color: #fff');
    return;
  }
    waitForElm('body').then((elm) => {
        const loader = document.createElement('div');
        loader.className = 'very-loader';

        document.body.appendChild(loader);

        loader.style.visibility = "visible";

        function showContent(shouldFade) {
            loader.classList.add('hidden');
            const navAndMain = document.getElementsByClassName("nav-and-main")[0];
            if (shouldFade != false) {
              navAndMain.style.animation = 'fadeInAnimation ease 3s';
            }
            navAndMain.style.visibility = 'visible';
            const headerContent = document.getElementsByClassName("sk_header_content")[0];
            if (headerContent) {
              if (shouldFade != false) {
                headerContent.style.animation = 'fadeInAnimation ease 3s';
              }
              headerContent.style.visibility = "visible";
            }
        }
        (async () => {
            try {
              var url = chrome.runtime.getURL("src/config/scripts.yml")
              fetch(url)
                .then(response => {
                  if (!response.ok) {
                    console.log(`%c[BetterKMR 📕] %cHTTP error! status: ${response.status}`, 'color: #F44336', 'color: #fff');
                  }
                  return response.text();
                })
                .then(data => {
                  const yamlToJson = jsyaml.load(data);
                  (async () => {
                    for (let i = 0; i < yamlToJson.length; i++) {
                      if (yamlToJson[i] == "src/modules/themes.js") {
                        console.log(`%c[BetterKMR 📔] %cSkipped loading dynamic module because it is in the ignore list: ${yamlToJson[i]}`, 'color:rgb(105, 58, 138)', 'color: #fff');
                        continue;
                      }
                      console.log(`%c[BetterKMR 📘] %cLoading dynamic module: ${yamlToJson[i]}`, 'color: #0091EA', 'color: #fff');
                      
                      try {
                        const fileName = yamlToJson[i].split('/').pop();
                        const moduleName = fileName.replace('.js', '');
                        
                        await import(/* webpackIgnore: true */ chrome.runtime.getURL(`modules/${moduleName}.js`));
                      } catch (error) {
                        console.log(`%c[BetterKMR 📕] %cFailed loading module "${yamlToJson[i]}":\n      %c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                      }
                      
                      if (yamlToJson.length - 1 === i) {
                        holdfunc.notify("Finished loading all dynamic modules.");
                      }
                    }
                  })();
                })
                .catch(error => {
                  console.log(`%c[BetterKMR 📕] %cFailed to fetch the file: ${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
                });
            } catch (error) {
              console.log(`%c[BetterKMR 📕] %cError: ${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
            }
          })();
          (async () => {
            try {
              chrome.storage.sync.get(["plugin-id-text"], (result) => {
                const currentPluginId = result["plugin-id-text"] || "0";
                console.log("Plugin ID active: " + currentPluginId);
                getAllCustomPlugins(plugins => {
                  console.log(plugins);
                  if (plugins[currentPluginId]) {
                    const plugin = plugins[currentPluginId];
                    try {
                      addUserScript(plugin.code);
                    } catch (error) {
                      console.warn(error);
                    }
                  }
                });
              });
            } catch (error) {
              console.warn(error);
            }
          })();
          chrome.storage.sync.get('exp_snap_load', function(data) {
            const startTime = Date.now();
            const minDelay = 500;

            if (data['exp_snap_load'] == true) {
              showContent(false);
              return;
            }
    
            const remainingTime = minDelay - (Date.now() - startTime);
    
            if (remainingTime > 0) {
                setTimeout(showContent, remainingTime);
            } else {
                showContent();
            }
          });
    });
}
loader();