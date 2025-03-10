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

/* script.js - settings/script.js */
document.addEventListener('DOMContentLoaded', () => {
    console.log(`%c[BetterKMR 📘] ` + `%cWelcome to the BetterKMR extension settings. Please do not paste/enter commands in this console unless you know what you're doing.`, 'color: #0091EA', 'color: #fff');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const settings = {
        "showBarcodeToggle": false,
        "profilePicUrl": "",
        "upcoming-public-holiday-bar": true,
        "privateMode": false,
        "theme-id-text": 0,
        "show-attendance-info-class-name-tips": true,
        "superPrivateMode": false,
    };

    activateTab('general');
    document.getElementById("mainlogo").src = /* webpackIgnore: true */ chrome.runtime.getURL("icon/btrkmr_transparent_logo.png")

    // Load settings from storage
    chrome.storage.sync.get(Object.keys(settings), (result) => {
        Object.keys(settings).forEach((key) => {
            const value = result[key] !== undefined ? result[key] : settings[key];
            applySetting(key, value);
        });
    });

    // Tab switching logic
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            activateTab(targetTab);
        });
    });

    // Add change listeners for settings
    document.getElementById('student-barcode-toggle').addEventListener('change', (e) => {
        updateSetting('showBarcodeToggle', e.target.checked);
    });

    document.getElementById('profile-pic-url').addEventListener('input', (e) => {
        updateSetting('profilePicUrl', e.target.value);
    });

    document.getElementById('privateMode').addEventListener('change', (e) => {
        updateSetting('privateMode', e.target.checked);
    });

    document.getElementById('upcoming-public-holiday-bar').addEventListener('input', (e) => {
        updateSetting('upcoming-public-holiday-bar', e.target.checked);
    });

    document.getElementById('theme-id-text').addEventListener('input', (e) => {
        updateSetting('theme-id-text', e.target.value);
    });

    document.getElementById('show-attendance-info-class-name-tips').addEventListener('change', (e) => {
        updateSetting('showAttendanceInfoClassNameTips', e.target.checked);
    });

    // advanced
    document.getElementById('superPrivateMode').addEventListener('change', (e) => {
        updateSetting('superPrivateMode', e.target.checked);
    });

    function updateSetting(key, value) {
        chrome.storage.sync.set({
            [key]: value
        }, () => {
            console.log(`${key} updated to`, value);
        });
    }

    function applySetting(key, value) {
        if (key === 'showBarcodeToggle') {
            document.getElementById('student-barcode-toggle').checked = value;
        } else if (key === 'profilePicUrl') {
            document.getElementById('profile-pic-url').value = value;
        } else if (key === 'theme-id-text') {
            document.getElementById('theme-id-text').value = value;
        } else if (key === 'upcoming-public-holiday-bar') {
            document.getElementById('upcoming-public-holiday-bar').checked = value;
        } else if (key === 'privateMode') {
            document.getElementById('privateMode').checked = value;
        } else if (key === 'show-attendance-info-class-name-tips') {
            document.getElementById('show-attendance-info-class-name-tips').checked = value;
        } else if (key === 'superPrivateMode') {
            document.getElementById('superPrivateMode').checked = value;
        }
    }

    function activateTab(tabId) {
        // on (*every*) tab activation, check to see which theme is active and update buttons accordingly
        if (tabId == "themes") {
            chrome.storage.sync.get(["theme-id-text"]).then((result) => {
                const id = result["theme-id-text"] || "0";
                const buttonById = getThemeCardButtonById(id);
                if (buttonById) {
                    // it's fine to call null here on the name, we don't need it for this situation
                    onApply(null, id, buttonById, false);
                }
            });
        }
        tabs.forEach(tab => {
            const isActive = tab.getAttribute('data-tab') === tabId;
            tab.classList.toggle('active', isActive);
        });

        tabContents.forEach(content => {
            const isActive = content.id === tabId;
            content.classList.toggle('active', isActive);
        });
    }

    /**
     * Creates a theme card and appends it to the container with id "theme-grid".
     *
     * @param {string} customID - The custom ID you assign to the card.
     * @param {string} title - The theme title.
     * @param {string} thumbnailURL - The URL for the thumbnail image.
     * @param {string} author - The author name, e.g. Convy32.
     * @param {string} description - The theme description.
     * @param {string} externalJS - The theme's external JS, if applicable.
     * @param {function} applyCallback - A callback function to run when the "Apply" button is clicked, which is the function onApply. I love callback functions. They're awesome.
     * 
     */
    function createThemeCard(customID, title, thumbnailURL, author, description, externalJS, applyCallback) {
        const themeGrid = document.getElementById('theme-grid');

        const card = document.createElement('div');
        card.className = 'theme-card';
        card.id = customID;

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'theme-image-wrapper';
        
        const img = document.createElement('img');
        img.src = thumbnailURL;
        img.alt = title + ' Thumbnail';
        
        imgWrapper.appendChild(img);

        if (externalJS != null) {
            const badge = document.createElement('div');
            badge.className = 'external-js-badge';
            badge.textContent = 'External JS';
            imgWrapper.appendChild(badge);
        }
        
        card.appendChild(imgWrapper);

        const content = document.createElement('div');
        content.className = 'theme-content';

        const titleRow = document.createElement('div');
        titleRow.className = 'title-row';

        const h2 = document.createElement('h2');
        h2.className = 'theme-title';
        h2.textContent = title;
        titleRow.appendChild(h2);

        const button = document.createElement('button');
        button.className = 'download-button';
        button.textContent = 'Apply';
        button.addEventListener('click', function() {
            if (externalJS != null) {
                createDialog({
                    title: 'Installing \'' + title + '\'',
                    content: 'This theme contains external JavaScript.<br>Themes with external JavaScript aren\'t sandboxed.<br><br>Things to be careful of:<br>- Themes with external JS can contain malicious code<br>- Using a theme with external JS gives the author complete power<br><br>Are you sure you want to use this theme?',
                    buttons: [
                        { text: 'Cancel', callback: () => console.log('Cancelled'), classname: "dialog-button-not" },
                        { text: 'OK', callback: () => applyCallback(title, customID, button, true) }
                    ]
                });   
            } else {
                applyCallback(title, customID, button, true);
            }
        });
        titleRow.appendChild(button);

        content.appendChild(titleRow);

        const pAuthor = document.createElement('p');
        pAuthor.className = 'theme-author';
        pAuthor.textContent = 'by ' + author;
        content.appendChild(pAuthor);

        const pDesc = document.createElement('p');
        pDesc.className = 'theme-description';
        pDesc.textContent = description;
        content.appendChild(pDesc);

        card.appendChild(content);
        themeGrid.appendChild(card);
    }

    function onApply(themeName, customID, button, shouldApply) {
        if (document.getElementById("greyed-out-applied")) {
            document.getElementById("greyed-out-applied").textContent = "Apply"
            document.getElementById("greyed-out-applied").disabled = false;
            document.getElementById("greyed-out-applied").removeAttribute("id");
        }
        button.setAttribute("id", "greyed-out-applied")
        button.disabled = true;
        button.textContent = "In Use"

        if (shouldApply) {
            updateSetting('theme-id-text', customID);
            console.log('Theme applied:', themeName, 'with ID:', customID);
            createNotification(`Theme "${themeName}" has been successfully applied.`, "#3c8443", "#ffffff");
        }
    }

    function getThemeCardById(id) {
        return document.getElementById(id);
    }

    function getThemeCardButtonById(id) {
        const card = getThemeCardById(id);
        if (card) {
            return card.querySelector('.download-button');
        }
        return null;
    }

    document.getElementById("school-default-theme").addEventListener('click', function() {
        onApply("School Colours", 1, document.getElementById("school-default-theme"), true);
    });

    function doYAMLThemes() {
        fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/config/themes.yml"))
            .then(response => response.text())
            .then(data => {
                const yamlToJson = jsyaml.load(data);
                console.log(yamlToJson);
    
                Object.entries(yamlToJson).forEach(([key, theme]) => {
                    if (key == null || key == "") { assert("A specific theme does not have a key."); return; } // this shouldn't be possible but we'll make sure anyway
                    if (key != "1") { // if not the school colours theme
                        if (theme.css == null || theme.css == "") { assert("Theme with key \"" + key + "\" does not have a CSS stylesheet attached!"); return; }
                        if (theme.author == null || theme.author == "") { assert("Theme with key \"" + key + "\" does not have an author!"); return; }

                        createThemeCard(
                            key,
                            theme.name,
                            "../../assets/" + theme.thumbnail,
                            theme.author,
                            theme.highlight,
                            theme.js,
                            onApply
                        )
                    }
                });
            })
            .catch(error => console.error("Failed to load themes:", error));
    }
    doYAMLThemes();

    function assert(error) {
        console.log(`%c[BetterKMR 📕] ` + `%cAn error occurred while attempting to load a theme preview:\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
    }

    function createNotification(message, color, frontcol) {
        const notificationContainer = document.getElementById('notification-container');
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.backgroundColor = color;
        notification.style.color = frontcol;
        notification.innerText = message;
    
        notification.addEventListener('click', () => {
            notification.classList.add('hidden');
            setTimeout(() => notification.remove(), 500);
        });
    
        notificationContainer.appendChild(notification);
    
        setTimeout(() => {
            if (notification) {
                notification.classList.add('hidden');
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }    

    function createDialog({ title, content, buttons = [] }) {
        const overlay = document.createElement('div');
        overlay.className = 'dialog-overlay';
        
        const dialog = document.createElement('div');
        dialog.className = 'dialog-box';
        
        const titleElement = document.createElement('h2');
        titleElement.className = 'dialog-title';
        titleElement.textContent = title;
        dialog.appendChild(titleElement);
        
        const contentElement = document.createElement('p');
        contentElement.className = 'dialog-content';
        contentElement.innerHTML = content;
        dialog.appendChild(contentElement);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dialog-buttons';
        
        buttons.forEach(({ text, callback, classname }) => {
            const button = document.createElement('button');
            button.className = 'dialog-button';
            if (classname) {
                button.className = classname;
            }
            button.textContent = text;
            button.onclick = () => {
                if (callback) callback();
                document.body.removeChild(overlay);
            };
            buttonContainer.appendChild(button);
        });
        
        dialog.appendChild(buttonContainer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    chrome.runtime.sendMessage({ action: "checkPinned" }, (response) => {
        if (response.isPinned) {
            console.log("Thank you for pinning the BetterKMR extension!");
        } else {
            const randomInt = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            if (randomInt > 50) {
                createNotification("You should totally pin BetterKMR for easy access!", "#0073de", "#ffffff");
            }
            console.log("Rolled a(n) " + randomInt + ". Values over 50 show the BetterKMR pin notification.");
        }
    });

    document.getElementById("goToWizard").addEventListener('click', (event) => {
        window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL("settings/pfp_wizard.html");
    })
});
