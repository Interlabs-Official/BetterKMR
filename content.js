const env_version = "1.0";
console.log("Content JS loaded")
function initJS() {
    if (window.location.href === "https://whanganuihigh.school.kiwi/example123") {
        window.location.href = chrome.runtime.getURL("settings/index.html");
    }
    console.log("Step 2")
if (window.location.href.includes("attendance/week")) {
    const targetElement = document.getElementsByClassName("page-title")[0];

    chrome.storage.sync.get(["showAttendanceStreak"]).then((result) => {
        console.log("Value is " + result.showAttendanceStreak);
        if (result.showAttendanceStreak == true) {
            if (targetElement) {
                const injectedHTML = `
                <div class="box" style="background-color: #000; padding: 10px; position: relative;">
                    <h4>You're on a</h4>
                    <h1 style>1 / 200</h1>
                    <h4>day attendance streak!</h4>
                    <div class="close-buttons">
                        <button id="close-popup" class="close-btn">Close</button>
                        <button id="close-forever-popup" class="close-btn">Close and don't remind again</button>
                    </div>
                </div><br>`;
              
                targetElement.insertAdjacentHTML("afterend", injectedHTML);
    
                document.getElementById('close-popup').addEventListener('click', () => {
                    document.querySelector('.box').style.display = 'none';
                });
    
                document.getElementById('close-forever-popup').addEventListener('click', () => {
                    localStorage.setItem('hideAttendancePopup', true);
                    document.querySelector('.box').style.display = 'none';
                });
            }
        }
    });

    const calendarCard = document.getElementsByClassName("card-body")[0];
    calendarCard.innerHTML += `<br><img src="${chrome.runtime.getURL('icon/icon_transparent_48.png')}" width="24px" height="24px"></img>
    <a href="https://support.google.com/calendar/answer/37118" target="_blank">Click here for instructions on importing it into Google Calendar ꜛ</a>`
}

chrome.storage.sync.get(["showBarcodeToggle"]).then((result) => {
    if (result.showBarcodeToggle == false || result.showBarcodeToggle == null) {
        const studentBarcode = document.getElementsByClassName("school-card-barcode")[0];
        studentBarcode.style = `
        visibility: hidden;
        height: 0px;
        overflow: hidden;
        `
    }
});

chrome.storage.sync.get(["profilePicUrl"]).then((result) => {
    if (result.profilePicUrl != null) {
        const avatarURL = document.getElementsByClassName("avatar")[0];
        avatarURL.src = result.profilePicUrl;
        avatarURL.parentNode.style = `
        height: 32px; width: 32px; margin-right: 15px;
        `
        const pb3 = document.getElementsByClassName("pb-3")[0];
        pb3.src = result.profilePicUrl;
    }
});

    //themes
    var formedURL = `background: url("https://wallpapercave.com/wp/wp2082809.jpg") #1C1C1C top fixed no-repeat`;
    const skpage = document.getElementsByClassName("sk_page")[0];
    const skheader = document.getElementsByClassName("sk_header")[0];
    chrome.storage.sync.get(["theme-editor-back-img-url"]).then((result) => {
        if (result["theme-editor-back-img-url"] != null) {
            console.log("Custom background entered");
            formedURL = `background: url(${result["theme-editor-back-img-url"]})`;
        }
    });
    chrome.storage.sync.get(["theme-editor-additional-css-flags-back-img-url"]).then((result) => {
        if (result["theme-editor-additional-css-flags-back-img-url"] != null) {
            console.log("Custom background CSS flags entered");
            formedURL += ` ${result["theme-editor-additional-css-flags-back-img-url"]}`;
        }
    });
    skpage.style = formedURL += ` !important;`;
    skheader.style = formedURL += ` !important;`;

//const nav = document.getElementById("navbar");
//nav.innerHTML = ``
console.log("Step 3")
const targetFooter = document.getElementById("footer");
targetFooter.innerHTML = `
    <div class="container">
        <p>2024 - Whanganui High School. BetterKMR V${env_version}.</p>
    </div>
`
const infoClasses = {
    "SP20": "Spanish (2nd Semester)",
    "FT": "Form Class",
    "MUS0": "Music",
    "SOC0": "Social Studies (Year 10 Midband)",
    "SCE02": "Science (Year 10 Extension, 2nd Semester)",
    "MAE0": "Mathematics (Year 10 Extension)",
    "BUS0": "Business Studies (Year 11)",
    "PEH02": "Physical Education & Health (Year 10 Midband, 2nd Semester)",
    "PEH01": "Physical Education & Health (Year 10 Midband, 1st Semester)",
    "DTG0": "Digital Technologies",
    "SP10": "Spanish (1st Semester)",
    "DRA0": "Drama",
    "DVC0": "Design & Visual Communication",
    "ENE01": "English (Year 10 Extension, 1st Semester)",
//  Arts
    "ARD2": "Art Design (Year 12)",
    "ARD3": "Art Design (Year 13)",
    "DANE": "Dance (Year 9)",
    "DAN0": "Dance (Year 10)",
    "DAN1": "Dance (Year 11)",
    "DAN2": "Dance (Year 12)",
    "DAN3": "Dance (Year 13)",
    "DRAE": "Drama (Year 9)",
    "DRA0": "Drama (Year 10)",
    "DRA1": "Drama (Year 11)",
    "DRA2": "Drama (Year 12)",
    "DRA3": "Drama (Year 13)",
    "MUSE": "Music (Year 9)",
    "MUS0": "Music (Year 10)",
    "MUS1": "Music (Year 11)",
    "MUS2": "Music (Year 12)",
    "MUS3": "Music (Year 13)",
    "ARP2": "Painting (Year 12)",
    "ARP3": "Painting (Year 13)",
    "PHO2": "Photography (Year 12)",
    "PHO3": "Photography (Year 13)",
    "APT2": "Printmaking (Year 12)",
    "APT3": "Printmaking (Year 13)",
    "ARTE": "Art (Year 9)",
    "ART0": "Art (Year 10",
    "ADF1": "Digital Art (Year 11)",
    "ART1": "Art (Year 11)",
//  Technologys
    "AUT1": "Automotive (Year 11)",
    "AUT2": "Automotive (Year 12)",
    "AUT3": "Automotive (Year 13)",
    "BAC1": "Building And Construction (Year 11)",
    "BAC2": "Building And Construction (Year 12)",
    "BAC3": "Building And Construction (Year 13)",
    "DVCE": "Desing And Visual Communication (Year 9)"
}

function addInfoTipToTarget(target, btn) {
    const targetText = target.textContent.trim();
    for (var key of Object.keys(infoClasses)) {
        if (targetText == key) {
            var periodInfoHTML = `
                <div class="tooltip" style="">🛈
                    <span class="tooltiptext" data-tooltip="${infoClasses[key]}">${infoClasses[key]}</span>
                </div>
            `;
            target.innerHTML += periodInfoHTML;
        }
    }
}

const targetPeriods = document.getElementsByClassName("b-block");
for (let i = 0; i < targetPeriods.length; i++) {
    const h100 = targetPeriods.item(i).parentNode.getElementsByClassName("h-100")[0].getElementsByClassName("btn-sm")[0];
    addInfoTipToTarget(targetPeriods.item(i), h100);
}
    // your code here
}

if (document.readyState !== 'loading') {
    console.log('document is already ready, just execute code here');
    initJS();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('document was not ready, place code here');
        initJS();
    });
}
