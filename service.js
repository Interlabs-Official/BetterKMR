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
          break;
       case 'chrome_update':
       case 'shared_module_update':
       default: // other install events
          break;
    }
 })