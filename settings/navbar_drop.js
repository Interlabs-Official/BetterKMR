console.log("navbar_drop.js loaded");
const STORAGE_KEY = 'custom_navbar_layout';
        var defaultNavItems = [
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
                text: "NCEA & Courses", 
                className: "nav-item dropdown",
                dropdown: true,
                folderId: "menu-folder20240123024154",
                children: [
                    { text: "Summary", href: "/results_summary", className: "nav-link-results_summary" },
                    { text: "Pathways", href: "/careers_pathways", className: "nav-link-careers_pathways" },
                    { text: "Course Selection", href: "/course_selection", className: "nav-item nav-item-course_selection" }
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

let liveRefreshTimeout;
const TYPING_TIMEOUT = 500; // ms to wait after typing stops before saving

document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(STORAGE_KEY, function(result) {
        if (result[STORAGE_KEY]) {
            mainNavItems = result[STORAGE_KEY];
        } else {
            mainNavItems = defaultNavItems;
        }

        const elementList = document.getElementById("element_list");

        elementList.innerHTML = '';

        updateNavbar();
        for (const item of mainNavItems) {
            if (item.dropdown) {
                addNewElement(true);
                const lastElement = elementList.lastElementChild;
                const dropdownInput = lastElement.querySelector('input');
                dropdownInput.value = item.text;

                for (const child of item.children) {
                    addDropdownItem(lastElement, item.text);
                    const itemInputs = lastElement.lastElementChild.querySelectorAll('input');
                    itemInputs[0].value = child.text;
                    itemInputs[1].value = child.href;
                }
            } else {
                addNewElement(false);
                const lastElement = elementList.lastElementChild;
                const inputs = lastElement.querySelectorAll('input');
                inputs[0].value = item.text;
                inputs[1].value = item.href;
            }
        }
    });
    document.getElementById("add_new_element_btn").addEventListener("click", () => addNewElement(false));
    document.getElementById("add_new_dropdown_btn").addEventListener("click", () => addNewElement(true));
    document.getElementById("save_nav_config_btn").addEventListener("click", saveNavbarConfig);
    document.getElementById("clear_all_btn").addEventListener("click", clearAllElements);
    document.getElementById("reset_to_defaults_btn").addEventListener("click", resetToDefaults);
    document.getElementById("button1").addEventListener("click", () => {
        window.history.back();
    });

    const actionButtons = document.querySelector('.action-buttons');
    const liveRefreshLabel = document.createElement('label');
    liveRefreshLabel.className = 'custom-checkbox';

    const liveRefreshCheckbox = document.createElement('input');
    liveRefreshCheckbox.type = 'checkbox';
    liveRefreshCheckbox.id = 'live_refresh';
    liveRefreshCheckbox.checked = true;

    const checkboxText = document.createElement('span');
    checkboxText.textContent = 'Autosave';

    liveRefreshLabel.appendChild(liveRefreshCheckbox);
    liveRefreshLabel.appendChild(checkboxText);
    actionButtons.appendChild(liveRefreshLabel);
    
    const elementList = document.getElementById('element_list');
    elementList.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT' && liveRefreshCheckbox.checked) {
            clearTimeout(liveRefreshTimeout);
            liveRefreshTimeout = setTimeout(() => {
                saveNavbarConfig();
            }, TYPING_TIMEOUT);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 200);
  });

  function createUrlComboBox() {
    const wrapper = document.createElement('div');
    wrapper.className = 'url-input-wrapper';
    
    const input = document.createElement('input');
    input.className = 'url-combo';
    input.type = 'text';
    input.placeholder = 'Enter directory here e.g. /calendar';
    
    const dropdown = document.createElement('div');
    dropdown.className = 'url-dropdown';
    
    const commonUrls = [
        { url: '/', label: 'Home' },
        { url: '/notices', label: 'Notices' },
        { url: '/attendance', label: 'Attendance' },
        { url: '/calendar', label: 'Calendar' },
        { url: '/results_list', label: 'Current Year Results' },
        { url: '/results_all', label: 'All Results' },
        { url: '/results_summary', label: 'Results Summary' },
        { url: '/careers_pathways', label: 'Careers Pathways'},
        { url: '/results_recognitions', label: 'Recognitions' },
        { url: '/results_awards', label: 'Awards' },
        { url: '/reports', label: 'Reports' },
        { url: '/pastoral', label: 'Pastoral' },
        { url: '/notes', label: 'Notes' },
        { url: '/student_details', label: 'Student Details'},
        { url: '/medical_details', label: 'Medical Details'},
        { url: '/surveys', label: 'Surveys' },
        { url: '/contact_us', label: 'Contact Us' },
        { url: '/groups', label: 'Groups' }
    ];
    
    commonUrls.forEach(({url, label}) => {
        const item = document.createElement('div');
        item.className = 'url-dropdown-item';
        
        const title = document.createElement('span');
        title.className = 'url-item-title';
        title.textContent = url;
        
        const subtitle = document.createElement('span');
        subtitle.className = 'url-item-subtitle';
        subtitle.textContent = label;
        
        item.appendChild(title);
        item.appendChild(subtitle);
        item.dataset.value = url;
        
        item.addEventListener('click', () => {
            input.value = url;
            dropdown.classList.remove('show');
            input.dispatchEvent(new Event('input'));
            input.focus();
        });
        
        dropdown.appendChild(item);
    });
    
    // Toggle dropdown on input focus
    input.addEventListener('focus', () => {
        dropdown.classList.add('show');
    });
    
    // Filter items as user types
    input.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const items = dropdown.querySelectorAll('.url-dropdown-item');
        
        items.forEach(item => {
            const itemValue = item.dataset.value.toLowerCase();
            const itemText = item.textContent.toLowerCase();
            const shouldShow = itemValue.includes(value) || itemText.includes(value);
            item.style.display = shouldShow ? 'flex' : 'none';
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
    
    // Add dropdown arrow indicator
    const indicator = document.createElement('div');
    indicator.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`;
    indicator.style.position = 'absolute';
    indicator.style.right = '12px';
    indicator.style.top = '50%';
    indicator.style.transform = 'translateY(-50%)';
    indicator.style.pointerEvents = 'none';
    indicator.style.color = '#666';
    
    wrapper.appendChild(input);
    wrapper.appendChild(dropdown);
    wrapper.appendChild(indicator);
    
    return wrapper;
}

function addElementToList(elmList, item) {
    if (!item.dropdown) {
        const elm = document.createElement("div");
        elm.classList.add("element");
        const label1 = document.createElement("label");
        label1.for = "a_page_" + item.text;
        label1.textContent = "Title";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.id = "a_page_" + item.text;
        input1.value = item.text;
        input1.placeholder = "Enter a title, e.g. Calendar";
        const label2 = document.createElement("label");
        label2.for = "b_page_" + item.text;
        label2.style = "color: #8f8f8f; font-style: italic;";
        label2.textContent = "URL";
        const urlWrapper = createUrlComboBox();
        const input2 = urlWrapper.querySelector('input');
        input2.id = "b_page_" + item.text;
        input2.value = item.href;
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => elm.remove();
        const deleteImg = document.createElement("img");
        deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
        deleteImg.width = "12";
        deleteImg.height = "12";
        deleteImg.classList.add("svg-white");
        deleteBtn.appendChild(deleteImg);

        const moveButtons = createMoveButtons(elm);
        
        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(label2);
        elm.appendChild(urlWrapper);
        elm.appendChild(deleteBtn);
        elm.appendChild(moveButtons);
        elmList.appendChild(elm);
    } else {
        const elm = document.createElement("div");
        elm.classList.add("element");
        const label1 = document.createElement("label");
        label1.for = "a_dropdown_" + item.text;
        label1.textContent = "Dropdown";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.id = "dropdown_" + item.text;
        input1.value = item.text;
        input1.placeholder = "Enter your element name here e.g. Calendar";
        const moveButtons = createMoveButtons(elm);
        
        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(moveButtons);
        elmList.appendChild(elm);
        for (const instance of item.children) {
            const elm = document.createElement("div");
            elm.classList.add("element");
            const label1 = document.createElement("label");
            label1.for = "a_dropdown_" + instance.text;
            label1.textContent = "Title";
            const input1 = document.createElement("input");
            input1.type = "text";
            input1.id = "a_dropdown_" + instance.text;
            input1.value = instance.text;
            input1.placeholder = "Enter your element name here e.g. Calendar";
            const label2 = document.createElement("label");
            label2.for = "b_dropdown_" + instance.text;
            label2.style = "color: #8f8f8f; font-style: italic;";
            label2.textContent = "URL";
            const urlWrapper = createUrlComboBox();
            const input2 = urlWrapper.querySelector('input');
            input2.id = "b_dropdown_" + instance.text;
            input2.value = instance.href;
            const label3 = document.createElement("label");
            label3.for = "b_dropdown_" + instance.text;
            label3.style = "color: #8f8f8f; font-style: italic;";
            label3.textContent = "in dropdown named";
            const input3 = document.createElement("input");
            input3.type = "text";
            input3.id = "b_dropdown_" + instance.text;
            input3.value = item.text;
            input3.placeholder = "Enter directory here e.g. /calendar or enter URL";
            const addItemBtn = document.createElement("button");
            addItemBtn.classList.add("add-item-btn");
            addItemBtn.onclick = () => addDropdownItem(elm, input1.value);
            const addImg = document.createElement("img");
            addImg.src = "../assets/images/font-awesome/plus-solid.svg";
            addImg.width = "12";
            addImg.height = "12";
            addImg.classList.add("svg-white");
            addItemBtn.appendChild(addImg);
    
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => elm.remove();
            const deleteImg = document.createElement("img");
            deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
            deleteImg.width = "12";
            deleteImg.height = "12";
            deleteImg.classList.add("svg-white");
            deleteBtn.appendChild(deleteImg);

            const moveButtons = createMoveButtons(elm, true);
    
            elm.appendChild(label1);
            elm.appendChild(input1);
            elm.appendChild(label2);
            elm.appendChild(urlWrapper);
            elm.appendChild(label3);
            elm.appendChild(input3);
            elm.appendChild(addItemBtn);
            elm.appendChild(deleteBtn);
            elm.appendChild(moveButtons);
            elmList.appendChild(elm);
        }
    }
}

function addNewElement(isDropdown = false) {
    const elementList = document.getElementById("element_list");
    const elm = document.createElement("div");
    elm.classList.add("element");

    if (!isDropdown) {

        const label1 = document.createElement("label");
        label1.textContent = "Title";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Enter your element name here e.g. Calendar";

        const label2 = document.createElement("label");
        label2.style = "color: #8f8f8f; font-style: italic;";
        label2.textContent = "URL";
        const urlWrapper = createUrlComboBox();
        const input2 = urlWrapper.querySelector('input');

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => elm.remove();
        const deleteImg = document.createElement("img");
        deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
        deleteImg.width = "12";
        deleteImg.height = "12";
        deleteImg.classList.add("svg-white");
        deleteBtn.appendChild(deleteImg);

        const moveButtons = createMoveButtons(elm);
        
        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(label2);
        elm.appendChild(urlWrapper);
        elm.appendChild(deleteBtn);
        elm.appendChild(moveButtons);
        elm.scrollIntoView();
    } else {
        const label1 = document.createElement("label");
        label1.textContent = "Dropdown Name";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Enter dropdown name e.g. Results";

        const addItemBtn = document.createElement("button");
        addItemBtn.classList.add("add-item-btn");
        addItemBtn.onclick = () => addDropdownItem(elm, input1.value);
        const addImg = document.createElement("img");
        addImg.src = "../assets/images/font-awesome/plus-solid.svg";
        addImg.width = "12";
        addImg.height = "12";
        addImg.classList.add("svg-white");
        addItemBtn.appendChild(addImg);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => elm.remove();
        const deleteImg = document.createElement("img");
        deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
        deleteImg.width = "12";
        deleteImg.height = "12";
        deleteImg.classList.add("svg-white");
        deleteBtn.appendChild(deleteImg);

        const moveButtons = createMoveButtons(elm);
        
        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(addItemBtn);
        elm.appendChild(deleteBtn);
        elm.appendChild(moveButtons);
    }

    elementList.appendChild(elm);
}

function addDropdownItem(dropdownElm, dropdownName) {
    const itemElm = document.createElement("div");
    itemElm.classList.add("dropdown-item", "element");

    const label1 = document.createElement("label");
    label1.textContent = "Item Name";
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.placeholder = "Enter item name";

    const label2 = document.createElement("label");
    label2.classList.add("grey-label");
    label2.textContent = "URL";
    const urlWrapper = createUrlComboBox();
    const input2 = urlWrapper.querySelector('input');
    input2.placeholder = "Enter directory here e.g. /results_list";

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = dropdownName;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => itemElm.remove();
    const deleteImg = document.createElement("img");
    deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
    deleteImg.width = "12";
    deleteImg.height = "12";
    deleteImg.classList.add("svg-white");

    const moveButtons = createMoveButtons(itemElm, true);
    
    itemElm.appendChild(label1);
    itemElm.appendChild(input1);
    itemElm.appendChild(label2);
    itemElm.appendChild(urlWrapper);
    itemElm.appendChild(hiddenInput);
    itemElm.appendChild(deleteBtn);
    itemElm.appendChild(moveButtons);
    deleteBtn.appendChild(deleteImg);

    dropdownElm.appendChild(itemElm);
}

function clearAllElements() {
    const elementList = document.getElementById("element_list");
    elementList.innerHTML = '';
}

function generateUniqueFolderId() {
    return "menu-folder-" + Math.random().toString(36).substr(2, 9) + Date.now();
}

function saveNavbarConfig() {
    const elements = document.querySelectorAll('.element');
    const config = [];
    const dropdownMap = new Map();

    elements.forEach(element => {
        const inputs = element.querySelectorAll('input');
        if (inputs.length === 2) {
            config.push({
                text: inputs[0].value,
                href: inputs[1].value,
                className: "nav-item nav-item-" + inputs[0].value.toLowerCase()
            });
        } else if (inputs.length === 3) {

            const dropdownName = inputs[2].value;
            let dropdownParent;

            if (dropdownMap.has(dropdownName)) {
                dropdownParent = dropdownMap.get(dropdownName);
            } else {
                dropdownParent = {
                    text: dropdownName,
                    className: "nav-item dropdown",
                    dropdown: true,
                    folderId: generateUniqueFolderId(),
                    children: []
                };
                config.push(dropdownParent);
                dropdownMap.set(dropdownName, dropdownParent);
            }

            dropdownParent.children.push({
                text: inputs[0].value,
                href: inputs[1].value,
                className: "nav-link-" + inputs[0].value.toLowerCase().replace(/\s+/g, '_')
            });
        }
    });

    mainNavItems = config;

    chrome.storage.sync.set({ [STORAGE_KEY]: config }, function() {
        console.log('Navbar configuration saved');

        const saveBtn = document.getElementById("save_nav_config_btn");
        const originalText = saveBtn.textContent;
        saveBtn.textContent = "Saved!";
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 2000);
    });

    updateNavbar();
}

function updateNavbar() {
    const navbar = document.querySelector(".navbar");
    navbar.innerHTML = '';

    for (const item of mainNavItems) {
        if (!item.dropdown) {
            const ahref = document.createElement("a");
            ahref.textContent = item.text;
            ahref.href = "#";
            navbar.appendChild(ahref);
        } else {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");

            const button = document.createElement("button");
            button.classList.add("dropbtn");
            button.textContent = item.text;

            const arrow = document.createElement("img");
            arrow.src = "../assets/images/font-awesome/caret-down-solid.svg";
            arrow.width = "16";
            arrow.height = "16";
            arrow.classList.add("svg-white");

            const dropdownContent = document.createElement("div");
            dropdownContent.classList.add("dropdown-content");

            for (const child of item.children) {
                const link = document.createElement("a");
                link.textContent = child.text;
                link.href = "#";
                dropdownContent.appendChild(link);
            }
            dropdown.appendChild(dropdownContent);
            button.appendChild(arrow);
            dropdown.appendChild(button);
            navbar.appendChild(dropdown);
        }
    }
}

function resetToDefaults() {
    chrome.storage.sync.remove(STORAGE_KEY, function() {
        mainNavItems = [...defaultNavItems];
        const elementList = document.getElementById("element_list");
        elementList.innerHTML = '';
        updateNavbar();
        for (const item of defaultNavItems) {
            addElementToList(elementList, item);
        }
        window.location.reload();
    });
}

function createMoveButtons(elm, isDropdownItem = false) {
    const btnGroup = document.createElement('div');
    btnGroup.className = 'move-btn-group';

    const upBtn = document.createElement('button');
    upBtn.className = 'move-btn';
    upBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5M5 12L12 5L19 12"/>
    </svg>`;
    
    const downBtn = document.createElement('button');
    downBtn.className = 'move-btn';
    downBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7l7-7"/>
    </svg>`;

    function animateMove(element) {
        element.classList.add('moving');
        setTimeout(() => element.classList.remove('moving'), 200);
    }

    upBtn.onclick = (e) => {
        e.stopPropagation();
        const prev = elm.previousElementSibling;
        if (prev && (!isDropdownItem || (isDropdownItem && prev.classList.contains('dropdown-item')))) {
            animateMove(elm);
            elm.parentNode.insertBefore(elm, prev);
            if (document.getElementById('live_refresh').checked) {
                saveNavbarConfig();
            }
        }
    };

    downBtn.onclick = (e) => {
        e.stopPropagation();
        const next = elm.nextElementSibling;
        if (next && (!isDropdownItem || (isDropdownItem && next.classList.contains('dropdown-item')))) {
            animateMove(elm);
            elm.parentNode.insertBefore(next, elm);
            if (document.getElementById('live_refresh').checked) {
                saveNavbarConfig();
            }
        }
    };

    btnGroup.appendChild(upBtn);
    btnGroup.appendChild(downBtn);
    return btnGroup;
}