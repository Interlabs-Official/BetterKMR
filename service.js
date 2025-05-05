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

/* service.js - root directory */
// Function to inject the CSS into a specific tab

// Listen for tab updates (navigation, reload, etc.)
chrome.action.onClicked.addListener(tab => { 
    chrome.tabs.create({
        url: /* webpackIgnore: true */ chrome.runtime.getURL("settings/index.html")
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPinned") {
      chrome.action.getUserSettings().then((settings) => {
          sendResponse({ isPinned: settings.isOnToolbar });
      });
      return true;
  }
});
chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version
    const previousVersion = details.previousVersion
    const reason = details.reason
    
    console.log(`Previous Version: ${previousVersion }`)
    console.log(`Current Version: ${currentVersion }`)
 
    switch (reason) {
       case 'install':
        chrome.notifications.create(
            "betterkmr-install",
            {
              type: "basic",
              iconUrl: "icon/icon128.png",
              title: "BetterKMR Installed",
              message: `Thank you for installing BetterKMR v${currentVersion}! Please visit the settings page to get started.`,
              onclick: function () {
                chrome.tabs.create({
                    url: /* webpackIgnore: true */ chrome.runtime.getURL("settings/index.html")
                });
              }
            },
            function () {}
          );
          
          break;
       case 'update':
        var message = `BetterKMR has been updated/reloaded to v${currentVersion}.`
        if (previousVersion !== currentVersion) {
            message = `BetterKMR has been updated to v${currentVersion} from v${previousVersion}.`
        }
        chrome.notifications.create(
            "betterkmr-update",
            {
              type: "basic",
              iconUrl: "icon/icon128.png",
              title: "BetterKMR Update",
              message: message,
            },
            function () {}
          );
          chrome.storage.sync.set({'update_notice_closed': false});
          break;
       case 'chrome_update':
       case 'shared_module_update':
       default: // other install events
          break;
    }
 })
chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL("src/config/themes.yml"))
      .then(response => response.text())
      .then(data => {
          const yamlToJson = jsyaml.load(data);
          chrome.storage.local.set({
              themesConfig: yamlToJson
          }); // store in local storage
          console.log("Themes configuration loaded and cached.");
      })
      .catch(error => console.error("Failed to load themes:", error));
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getThemesConfig") {
        chrome.storage.local.get("themesConfig", (data) => {
            sendResponse(data.themesConfig);
        });
        return true;
    }
});
let API_URL = 'https://api.solarcosmic.net/betterkmr-v1-global.php';
let CHECK_INTERVAL = 60 * 60 * 1000; // check every hour

async function checkForUpdates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const currentVersion = chrome.runtime.getManifest().version;
        
        chrome.storage.local.set({
            updateAvailable: data.latest_version !== currentVersion,
            latestVersion: data.latest_version,
            changelog: data.latest_version_changelog,
            versionHighlight: data.version_highlight,
            announcement: data.announcement || ''
        });
    } catch (error) {
        console.error('Failed to check for updates:', error);
    }
}

checkForUpdates();
setInterval(checkForUpdates, CHECK_INTERVAL);