// Select the navigation bar
const navbar = document.getElementById("navigation");

// Identify the original active item in the current HTML
const mainNav = navbar.getElementsByClassName("main-nav")[0];
let activeThing = null;
var beforeItemTrim = null;

// Loop to find the active item
for (let i = 0; i < mainNav.children.length; i++) {
    if (mainNav.children[i].classList.contains("active")) {
        activeThing = mainNav.children[i];
        beforeItemTrim = activeThing.textContent.trim();
        break;
    }
}
    const longText = `
    <div class="nav-main collapse navbar-collapse" id="navigation">
                            <ul class="nav user-nav">
        <li class="nav-item nav-item--account dropdown">
            <div class="account-container">
                <div class="account-item">
                    <a href="#" class="avatar-container" data-toggle="modal" data-target="#profile-image">
                        <img src="/students/profile" class="avatar">
                    </a>
                    <a class="sk_nav_text nav-link nav-link--account dropdown-toggle" href="#user-menu" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="user-menu">
                        <strong>My Account</strong>
                    </a>
                </div>
                <div class="nav-menu sk_nav collapse" id="user-menu" style="">
                    <div class="dropdown-header sk_nav_text">
                                                <strong class="d-block">${document.getElementsByClassName("d-block")[0].textContent}</strong>                    <small class="d-block">${document.getElementsByClassName("d-block")[1].textContent}</small>
                        <small class="d-block">Student Account</small>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a href="${chrome.runtime.getURL("settings/index.html")}" target="_blank" class="sk_nav_text nav-link">BetterKMR Menu</a>
                    <div class="dropdown-divider"></div>
                    <a class="sk_nav_text nav-link nav-link-caregiver_details" href="/caregiver_details">Caregiver Details</a><a class="sk_nav_text nav-link nav-link-emergency_contact_details" href="/emergency_contact_details">Emergency Contacts</a><a class="sk_nav_text nav-link nav-link-medical_details" href="/medical_details">Medical Details</a><div class="dropdown-divider"></div><a href="/details/change_password" class="sk_nav_text nav-link">Change Password</a>
                    <a href="/details/data_sharing" class="sk_nav_text nav-link">Data Sharing</a>
                                    <div class="dropdown-divider"></div>
                    <a href="/auth/logout" class="sk_nav_text nav-link">Logout</a>
                    <div class="dropdown-divider"></div>
                </div>
            </div>
        </li>
    </ul>
    <ul class="nav main-nav">
        <li class="nav-item">
            <a class="sk_nav_text nav-link active" href="/">Home</a>
        </li>
            <li class="nav-item nav-item-notices">
                <a class="sk_nav_text nav-link nav-link-notices" href="/notices">Notices</a>
            </li>
                <li class="nav-item nav-item-attendance">
                <a class="sk_nav_text nav-link nav-link-attendance" href="/attendance">Attendance</a>
            </li>
                                <li class="nav-item dropdown">
                <a class="sk_nav_text nav-link dropdown-toggle collapsed" href="#menu-folder20240123023233" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="menu-folder20240123023233">Results</a>
                <div class="nav-menu sk_nav collapse" id="menu-folder20240123023233" style=""><a class="sk_nav_text nav-link nav-link-results_list" href="/results_list">Current Year</a><a class="sk_nav_text nav-link nav-link-results_all" href="/results_all">All Results</a><a class="sk_nav_text nav-link nav-link-results_recognitions" href="/results_recognitions">Recognitions</a><a class="sk_nav_text nav-link nav-link-results_awards" href="/results_awards">Awards</a>
                </div>
            </li>        
                
                
        <li class="nav-item dropdown">
                <a class="sk_nav_text nav-link dropdown-toggle collapsed" href="#menu-folder20240123024154" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="menu-folder20240123024154">NCEA</a>
                <div class="nav-menu sk_nav collapse" id="menu-folder20240123024154" style=""><a class="sk_nav_text nav-link nav-link-results_summary" href="/results_summary">Summary</a>            <a class="sk_nav_text nav-link nav-link-careers_pathways" href="/careers_pathways">Pathways</a></div>
            </li><li class="nav-item dropdown">
                <a class="sk_nav_text nav-link dropdown-toggle collapsed" href="#menu-folder20240123022746" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="menu-folder20240123022746">Reports</a>
                <div class="nav-menu sk_nav collapse" id="menu-folder20240123022746" style=""><a class="sk_nav_text nav-link nav-link-reports" href="/reports">Reports</a><a class="sk_nav_text nav-link nav-link-pastoral" href="/pastoral">Pastoral</a>            </div>
            </li>
        <li class="nav-item nav-item-contact_us">
            <a class="sk_nav_text nav-link nav-link-contact_us" href="/contact_us">Contact</a>
        </li>
            </ul>					
            </div>
    `
    navbar.innerHTML = longText;
    var currentItemTrim = null;
    if (activeThing) {
        const activeHref = activeThing.querySelector("a").getAttribute("href");
        const newMainNav = navbar.getElementsByClassName("main-nav")[0];
        
        for (let i = 0; i < newMainNav.children.length; i++) {
            const navItem = newMainNav.children[i];
            const link = navItem.querySelector("a");
            console.log(navItem.textContent.trim());
            currentItemTrim = navItem.textContent.trim()
            if (beforeItemTrim && currentItemTrim) {
                if (beforeItemTrim === currentItemTrim) {
                    navItem.classList.add("active");
                    break;
                }
            }
            /* if (link && link.getAttribute("href") === activeHref) {
                navItem.classList.add("active");
            } */
        }
    }