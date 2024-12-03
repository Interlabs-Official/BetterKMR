const env_version = "1.0";

document.addEventListener("DOMContentLoaded", function(event){
    if (window.location.href === "https://whanganuihigh.school.kiwi/example123") {
        window.location.href = chrome.runtime.getURL("settings/index.html");
    }
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

//const nav = document.getElementById("navbar");
//nav.innerHTML = ``

const targetFooter = document.getElementById("footer");
targetFooter.innerHTML = `
    <div class="container">
        <p>2024 - Whanganui High School. You're using BetterKMR version v${env_version}.</p>
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
    "ENE01": "English (Year 10 Extension, 1st Semester)"
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
});