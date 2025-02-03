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
        "showAttendanceStreak": false,
        "showBarcodeToggle": false,
        "profilePicUrl": "",
        "upcoming-public-holiday-bar": true,
        "privateMode": false,
        "theme-id-text": 0,
        "show-attendance-info-class-name-tips": true,
        "superPrivateMode": false,
    };

    activateTab('general');
    document.getElementById("mainlogo").src = chrome.runtime.getURL("icon/btrkmr_transparent_logo.png")

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
    document.getElementById('attendance-streak-toggle').addEventListener('change', (e) => {
        updateSetting('showAttendanceStreak', e.target.checked);
    });

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
        if (key === 'showAttendanceStreak') {
            document.getElementById('attendance-streak-toggle').checked = value;
        } else if (key === 'showBarcodeToggle') {
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
     * @param {function} applyCallback - A callback function to run when the "Apply" button is clicked, which is the function onApply. I love callback functions. They're awesome.
     * 
     */
    function createThemeCard(customID, title, thumbnailURL, author, description, applyCallback) {
        const themeGrid = document.getElementById('theme-grid');

        const card = document.createElement('div');
        card.className = 'theme-card';
        card.id = customID;

        const img = document.createElement('img');
        img.src = thumbnailURL;
        img.alt = title + ' Thumbnail';
        card.appendChild(img);

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
            applyCallback(title, customID, button, true);
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

    createThemeCard(
        '0', // custom ID for this card
        'Space Theme', // title
        '../assets/images/backgrounds/space.jpg', // thumbnail
        'Convy32', // author
        "The default Space theme, bundled with BetterKMR by default.",
        onApply // callback function (i love these)
    );
    createThemeCard(
        '2',
        'Vivid Winter',
        '../assets/images/backgrounds/vivid.jpeg',
        'Solar',
        "A chill winter theme with a background so great it can't be artificial intelligence.",
        onApply
    );
    createThemeCard(
        '3',
        'Star Destroyers',
        '../assets/images/backgrounds/starwarsempire.png',
        'Samuel H',
        "Rule through the fear of force rather than force itself. -Wilhuff Tarkin",
        onApply
    );
    createThemeCard(
        '4',
        'Pure Dark Theme',
        '',
        'Solar',
        "When you just need that peace and quiet.",
        onApply
    );

    function createNotification(message, color, frontcol) {
        const notificationContainer = document.getElementById('notification-container');
        
        // Create a new notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.backgroundColor = color;
        notification.style.color = frontcol;
        notification.innerText = message;
    
        // Add click event to remove the notification
        notification.addEventListener('click', () => {
            notification.classList.add('hidden');
            setTimeout(() => notification.remove(), 500);
        });
    
        // Append the notification to the container
        notificationContainer.appendChild(notification);
    
        // Automatically remove the notification after 5 seconds
        setTimeout(() => {
            if (notification) {
                notification.classList.add('hidden');
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
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
        window.location.href = chrome.runtime.getURL("settings/pfp_wizard.html");
    })
});
