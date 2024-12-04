document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const settings = {
        "showAttendanceStreak": false,
        "showBarcodeToggle": false,
        "profilePicUrl": "",
        "upcoming-public-holiday-bar": true
    };

    // Automatically activate the "About" tab
    activateTab('about');
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

    // themes
    document.getElementById('theme-editor-back-img-url').defaultValue = "https://wallpapercave.com/wp/wp2082809.jpg";
    document.getElementById('theme-editor-back-img-url').addEventListener('input', (e) => {
        updateSetting('theme-editor-back-img-url', e.target.value);
    });

    document.getElementById('theme-editor-additional-css-flags-back-img-url').defaultValue = "#1C1C1C top fixed no-repeat";
    document.getElementById('theme-editor-additional-css-flags-back-img-url').addEventListener('input', (e) => {
        updateSetting('theme-editor-additional-css-flags-back-img-url', e.target.value);
    });

    // Upcoming Public Holiday
    /* chrome.storage.sync.get(["upcoming-public-holiday-bar"]).then((result) => {
        if (result["upcoming-public-holiday-bar"] == null) {
            updateSetting('upcoming-public-holiday-bar', true);
            applySetting('upcoming-public-holiday-bar', true);
        }
    }); */
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
});