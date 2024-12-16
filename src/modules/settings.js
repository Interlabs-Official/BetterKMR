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

/* settings.js - src/modules/settings.js */
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
                //avatar.parentNode.style = `
                    //height: 32px !important; width: 32px !important;`;
            }
            if (profileBox) {
                profileBox.src = result.profilePicUrl;
            }
        }
    });
}

function updatePrivateMode() {
    chrome.storage.sync.get(["privateMode"]).then((result) => {
        if (result.privateMode) {
            const schoolCardDob = document.getElementsByClassName("school-card-dob")[0];
            if (schoolCardDob) { schoolCardDob.style.display = "none"; }
            if (window.location.href.includes("medical_details")) {
                const pageTitle = document.getElementsByClassName("page-title")[0];
                pageTitle.innerHTML = `<div class="alert alert-warning">You have enabled Private Mode, and this content is not available.</div>`
                document.getElementsByClassName("sk_table")[0].remove();
            }
            if (window.location.href.includes("caregiver_details")) {
                const pageTitle = document.getElementsByClassName("page-title")[0];
                pageTitle.innerHTML = `<div class="alert alert-warning">You have enabled Private Mode, and this content is not available.</div>`
                document.getElementsByClassName("nav-tabs")[0].remove();
                document.getElementById("caregivers1").remove();
            }
            if (window.location.href.includes("emergency_contact_details")) {
                const pageTitle = document.getElementsByClassName("page-title")[0];
                pageTitle.innerHTML = `<div class="alert alert-warning">You have enabled Private Mode, and this content is not available.</div>`
                document.getElementsByClassName("sk_table")[0].remove();
            }
        }
    });
}
handleBarcodeVisibility();
updateProfilePicture();
updatePrivateMode();