/*
    BetterKMR for Chrome
    Copyright (C) 2025 InterLabs

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
    chrome.storage.sync.get(["show_student_barcode"]).then((result) => {
        if (!result.show_student_barcode) { // this is what you should always do when you validate a setting value.
                                            // the value can be either false, null, or true.
                                            // null indicates it hasn't been set before in settings, false and true mean they have.
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
    const avatar = document.querySelector(".avatar");
    const profileBox = document.querySelector(".pb-3");
    chrome.storage.local.get('choose_profile_picture', function(result) {
        if (result['choose_profile_picture']) {
            if (avatar) { avatar.src = result['choose_profile_picture']; }
            if (profileBox) { profileBox.src = result['choose_profile_picture']; }
        } else {
            // resort to old method
            chrome.storage.sync.get(["profilePicUrl"]).then((result) => {
                if (result.profilePicUrl) {
                    if (avatar) {
                        avatar.src = result.profilePicUrl;
                    }
                    if (profileBox) {
                        profileBox.src = result.profilePicUrl;
                    }
                }
            });
        }
    });
}

function updateProfilePictureByURL() {
    const avatar = document.querySelector(".avatar");
    const profileBox = document.querySelector(".pb-3");
    chrome.storage.sync.get(["profile_picture_url"]).then((result) => {
        if (result.profile_picture_url) {
            if (!result.profile_picture_url == "" || !result.profile_picture_url == null) {
                if (avatar) {
                    avatar.src = result.profile_picture_url;
                }
                if (profileBox) {
                    profileBox.src = result.profile_picture_url;
                }
            } else {
                updateProfilePicture();
            }
        } else {
            updateProfilePicture();
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

function hasNumber(myString) {
    return /\d/.test(myString);
}

function updateSuperPrivateMode() {
    chrome.storage.sync.get(["super_private_mode"]).then((result) => {
        if (result.super_private_mode) {
            holdfunc.notify("Super Private Mode is enabled! You can toggle this in Settings.");
            const schoolCardDob = document.getElementsByClassName("school-card-dob")[0];
            if (schoolCardDob) { schoolCardDob.style.display = "none"; }
            const schoolName = document.getElementsByClassName("sk_school_name")[0];
            schoolName.textContent = "High School";
            const schoolMotto = document.getElementsByClassName("sk_school_subheading")[0];
            schoolMotto.textContent = "";
            const schoolLogo = document.getElementsByClassName("sk_logo");
            for (let element of schoolLogo) {
                element.innerHTML = `
                <img src="https://images.vexels.com/media/users/3/224234/isolated/preview/ff7c525c1c3e1bef640644542001e1fd-online-school-logo.png" alt="High School">
                `
            }
            // school card
            try {
                const schoolLogo2 = document.getElementsByClassName("school-card-crest")[0];
                schoolLogo2.innerHTML = `
                <img class="d-block m-auto" src="https://images.vexels.com/media/users/3/224234/isolated/preview/ff7c525c1c3e1bef640644542001e1fd-online-school-logo.png" alt="High School">
                `
            const schoolCardTitle = document.getElementsByClassName("school-card-title")[0];
            schoolCardTitle.textContent = "High School";
            const schoolCardId = document.getElementsByClassName("school-card-row")[0];
            schoolCardId.innerHTML = `
            <span class="school-card-label">School ID:</span>
            <span>N/A</span>
            `
            } catch {
                holdfunc.notify("School card crest instance failed - this is to be expected. Is it possible that you're signed out?");
            }
            /* Name and ID methods have moved to navbar.js as it was conflicting
               Below is the old broken code for archival reasons */
            
            //const dropHeader = document.getElementsByClassName("dropdown-header")[0].innerHTML = "";
            //for (let element of dropHeader.getElementsByTagName("*")) {
            //    element.innerHTML = ""; // me realising we don't need these fancy detection methods

                /* if (hasNumber(element.textContent)) { // likely to be school ID
                    element.remove(); //element.textContent = "N/A"
                //} else if (element.textContent.includes("Student") || element.textContent.includes("Caregiver") || element.textContent.includes("Account")) {
                //    element.textContent = "Account"
                } else if (!hasNumber(element.textContent)) { // not likely to be school ID, probably name
                    element.remove(); //element.textContent = "John Doe"
                } */
            //}
            //const dropdownDivider = document.getElementsByClassName("dropdown-divider")[0].innerHTML = ""; // remove the first dropdown divider
            for (let element of document.getElementsByClassName("school-card-info")) {
                element.remove();
            }
        }
    });
}
handleBarcodeVisibility();
updateProfilePictureByURL();
updatePrivateMode();
updateSuperPrivateMode();