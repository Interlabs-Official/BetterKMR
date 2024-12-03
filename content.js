const env_version = "1.0";

if (window.location.href === "https://whanganuihigh.school.kiwi/example123") {
    window.location.href = chrome.runtime.getURL("example123.html");
  }

  if (window.location.href.includes("attendance/week")) {
    const targetElement = document.getElementsByClassName("page-title")[0];

    if (!localStorage.getItem('hideAttendancePopup')) {
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
}

const targetFooter = document.getElementById("footer");
targetFooter.innerHTML = `
    <div class="container">
        <p>2024 - Whanganui High School. You're using BetterKMR version v${env_version}.</p>
    </div>
`
const calendarCard = document.getElementsByClassName("card-body")[0];
calendarCard.innerHTML += `<br><img src="${chrome.runtime.getURL('icon/icon_transparent_48.png')}" width="24px" height="24px"></img>
<a href="https://support.google.com/calendar/answer/37118" target="_blank">Click here for instructions on importing it into Google Calendar ꜛ</a>`
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
            //target.insertAdjacentHTML("afterend", periodInfoHTML);
            //console.log(key + " -> " + infoClasses[key])
        }
    }
}

const targetPeriods = document.getElementsByClassName("b-block");
for (let i = 0; i < targetPeriods.length; i++) {
    const h100 = targetPeriods.item(i).parentNode.getElementsByClassName("h-100")[0].getElementsByClassName("btn-sm")[0];
    addInfoTipToTarget(targetPeriods.item(i), h100);
}

// Inject CSS for styling
const style = document.createElement('style');
style.textContent = `
  .modal-backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .modal input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .modal button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .modal button:hover {
    background-color: #0056b3;
  }

  .modal-backdrop.active {
    display: flex;
  }

  .change-pic-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .change-pic-btn:hover {
    background-color: #0056b3;
  }
`;
document.head.appendChild(style);

// Create and inject HTML dynamically
//const button = document.createElement('button');
//button.className = 'change-pic-btn';
//button.textContent = 'Change profile picture';
//document.getElementsByClassName("sk_nav")[0].appendChild(button);

const modalBackdrop = document.createElement('div');
modalBackdrop.className = 'modal-backdrop';
modalBackdrop.style = "z-index: 99991!important;";

const modal = document.createElement('div');
modal.className = 'modal';
modal.style = "z-index: 99992!important;";
modal.innerHTML = `
  <p style="z-index: 99993!important;">Enter Image URL</p>
  <input style="z-index: 99994!important;" type="text" id="image-url" placeholder="https://example.com/image.jpg" />
  <button style="z-index: 99995!important;" id="submit-btn">Submit</button>
  <button style="z-index: 99996!important;" id="close-btn">Close</button>
`;
modalBackdrop.appendChild(modal);
document.body.appendChild(modalBackdrop);

// Load the saved avatar URL and apply to images
const applyAvatar = () => {
  const avatarUrl = localStorage.getItem('avatar-url');
  if (avatarUrl) {
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach(avatar => avatar.src = avatarUrl);
  }
};
applyAvatar();

// Event listeners
button.addEventListener('click', () => {
  modalBackdrop.classList.add('active');
});

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop || e.target.id === 'close-btn') {
    modalBackdrop.classList.remove('active');
  }
});

document.getElementById('submit-btn').addEventListener('click', () => {
  const url = document.getElementById('image-url').value.trim();
  if (url) {
    localStorage.setItem('avatar-url', url);
    applyAvatar();
    modalBackdrop.classList.remove('active');
  }
});