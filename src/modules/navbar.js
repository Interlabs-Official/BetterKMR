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

/* navbar.js - src/modules/navbar.js */

/* The newest version (the one you're looking at) is the dynamic navbar.
   It's enabled by default, and you can disable it in the settings page.
   If you disable it, it will fall back to the school's Kamar navbar.
   If you want to hide certain pages from the navbar, you can do so in the settings page.
   This dynamic navbar is an experimental feature made by Claude 3.7 Sonnet (AI), because the task would be hard for me to do in the time I've got.
   However, the previous versions were actually made by me, you'd be able to tell.
*/

chrome.storage.sync.get(["dynamic_navbar", "dynamic_navbar_hidden_navbar_pages", "custom_navbar_layout", "dynamic_navbar_show_betterkmr_lightbulb", "exp_padded-navbar"]).then((result) => {
    const useModifiedNavbar = result.dynamic_navbar == true || result.dynamic_navbar == undefined || result.dynamic_navbar == null;

    if (result["exp_padded-navbar"]) {
        const padded = `
        body .sk_nav {
            padding: 0.5rem 1rem !important;
        }

        body .sk_nav_text {
            /* Add your color here */
            transition-property: color, background-color !important;
            transition-duration: 0.2s ease-in-out !important;
            padding: 0.6em 0.9em !important;
            border-radius: 5px !important; /* Can be a separate nav-item-radius */
            font-weight: 500 !important;
        }

        a,
        a:link,
        a:visited {
            /* Add your color here */
            /* color: #0066ff !important; */
            text-decoration: none !important;
            transition-property: color, text-decoration !important;
            transition-duration: 0.2 ease-in-out !important;
        }

        a:hover,
        a:focus {
            /* Add your hover color here */
            text-decoration: underline !important;
        }
        `
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(padded));
        document.head.appendChild(style);
    }

    if (useModifiedNavbar) {
        const hiddenPages = result.dynamic_navbar_hidden_navbar_pages ? result.dynamic_navbar_hidden_navbar_pages.split(',').map(page => page.trim().toLowerCase()) : [];

        const navbar = document.getElementById("navigation");
        const mainNav = navbar.getElementsByClassName("main-nav")[0];
        let activeThing = null;
        let beforeItemTrim = null;

        try {
            for (let i = 0; i < mainNav.children.length; i++) {
                if (mainNav.children[i].classList.contains("active")) {
                    activeThing = mainNav.children[i];
                    beforeItemTrim = activeThing.textContent.trim();
                    break;
                }
            }
        } catch (e) {
            holdfunc.notify("Attempt to modify main navigation failed. It's possible the user isn't logged in.");
        }

        let isPrivateMode = false;
        let ds_1 = "";
        let ds_2 = "";
        let ds_3 = "";
        let headerContent = "";
        let shouldUseSuperPrivate = false;

        try {
            ds_1 = document.getElementsByClassName("d-block")[0].textContent;
            ds_2 = document.getElementsByClassName("d-block")[1].textContent;
            ds_3 = "BetterKMR Account";

            headerContent = `
                <div class="dropdown-header sk_nav_text">
                    <strong class="d-block">${ds_1}</strong>
                    <small class="d-block">${ds_2}</small>
                    <small class="d-block">${ds_3}</small>
                </div>
            `;
        } catch (e) {
            holdfunc.notify("Attempt to modify navbar failed. The user may not be logged in.");
        }

        chrome.storage.sync.get(["superPrivateMode"], (result) => {
            if (result.superPrivateMode === true) {
                shouldUseSuperPrivate = true;
                buildNavbar();
            } else {
                buildNavbar();
            }
        });

        var mainNavItems = [
            { text: "Home", href: "/", className: "nav-item" },
            { text: "Notices", href: "/notices", className: "nav-item nav-item-notices" },
            { text: "Attendance", href: "/attendance", className: "nav-item nav-item-attendance" },
            { text: "Calendar", href: "/calendar", className: "nav-item nav-item-calendar" },
            { 
                text: "Results", 
                className: "nav-item dropdown",
                dropdown: true,
                folderId: "menu-folder20240123023233",
                children: [
                    { text: "Current Year", href: "/results_list", className: "nav-link-results_list" },
                    { text: "All Results", href: "/results_all", className: "nav-link-results_all" },
                    { text: "Recognitions", href: "/results_recognitions", className: "nav-link-results_recognitions" },
                    { text: "Awards", href: "/results_awards", className: "nav-link-results_awards" },
                    { text: "Groups", href: "/groups", className: "nav-link-groups" }
                ]
            },
            { 
                text: "NCEA", 
                className: "nav-item dropdown",
                dropdown: true,
                folderId: "menu-folder20240123024154",
                children: [
                    { text: "Summary", href: "/results_summary", className: "nav-link-results_summary" },
                    { text: "Pathways", href: "/careers_pathways", className: "nav-link-careers_pathways" }
                ]
            },
            { 
                text: "Reports", 
                className: "nav-item dropdown",
                dropdown: true,
                folderId: "menu-folder20240123022746",
                children: [
                    { text: "Reports", href: "/reports", className: "nav-link-reports" },
                    { text: "Pastoral", href: "/pastoral", className: "nav-link-pastoral" },
                    { text: "Notes", href: "/notes", className: "nav-link-notes" }
                ]
            },
            { text: "Surveys", href: "/surveys", className: "nav-item nav-item-surveys" },
            { text: "Contact", href: "/contact_us", className: "nav-item nav-item-contact_us" }

        ];

        if (result.custom_navbar_layout) {
            console.log("Custom navbar layout found:", result.custom_navbar_layout);
            if (Array.isArray(result.custom_navbar_layout)) {
                console.log("Custom navbar layout is an array.");
                console.log(mainNavItems);
                mainNavItems = result.custom_navbar_layout;
                console.log(mainNavItems);
            }
        }

        const userMenuItems = [
            { text: "BetterKMR Menu", href:  chrome.runtime.getURL("settings/index.html"), target: "_blank" },
            { isDivider: true },
            { text: "Student Details", href: "/student_details", className: "nav-link-student_details" },
            { text: "Caregiver Details", href: "/caregiver_details", className: "nav-link-caregiver_details" },
            { text: "Emergency Contacts", href: "/emergency_contact_details", className: "nav-link-emergency_contact_details" },
            { text: "Medical Details", href: "/medical_details", className: "nav-link-medical_details" },
            { isDivider: true },
            { text: "Change Password", href: "/details/change_password" },
            { text: "Data Sharing", href: "/details/data_sharing" },
            { isDivider: true },
            { text: "Logout", href: "/auth/logout" },
            { isDivider: true }
        ];

        let hasUsedPrivate = false;

        function setActiveNavItem(navItem, pathname) {

            const allNavItems = document.querySelectorAll('.nav-item');
            allNavItems.forEach(item => item.classList.remove('active'));

            if (navItem.dropdown) {
                const activeChild = navItem.children.find(child => child.href === pathname);
                if (activeChild) {
                    navItem.classList.add('active');
                    return true;
                }
            }

            if (navItem.href === pathname) {
                navItem.classList.add('active');
                return true;
            }

            return false;
        }

        function buildNavbar() {
            if (hasUsedPrivate && shouldUseSuperPrivate) return;
            if (shouldUseSuperPrivate) {
                hasUsedPrivate = true;
                headerContent = "";
            }

            if (!holdfunc.isLoggedIn()) return;

            const navContainer = document.createElement('div');
            navContainer.className = 'nav-main collapse navbar-collapse';
            navContainer.id = 'navigation';

            const userNav = document.createElement('ul');
            userNav.className = 'nav user-nav';

            const accountItem = document.createElement('li');
            accountItem.className = 'nav-item nav-item--account dropdown';

            const accountContainer = document.createElement('div');
            accountContainer.className = 'account-container';

            const accountItemDiv = document.createElement('div');
            accountItemDiv.className = 'account-item';

            const betterKMRMenuLink = document.createElement('a');
            betterKMRMenuLink.href =  chrome.runtime.getURL("settings/index.html");
            betterKMRMenuLink.target = '_blank';
            betterKMRMenuLink.className = 'avatar-container';
            betterKMRMenuLink.style.animation = "betterkmr-glow 2s ease-in-out infinite alternate";

            const glowStyle = document.createElement('style');
            glowStyle.textContent = `
            @keyframes betterkmr-glow {
                from {
                    filter: drop-shadow(0 0 0.2rem rgba(255, 255, 255, 0.2));
                }
                to {
                    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.8));
                }
            }`;
            document.head.appendChild(glowStyle);

            const avatarLink = document.createElement('a');
            avatarLink.href = '#';
            avatarLink.className = 'avatar-container';
            avatarLink.setAttribute('data-toggle', 'modal');
            avatarLink.setAttribute('data-target', '#profile-image');

            const avatar = document.createElement('img');

            chrome.storage.local.get('choose_profile_picture', function(result) {
                if (result['choose_profile_picture']) {
                    if (avatar) {
                        holdfunc.notify("Custom profile picture found and set (first 50 characters): " + result['choose_profile_picture'].slice(0, 50) + "...");
                        avatar.src = result['choose_profile_picture'];
                    } else {
                        holdfunc.notify("Avatar image failed to load. Please report this to the developers or refresh your page.");
                    }
                } else {
                    holdfunc.notify("No custom profile picture was found on initial load. This may change when the full content loads.");
                    avatar.src = '/students/profile';
                }
            });
            avatar.className = 'avatar';

            if (result.dynamic_navbar_show_betterkmr_lightbulb == true || result.dynamic_navbar_show_betterkmr_lightbulb == null) {
                const kmrMenuImage = document.createElement('img');
                kmrMenuImage.src = chrome.runtime.getURL("icon/icon_transparent_48.png");
                betterKMRMenuLink.appendChild(kmrMenuImage);
            }
            avatarLink.appendChild(avatar);

            const accountLink = document.createElement('a');
            accountLink.className = 'sk_nav_text nav-link nav-link--account dropdown-toggle';
            accountLink.href = '#user-menu';
            accountLink.role = 'button';
            accountLink.setAttribute('data-toggle', 'collapse');
            accountLink.setAttribute('aria-expanded', 'true');
            accountLink.setAttribute('aria-controls', 'user-menu');

            const accountText = document.createElement('strong');
            accountText.textContent = 'My Account';

            accountLink.appendChild(accountText);
            accountItemDiv.appendChild(betterKMRMenuLink);
            accountItemDiv.appendChild(avatarLink);
            accountItemDiv.appendChild(accountLink);

            const userMenu = document.createElement('div');
            userMenu.className = 'nav-menu sk_nav collapse';
            userMenu.id = 'user-menu';
            userMenu.style = '';

            if (headerContent) {
                userMenu.insertAdjacentHTML('beforeend', headerContent);
            }

            userMenuItems.forEach(item => {
                if (item.text && hiddenPages.includes(item.text.toLowerCase())) {
                    return;
                }

                if (item.isDivider) {
                    const divider = document.createElement('div');
                    divider.className = 'dropdown-divider';
                    userMenu.appendChild(divider);
                } else {
                    const link = document.createElement('a');
                    link.className = `sk_nav_text nav-link ${item.className || ''}`;
                    link.href = item.href;
                    if (item.target) link.target = item.target;
                    link.textContent = item.text;
                    userMenu.appendChild(link);
                }
            });

            accountContainer.appendChild(accountItemDiv);
            accountContainer.appendChild(userMenu);
            accountItem.appendChild(accountContainer);
            userNav.appendChild(accountItem);

            const mainNavUl = document.createElement('ul');
            mainNavUl.className = 'nav main-nav';

            mainNavItems.forEach(item => {
                if (hiddenPages.includes(item.text.toLowerCase())) {
                    return;
                }

                const navItem = document.createElement('li');
                navItem.className = item.className;

                if (item.dropdown) {
                    const visibleChildren = item.children.filter(child => 
                        !hiddenPages.includes(child.text.toLowerCase())
                    );

                    if (visibleChildren.length === 0) {
                        return;
                    }

                    const dropdownToggle = document.createElement('a');
                    dropdownToggle.className = 'sk_nav_text nav-link dropdown-toggle collapsed';
                    dropdownToggle.href = `#${item.folderId}`;
                    dropdownToggle.role = 'button';
                    dropdownToggle.setAttribute('data-toggle', 'collapse');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    dropdownToggle.setAttribute('aria-controls', item.folderId);
                    dropdownToggle.textContent = item.text;

                    const dropdownMenu = document.createElement('div');
                    dropdownMenu.className = 'nav-menu sk_nav collapse';
                    dropdownMenu.id = item.folderId;
                    dropdownMenu.style = '';

                    visibleChildren.forEach(child => {
                        const childLink = document.createElement('a');
                        childLink.className = `sk_nav_text nav-link ${child.className || ''}`;
                        childLink.href = child.href;
                        childLink.textContent = child.text;
                        dropdownMenu.appendChild(childLink);
                    });

                    navItem.appendChild(dropdownToggle);
                    navItem.appendChild(dropdownMenu);

                    if (visibleChildren.some(child => window.location.pathname.includes(child.href) && child.href !== "/")) {
                        navItem.classList.add('active');
                    }
                } else {
                    const link = document.createElement('a');
                    link.className = 'sk_nav_text nav-link';
                    link.href = item.href;
                    link.textContent = item.text;

                    if (window.location.pathname.includes(item.href) && item.href !== "/") {
                        navItem.classList.add('active');
                    }

                    navItem.appendChild(link);
                }

                mainNavUl.appendChild(navItem);
            });

            navContainer.appendChild(userNav);
            navContainer.appendChild(mainNavUl);

            navbar.innerHTML = '';
            navbar.appendChild(navContainer);

            if (window.location.href.includes("contact_us")) {
                const contactBtn = document.querySelector(".nav-item-contact_us");
                if (contactBtn) {
                    contactBtn.classList.add("active");
                }
            }

            if (beforeItemTrim) {
                const newMainNav = navbar.querySelector(".main-nav");
                if (newMainNav) {
                    mainNavItems.forEach(item => {
                        if (item.text === beforeItemTrim) {
                            const navItem = newMainNav.querySelector(`.${item.className}`);
                            if (navItem) navItem.classList.add('active');
                        }
                    });
                }
            }
        }
    } else {

        var some_element = document.getElementsByClassName("dropdown-header sk_nav_text")[0];
        if (some_element) {
            some_element.insertAdjacentHTML('afterend', `<a href="${/* webpackIgnore: true */ chrome.runtime.getURL("settings/index.html")}" target="_blank" class="sk_nav_text nav-link">BetterKMR Menu</a>`);
        }
    }
});