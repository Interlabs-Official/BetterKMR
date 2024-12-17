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

/* script.js - settings/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const settings = {
        "showAttendanceStreak": false,
        "showBarcodeToggle": false,
        "profilePicUrl": "",
        "upcoming-public-holiday-bar": true,
        "privateMode": false
    };

    // Automatically activate the "About" tab
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

    function updateSetting(key, value) {
        chrome.storage.sync.set({ [key]: value }, () => {
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
        // themes
        } else if (key === 'theme-editor-back-img-url') {
            document.getElementById('theme-editor-back-img-url').value = value;
        } else if (key === 'theme-editor-additional-css-flags-back-img-url') {
            document.getElementById('theme-editor-additional-css-flags-back-img-url').value = value;
        } else if (key === 'upcoming-public-holiday-bar') {
            document.getElementById('upcoming-public-holiday-bar').checked = value;
        } else if (key === 'privateMode') {
            document.getElementById('privateMode').checked = value;
        }
    }

    function activateTab(tabId) {
        tabs.forEach(tab => {
            const isActive = tab.getAttribute('data-tab') === tabId;
            tab.classList.toggle('active', isActive);
        });

        tabContents.forEach(content => {
            const isActive = content.id === tabId;
            content.classList.toggle('active', isActive);
        });
    }

    /* document.getElementById("space-theme-convy32").addEventListener("click", newEntry);

    function newEntry() {
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
    } */
});