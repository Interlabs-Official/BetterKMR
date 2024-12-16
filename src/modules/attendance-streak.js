// I had to replace return with something that stopped the script, so I put "stop" and it worked lol
if (!window.location.href.includes("attendance/week")) stop;

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