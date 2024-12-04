const ENV_VERSION = "1.1";
console.log("Content JS loaded");

function navigateToSettingsIfOnExamplePage() {
    const settingsUrl = "https://whanganuihigh.school.kiwi/example123";
    if (window.location.href === settingsUrl) {
        window.location.href = chrome.runtime.getURL("settings/index.html");
    }
}

function handleAttendanceStreak() {
    if (!window.location.href.includes("attendance/week")) return;

    const targetElement = document.querySelector(".page-title");

    chrome.storage.sync.get(["showAttendanceStreak"]).then((result) => {
        if (result.showAttendanceStreak && targetElement) {
            const injectedHTML = `
                <div class="box" style="background-color: #000; padding: 10px; position: relative;">
                    <h4>You're on a</h4>
                    <h1>1 / 200</h1>
                    <h4>day attendance streak!</h4>
                    <div class="close-buttons">
                        <button id="close-popup" class="close-btn">Close</button>
                        <button id="close-forever-popup" class="close-btn">Close and don't remind again</button>
                    </div>
                </div><br>`;
            targetElement.insertAdjacentHTML("afterend", injectedHTML);

            document.getElementById("close-popup").addEventListener("click", () => {
                document.querySelector(".box").style.display = "none";
            });

            document.getElementById("close-forever-popup").addEventListener("click", () => {
                localStorage.setItem("hideAttendancePopup", true);
                document.querySelector(".box").style.display = "none";
            });
        }
    });

    const calendarCard = document.querySelector(".card-body");
    calendarCard.innerHTML += `
        <br>
        <img src="${chrome.runtime.getURL("icon/icon_transparent_48.png")}" width="24px" height="24px">
        <a href="https://support.google.com/calendar/answer/37118" target="_blank">
            Click here for instructions on importing into Google Calendar ꜛ
        </a>`;
}

function handleBarcodeVisibility() {
    chrome.storage.sync.get(["showBarcodeToggle"]).then((result) => {
        if (!result.showBarcodeToggle) {
            const studentBarcode = document.querySelector(".school-card-barcode");
            if (studentBarcode) {
                studentBarcode.style = `
                    visibility: hidden;
                    height: 0px;
                    overflow: hidden;`;
            }
        }
    });
}

function updateProfilePicture() {
    chrome.storage.sync.get(["profilePicUrl"]).then((result) => {
        if (result.profilePicUrl) {
            const avatar = document.querySelector(".avatar");
            const profileBox = document.querySelector(".pb-3");
            if (avatar) {
                avatar.src = result.profilePicUrl;
                avatar.parentNode.style = `
                    height: 32px; width: 32px; margin-right: 15px;`;
            }
            if (profileBox) {
                profileBox.src = result.profilePicUrl;
            }
        }
    });
}

function applyCustomTheme() {
    const defaultBackground = `background: url("https://wallpapercave.com/wp/wp2082809.jpg") #1C1C1C top fixed no-repeat !important`;
    const skPage = document.querySelector(".sk_page");
    const skHeader = document.querySelector(".sk_header");

    let formedURL = defaultBackground;
    chrome.storage.sync.get(["theme-editor-back-img-url", "theme-editor-additional-css-flags-back-img-url"]).then((result) => {
        if (result["theme-editor-back-img-url"]) {
            formedURL = `background: url(${result["theme-editor-back-img-url"]}) !important`;
        }
        if (result["theme-editor-additional-css-flags-back-img-url"]) {
            formedURL += ` ${result["theme-editor-additional-css-flags-back-img-url"]}`;
        }

        if (skPage) skPage.style = formedURL;
        if (skHeader) skHeader.style = formedURL;
    });
}

function updateFooter() {
    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <p>2024 - Whanganui High School. BetterKMR V${ENV_VERSION}</p>
            </div>`;
    }
}

async function addInfoTips() {
    try {
        const jsonUrl = chrome.runtime.getURL('details/classInfo.json');
        const response = await fetch(jsonUrl);
        const infoClasses = await response.json();
        const targets = document.querySelectorAll(".b-block");
        targets.forEach((target) => {
            const key = target.textContent.trim();
            if (infoClasses[key]) {
                const tooltipHTML = `
                    <div class="tooltip" style="">🛈
                        <span class="tooltiptext" data-tooltip="${infoClasses[key]}">${infoClasses[key]}</span>
                    </div>
                    `;
                target.innerHTML += tooltipHTML;
            }
        });
    } catch (error) {
        console.error('Error loading or parsing details/classInfo.json:', error);
    }
}

function initJS() {
    console.log("Step 2");
    navigateToSettingsIfOnExamplePage();
    handleAttendanceStreak();
    handleBarcodeVisibility();
    updateProfilePicture();
    applyCustomTheme();
    updateFooter();
    addInfoTips();
    console.log("Step 3");
}

if (document.readyState !== "loading") {
    console.log("Document is already ready, executing code.");
    initJS();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Document was not ready, executing on DOMContentLoaded.");
        initJS();
    });
}