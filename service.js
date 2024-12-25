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

/* service.js - root directory */
// Function to inject the CSS into a specific tab

// Listen for tab updates (navigation, reload, etc.)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["src/themes/space.css"]
    });
    }
});
chrome.action.onClicked.addListener(tab => { 
    chrome.tabs.create({
        url: chrome.runtime.getURL("settings/index.html")
    });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.injectScript == "navbar.js") {
        console.log("Service worker received message from sender %s", sender.id, request)
        console.log("Beginning to inject navbar.js into content page");
        chrome.tabs.executeScript(sender.tab.id, {file: request.injectScript}, function () {
          sendResponse({message: "Service worker processed the message"})
        });
  }
})