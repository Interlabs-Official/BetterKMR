const env_version = "1.1";
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
        <p>2024 - Whanganui High School. BetterKMR V${env_version}</p>
    </div>
`
const infoClasses = {
    "SP20": "Spanish (2nd Semester)",
    "FT": "Form Class",
    "SOC0": "Social Studies (Year 10 Midband)",
    "SCE02": "Science (Year 10 Extension, 2nd Semester)",
    "MAE0": "Mathematics (Year 10 Extension)",
    "PEH02": "Physical Education & Health (Year 10 Midband, 2nd Semester)",
    "PEH01": "Physical Education & Health (Year 10 Midband, 1st Semester)",
    "DTG0": "Digital Technologies",
    "SP10": "Spanish (1st Semester)",
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
    "BAC1": "Building & Construction (Year 11)",
    "BAC2": "Building & Construction (Year 12)",
    "BAC3": "Building & Construction (Year 13)",
    "DVCE": "Design & Visual Communication (Year 9)",
    "DVC0": "Design & Visual Communication (Year 10)",
    "DVC1": "Design & Visual Communication (Year 11)",
    "DVC2": "Design & Visual Communication (Year 12)",
    "DVC3": "Design & Visual Communication (Year 13)",
    "ELE2": "Electronics (Year 12)",
    "ELE3": "Electronics (Year 13)",
    "FDZE": "Fashion Design (Year 9)",
    "FDZ0": "Fashion Design (Year 10)",
    "FDZ1": "Fashion Design (Year 11)",
    "FDZ2": "Fashion Design (Year 12)",
    "FDZ3": "Fashion Design (Year 13)",
    "FDNE": "Food & Nutrition (Year 9)",
    "FDN0": "Food & Nutrition (Year 10)",
    "FDH1": "Hospitality (Year 11)",
    "FDH2": "Hospitality (Year 12)",
    "FDH3": "Hospitality (Year 13)",
    "MMS0": "Making Music (Year 10)",
    "TCE1": "Technology Engineering (Year 11)",
    "TCE2": "Technology Engineering (Year 12)",
    "TECE": "Technology Materials (Year 9)",
    "TCM0": "Technology Materials (Year 10)",
    "TEC1": "Technology Materials (Year 11)",
    "TEC2": "Technology Materials (Year 12)",
    "TEC3": "Technology Materials (Year 13)",
 // Social Sciences
    "BUS1": "Business Studies (Year 11)",
    "ACC2": "Accounting (Year 12)",
    "ACC3": "Accounting (Year 13)",
    "CLS2": "Classical Studies (Year 12)",
    "CLS3": "Classical Studies (Year 13)",
    "ECO2": "Economics (Year 12)",
    "ECO3": "Economics (Year 13)",
    "GEO1": "Geography (Year 11)",
    "GEO2": "Geography (Year 12)",
    "GEO3": "Geography (Year 13)",
    "HIS1": "History (Year 11)",
    "HIS2": "History (Year 12)",
    "HIS3": "History (Year 13)",
    "PSY2": "Psychology (Year 12)",
    "PSY3": "Psychology (Year 13)",
    "SOCE": "Social Studies (Year 9)",
    "SOCO": "Social Studies (Year 10)",
    "SOE0": "Extension Social Studies (Year 10)",
    "EFS2": "Education for Sustainability (Year 12)",
    "EFS3": "Education For Sustaianbility (Year 13)",
    "TOU2": "Tourism (Year 12)",
    "TOU3": "Toursim (Year 13)"
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
