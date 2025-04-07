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
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 200);
  });

function addElementToList(elmList, item) {
    if (!item.dropdown) {
        const elm = document.createElement("div");
        elm.classList.add("element");
        const label1 = document.createElement("label");
        label1.for = "a_page_" + item.text;
        label1.textContent = "Element";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.id = "a_page_" + item.text;
        input1.value = item.text;
        input1.placeholder = "Enter your element name here e.g. Calendar";
        const label2 = document.createElement("label");
        label2.for = "b_page_" + item.text;
        label2.style = "color: #8f8f8f; font-style: italic;";
        label2.textContent = "points to";
        const input2 = document.createElement("input");
        input2.type = "text";
        input2.id = "b_page_" + item.text;
        input2.value = item.href;
        input2.placeholder = "Enter directory here e.g. /calendar or enter URL";

        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(label2);
        elm.appendChild(input2);
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
        elm.appendChild(label1);
        elm.appendChild(input1);
        elmList.appendChild(elm);
        for (const instance of item.children) {
            const elm = document.createElement("div");
            elm.classList.add("element");
            const label1 = document.createElement("label");
            label1.for = "a_dropdown_" + instance.text;
            label1.textContent = "Element";
            const input1 = document.createElement("input");
            input1.type = "text";
            input1.id = "a_dropdown_" + instance.text;
            input1.value = instance.text;
            input1.placeholder = "Enter your element name here e.g. Calendar";
            const label2 = document.createElement("label");
            label2.for = "b_dropdown_" + instance.text;
            label2.style = "color: #8f8f8f; font-style: italic;";
            label2.textContent = "points to";
            const input2 = document.createElement("input");
            input2.type = "text";
            input2.id = "b_dropdown_" + instance.text;
            input2.value = instance.href;
            input2.placeholder = "Enter directory here e.g. /calendar or enter URL";
            const label3 = document.createElement("label");
            label3.for = "b_dropdown_" + instance.text;
            label3.style = "color: #8f8f8f; font-style: italic;";
            label3.textContent = "in dropdown named";
            const input3 = document.createElement("input");
            input3.type = "text";
            input3.id = "b_dropdown_" + instance.text;
            input3.value = item.text;
            input3.placeholder = "Enter directory here e.g. /calendar or enter URL";

            elm.appendChild(label1);
            elm.appendChild(input1);
            elm.appendChild(label2);
            elm.appendChild(input2);
            elm.appendChild(label3);
            elm.appendChild(input3);
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
        label1.textContent = "Element";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.placeholder = "Enter your element name here e.g. Calendar";

        const label2 = document.createElement("label");
        label2.style = "color: #8f8f8f; font-style: italic;";
        label2.textContent = "points to";
        const input2 = document.createElement("input");
        input2.type = "text";
        input2.placeholder = "Enter directory here e.g. /calendar or enter URL";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => elm.remove();
        const deleteImg = document.createElement("img");
        deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
        deleteImg.width = "12";
        deleteImg.height = "12";
        deleteImg.classList.add("svg-white");
        deleteBtn.appendChild(deleteImg);

        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(label2);
        elm.appendChild(input2);
        elm.appendChild(deleteBtn);
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

        elm.appendChild(label1);
        elm.appendChild(input1);
        elm.appendChild(addItemBtn);
        elm.appendChild(deleteBtn);
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
    label2.style = "color: #8f8f8f; font-style: italic;";
    label2.textContent = "points to";
    const input2 = document.createElement("input");
    input2.type = "text";
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
    deleteBtn.appendChild(deleteImg);

    itemElm.appendChild(label1);
    itemElm.appendChild(input1);
    itemElm.appendChild(label2);
    itemElm.appendChild(input2);
    itemElm.appendChild(hiddenInput);
    itemElm.appendChild(deleteBtn);

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
            ahref.href = item.href;
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
    });
}