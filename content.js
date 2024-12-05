const ENV_VERSION = "1.0.0";
console.log("Content JS loaded");

function navigateToSettingsIfOnExamplePage() {
    const settingsUrl = "https://whanganuihigh.school.kiwi/example123";
    if (window.location.href === settingsUrl) {
        window.location.href = chrome.runtime.getURL("settings/index.html");
    }
}

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

function handleUpcomingHolidays() {
    if (!window.location.href.includes("attendance/week")) return;
    chrome.storage.sync.get(["upcoming-public-holiday-bar"]).then((result) => {
        if (result["upcoming-public-holiday-bar"] == "false" || result["upcoming-public-holiday-bar"] == false) {
            return;
        }
    const holidays = [
        { name: "New Year's Day", date: "2024-01-01" },
        { name: "Day After New Year's Day", date: "2024-01-02" },
        { name: "Waitangi Day", date: "2024-02-06" },
        { name: "Good Friday", date: "2024-03-29" },
        { name: "Easter Monday", date: "2024-04-01" },
        { name: "Anzac Day", date: "2024-04-25" },
        { name: "Queen's Birthday", date: "2024-06-03" },
        { name: "Matariki", date: "2024-07-19" },
        { name: "Labour Day", date: "2024-10-28" },
        { name: "Christmas Day", date: "2024-12-25" },
        { name: "Boxing Day", date: "2024-12-26" }
    ];

    const currentDate = new Date();
    let nextHoliday = null;

    for (const holiday of holidays) {
        const holidayDate = new Date(holiday.date);
        if (holidayDate >= currentDate) {
            nextHoliday = holiday;
            break;
        }
    }

    if (nextHoliday) {
        const targetElement = document.querySelector(".page-title");
        if (targetElement) {
            const injectedHTML = `
                <div class="box-bcd" style="background-color: #004d40; color: white; padding: 10px; position: relative;">
                    <h4 class="h4-upc-pub-hld-left">Upcoming Public Holiday</h4>
                    <h1>${nextHoliday.name}</h1>
                    <h4 class="h4-upc-pub-hld-right">on ${new Date(nextHoliday.date).toLocaleDateString()}</h4>
                    <div class="close-buttons">
                        <button id="close-popup" class="close-btn" style="background-color: #ff5722; color: white; border: none; padding: 5px;">Close</button>
                    </div>
                </div><br>`;
            targetElement.insertAdjacentHTML("afterend", injectedHTML);

            document.getElementById("close-popup").addEventListener("click", () => {
                document.querySelector(".box").style.display = "none";
            });
        }
    }
});
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
                    height: 32px !important; width: 32px !important; margin-right: 15px !important;`;
            }
            if (profileBox) {
                profileBox.src = result.profilePicUrl;
            }
        }
    });
}

// function applyCustomTheme() {
//    const defaultBackground = `background: url("https://wallpapercave.com/wp/wp2082809.jpg") #1C1C1C top fixed no-repeat !important`;
//  const skPage = document.querySelector(".sk_page");
//    const skHeader = document.querySelector(".sk_header");
//
//    let formedURL = defaultBackground;
//    chrome.storage.sync.get(["theme-editor-back-img-url", "theme-editor-additional-css-flags-back-img-url"]).then((result) => {
//        if (result["theme-editor-back-img-url"]) {
//            formedURL = `background: url(${result["theme-editor-back-img-url"]}) !important`;
//        }
//        if (result["theme-editor-additional-css-flags-back-img-url"]) {
//            formedURL += ` ${result["theme-editor-additional-css-flags-back-img-url"]}`;
//        }
//
//        if (skPage) skPage.style = formedURL;
//        if (skHeader) skHeader.style = formedURL;
//    });
//}

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

function loader() {
    waitForElm('body').then((elm) => {
        console.log('Element is ready');
        console.log("Load Init");
        // Create loader elements
        //const loaderOverlay = document.createElement('div');
        //loaderOverlay.className = 'loader-overlay';
        
        const loader = document.createElement('div');
        loader.className = 'loader';
        
        //loaderOverlay.appendChild(loader);
        
        // Add loader to the page
        document.body.appendChild(loader);

        // Hide the content of the page
        //document.body.style.visibility = 'hidden';
        
        loader.style.visibility = "visible";
        
        // Function to remove loader and show content
        function showContent() {
          loader.classList.add('hidden');
          document.getElementsByClassName("nav-and-main")[0].style.visibility = 'visible';
          console.log("Step 2");
          navigateToSettingsIfOnExamplePage();
          handleAttendanceStreak();
          handleUpcomingHolidays();
          handleBarcodeVisibility();
          updateProfilePicture();
          updateFooter();
          addInfoTips();
          console.log("Step 3");
        }
        const startTime = Date.now();
        const minDelay = 500; // 2 seconds
        
        const remainingTime = minDelay - (Date.now() - startTime);
        
        if (remainingTime > 0) {
          setTimeout(showContent, remainingTime);
        } else {
          showContent();
        }
    });
}
loader();

/* if (document.readyState !== "loading") {
    console.log("Document is already ready, executing code.");
    initJS();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Document was not ready, executing on DOMContentLoaded.");
        initJS();
    });
} */
