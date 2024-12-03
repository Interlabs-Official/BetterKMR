const navbar = document.getElementById("navigation");
const intHTML = `
<div class="nav-main collapse navbar-collapse" id="navigation">
						<ul class="nav user-nav">
    <li class="nav-item nav-item--account dropdown">
        <div class="account-container">
            <div class="account-item">
                <a href="#" class="avatar-container" data-toggle="modal" data-target="#profile-image">
                    <img src="https://whanganuihigh.school.kiwi/students/profile" class="avatar">
                </a>
                <a class="sk_nav_text nav-link nav-link--account dropdown-toggle" href="#user-menu" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="user-menu">
                    <strong>My Account</strong>
                </a>
            </div>
            <div class="nav-menu sk_nav collapse" id="user-menu" style="">
                <div class="dropdown-header sk_nav_text">
                                            <strong class="d-block">Conor Brodie</strong>                    <small class="d-block">brodie.c.23019</small>
                    <small class="d-block">Student Account</small>
                </div>
                <div class="dropdown-divider"></div>
                <a class="sk_nav_text nav-link nav-link-caregiver_details" href="https://whanganuihigh.school.kiwi/caregiver_details">Caregiver Details</a><a class="sk_nav_text nav-link nav-link-emergency_contact_details" href="https://whanganuihigh.school.kiwi/emergency_contact_details">Emergency Contacts</a><a class="sk_nav_text nav-link nav-link-medical_details" href="https://whanganuihigh.school.kiwi/medical_details">Medical Details</a><div class="dropdown-divider"></div><a href="https://whanganuihigh.school.kiwi/details/change_password" class="sk_nav_text nav-link">Change Password</a>
                <a href="https://whanganuihigh.school.kiwi/details/data_sharing" class="sk_nav_text nav-link">Data Sharing</a>
                                <div class="dropdown-divider"></div>
                <a href="https://whanganuihigh.school.kiwi/auth/logout" class="sk_nav_text nav-link">Logout</a>
                <div class="dropdown-divider"></div>
            </div>
        </div>
    </li>
</ul>
<ul class="nav main-nav">
    <li class="nav-item  active">
        <a class="sk_nav_text nav-link" href="https://whanganuihigh.school.kiwi/">Home</a>
    </li>
        <li class="nav-item nav-item-notices">
            <a class="sk_nav_text nav-link nav-link-notices" href="https://whanganuihigh.school.kiwi/notices">Notices</a>
        </li>
            <li class="nav-item nav-item-attendance">
            <a class="sk_nav_text nav-link nav-link-attendance" href="https://whanganuihigh.school.kiwi/attendance">Attendance</a>
        </li>
                            <li class="nav-item dropdown">
            <a class="sk_nav_text nav-link dropdown-toggle" href="#menu-folder20240123023233" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="menu-folder20240123023233">Results</a>
            <div class="nav-menu sk_nav collapse show" id="menu-folder20240123023233" style=""><a class="sk_nav_text nav-link nav-link-results_list" href="https://whanganuihigh.school.kiwi/results_list">Current Year</a><a class="sk_nav_text nav-link nav-link-results_all" href="https://whanganuihigh.school.kiwi/results_all">All Results</a><a class="sk_nav_text nav-link nav-link-results_recognitions" href="https://whanganuihigh.school.kiwi/results_recognitions">Recognitions</a><a class="sk_nav_text nav-link nav-link-results_awards" href="https://whanganuihigh.school.kiwi/results_awards">Awards</a>
            </div>
        </li>        
            
            
    <li class="nav-item dropdown">
            <a class="sk_nav_text nav-link dropdown-toggle" href="#menu-folder20240123024154" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="menu-folder20240123024154">NCEA</a>
            <div class="nav-menu sk_nav collapse" id="menu-folder20240123024154" style=""><a class="sk_nav_text nav-link nav-link-results_summary" href="https://whanganuihigh.school.kiwi/results_summary">Summary</a>            <a class="sk_nav_text nav-link nav-link-careers_pathways" href="https://whanganuihigh.school.kiwi/careers_pathways">Pathways</a></div>
        </li><li class="nav-item dropdown">
            <a class="sk_nav_text nav-link dropdown-toggle" href="#menu-folder20240123022746" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="menu-folder20240123022746">Reports</a>
            <div class="nav-menu sk_nav collapse" id="menu-folder20240123022746" style=""><a class="sk_nav_text nav-link nav-link-reports" href="https://whanganuihigh.school.kiwi/reports">Reports</a><a class="sk_nav_text nav-link nav-link-pastoral" href="https://whanganuihigh.school.kiwi/pastoral">Pastoral</a>            </div>
        </li></ul>					</div>
`
navbar.innerHTML = intHTML;