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
 // Form Class
    "FT": "Form Class",
 // Arts
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
    "SOC0": "Social Studies (Year 10)",
    "SOE0": "Extension Social Studies (Year 10)",
    "EFS2": "Education for Sustainability (Year 12)",
    "EFS3": "Education For Sustaianbility (Year 13)",
    "TOU2": "Tourism (Year 12)",
    "TOU3": "Tourism (Year 13)",
 // Sciences
    "BIO2": "Biology (Year 12)",
    "BIO3": "Biology (Year 13)",
    "CHE2": "Chemistry (Year 12)",
    "CHE3": "Chemistry (Year 13)",
    "PHY2": "Physics (Year 12)",
    "PHY3": "Physics (Year 13)",
    "SCEE": "Extension Science (Year 9)",
    "SCE01": "Extension Science Semester 1 (Year 10)",
    "SCE02": "Extension Science Semester 2 (Year 10)",
    "SCE1": "Extension Science (Year 11)",
    "SCGE": "Science (Year 9)",
    "SCG01": "Science Semester 1 (Year 10)",
    "SCG02": "Science Semester 2 (Year 10)",
    "SCG1": "Science (Year 11)",
    "SCIE": "Science Introductory (Year 9)",
    "SCI0": "Science Introductory (Year 10)",
    "SCI1": "Science Introductory (Year 11)",
    "SCI2": "Science Introductory (Year 12)",
 // Progessive (Abes Classes For Next Year)
    "SL9": "Supported Learning (Year 9)",
    "SL10": "Supported Learning (Year 10)",
    "PCL1": "Literacy Progressive Learning (Year 11)",
    "PCL2": "Literacy Progressive Learning (Year 12)",
    "PDL1": "Digital Progressive Learning (Year 11)",
    "PDL2": "Digital Progressive Learning (Year 12)",
    "PFL1": "Financial Numeracy & Literacy Progressive Learning (Year 11)",
    "PFL2": "Financial Literacy Progressive Learning (Year 12)",
 // Physical Education and Health
    "PEHE": "Physical Education & Health (Year 9)",
    "PEH01": "Physical Education & Health Semester 1 (Year 10)",
    "PEH02": "Physical Education & Health Semester 2 (Year 10)",
    "PEX01": "Extension Physical Education & Health Semester 1 (Year 10)",
    "PEX02": "Extension Physical Education & Health Semester 1 (Year 10)",
    "HTL1": "Health (Year 11)",
    "HTL2": "Health (Year 12)",
    "HTL3": "Health (Year 13)",
    "OAS1": "Outdoor Adventure Skills (Year 11)",
    "OUT2": "Outdoor Education (Year 12)",
    "OUT3": "Outdoor Education (Year 13)",
    "PED1": "Physical Education (Year 11)",
    "PED2": "Physical Education (Year 12)",
    "PED3": "Physical Education (Year 13)",
    "SPX2": "Sport & Exercise (Year 12)",
    "SPX3": "Sport & Exercise (Year 13)",
    "SPS3": "Sport Smart (Year 13)",
 // Mathematics
    "MCA2": "Calculus & Algebra Extension & Cambridge (Year 12)",
    "MCA3": "Calculus & Algebra Extension (Year 13)",
    "MCA1": "Cambridge Extended Mathematics (Year 11)",
    "MGC3": "Geometry & Calculus (Year 13)",
    "MAEE": "Mathematics Extension (Year 9)",
    "MAE0": "Mathematics Extension (Year 10",
    "MATE": "Mathematics (Year 9)",
    "MAT0": "Mathematics (Year 10)",
    "MAG1": "Mathematics (Year 11)",
    "MAG2": "Mathematics (Year 12)",
    "MAG3": "Mathematics (Year 13)",
    "MAIE": "Mathematics Introductory (Year 9)",
    "MAI0": "Mathematics Introductory (Year 10)",
    "MAI1": "Mathematics Introductory (Year 11)",
    "MPS2": "Probability & Statistics (Year 12)",
    "MPS3": "Probability & Statistics (Year 13)",
    "MCS2": "Statistics Extension & Cambridge (Year 12)",
    "MTA1": "Trigonometry & Algebra (Year 11)",
    "MTA2": "Trigonometry & Algebra (Year 12)",
    "MTA3": "Trigonometry & Algebra (Year 13)",
 // Languages
    "CHNE": "Chinese (Year 9)",
    "CH10": "Chinese 1 Semester (Year 10)",
    "CH20": "Chinese 2 Semesters (Year 10)",
    "CHN1": "Chinese (Year 11)",
    "CHN2": "Chinese (Year 12)",
    "CHN3": "Chinese (Year 13)",
    "FREE": "French (Year 9)", //FREE BIRD YEAH BABY
    "FR10": "French 1 Semester (Year 10)",
    "FR20": "French 2 Semesters (Year 10)",
    "FRE1": "French (Year 11)",
    "FRE2": "French (Year 12)",
    "FRE3": "French (Year 13)",
    "LANE": "Language Tasters (Year 9)",
    "SPAE": "Spanish (Year 9)",
    "SP20": "Spanish Full Year (Year 10)",
    "SP10": "Spanish Half Year (Year 10)",
    "SPA1": "Spanish (Year 11)",
    "SPA2": "Spanish (Year 12)",
    "SPA3": "Spanish (Year 13)",
    "MAOE": "Maori (Year 9)",
    "MO20": "Maori Full Year (Year 10)",
    "MO10": "Maori Half Year (Year 10)",
    "MAO1": "Maori (Year 11)",
    "MAO2": "Maori (Year 12)",
    "MAO3": "Maori (Year 13)",
 // International
    "CNZ2": "Conservation New Zealand (Year 12)",
    "IEN1": "International English (Year 11)",
    "IEN2": "International English (Year 12)",
    "IEN3": "International English (Year 13)",
    "IEC1": "International English Communication (Year 11)",
    "IEL1": "International English Language (Year 11)",
    "IEL2": "International English Language (Year 12)",
 // Digital Technology
    "DTGE": "Digital Technologies (Year 9)",
    "DTG0": "Digital Technologies (Year 10)",
    "DTG1": "Digital Technologies (Year 11)",
    "DTA2": "Digital Technologies Applied (Year 12)",
    "DTA3": "Digital Technologies Applied (Year 13)",
    "DTM2": "Digital Technologies Media (Year 12)",
    "DTM3": "Digital Technologies Media (Year 13)",
    "DTS2": "Digital Technologies Science (Year 12)",
    "DTS3": "Digital Technologies Science (Year 13",
 // Vocational Studies
    "VES2": "Vocational Studies Employment Skills (Year 12)",
    "VES3": "Vocational Studies Employment Skills (Year 13)",
    "VEN2": "Vocational Studies Communication English (Year 12)",
    "VEN3": "Vocational Studies Communication English (Year 13)",
    "VFD2": "Vocational Studies Food Technology (Year 12)",
    "VFD3": "Vocational Studies Food Technology (Year 13)",
    "VFL2": "Vocational Studies Financial Literacy (Year 12)",
    "VFL3": "Vocational Studies Financial Literacy (Year 13)",
 // English :Vomit:
    "ENEE": "Extension English (Year 9)",
    "ENE01": "Extension English Semester 1 (Year 10)",
    "ENE02": "Extension English Semester 2 (Year 10)",
    "ENE1": "Extension English (Year 11)",
    "ENE2": "Extension English (Year 12)",
    "ENL3": "Extension English Lierature (Year 13)",
    "ENGE": "English (Year 9)",
    "ENGO1": "English Semester 1 (Year 10)",
    "ENGO2": "English Semester 2 (Year 10)",
    "ENG1": "English (Year 11)",
    "ENG2": "English (Year 12)",
    "ENG3": "English (Year 13)",
    "ENIE": "English Introductory/Internal (Year 9)",
    "ENI01": "English Introductory/Internal Semester 1 (Year 10)",
    "ENI02": "English Introductory/Internal Semester 2 (Year 10)",
    "ENI1": "English Introductory/Internal (Year 11)",
    "ENI2": "English Introductory/Internal (Year 12)",
    "ENI3": "English Introductory/Internal (Year 13)"
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
