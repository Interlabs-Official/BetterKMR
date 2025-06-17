const VTT_VERSION = "1.2.0";
const availableElements = [
  {
    id: "font-family",
    name: "Font Family",
    description: "Change the font family of the Kamar website",
    properties: [
      { id: "font-family-preset", name: "Preset Font Family", type: "dropdown", default: "Inter", options: ["Inter", "Arial", "Times New Roman", "Courier New"] },
      { id: "font-family-include-name-motto", name: "Include School Name & Motto", type: "toggle", default: false },
      { id: "font-family-use-custom-google-font", name: "Use custom font from Google Fonts", type: "toggle", default: false, controlsVisibility: ["font-family-custom-tooltip", "font-family-custom-name", "font-family-weight", "font-family-note-tooltip"] },
      { id: "font-family-custom-tooltip", name: "Fonts are case sensitive, so for example 'inter' should be 'Inter'. View the list of Google Fonts at https://fonts.google.com.", type: "tooltip", visibleWhen: "Use custom font from Google Fonts" },
      { id: "font-family-custom-name", name: "Custom Google Font Name", type: "text", default: "Delius Swash Caps", visibleWhen: "Use custom font from Google Fonts" },
      { id: "font-family-weight", name: "Font Weight (100-900) (thin-black)", type: "number", default: 400, unit: "px", visibleWhen: "Use custom font from Google Fonts" },
      { id: "font-family-note-tooltip", name: "<br><br>Also, some fonts don't have many font weights, sometimes even only the standard 400.", type: "tooltip", visibleWhen: "Use custom font from Google Fonts" },
    ]
  },
  {
    id: "backimg-setting",
    name: "Change Background",
    description: "Changes the background of Kamar (solid colour, image)",
    properties: [
      { id: "background-tooltip", name: "By providing a background image, you agree that you have permission to use it and you agree the developers aren't held responsible.", type: "tooltip" },
      { id: "background-colour", name: "Background Colour", type: "color", default: "#000000" },
      { id: "background-image-url", name: "Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg", type: "text", default: "" },
      { id: "background-upload-image", name: "Or Upload Background Image", type: "image-upload", default: "", controlsVisibility: ["background-delete-upload"] },
      { id: "background-delete-upload", name: "Delete Uploaded Image", type: "button", default: "Delete Image", visibleWhen: "Or Upload Background Image" },
      { id: "background-advanced-toggle", name: "Show Advanced Options", type: "toggle", default: false, controlsVisibility: ["background-size", "background-repeat", "background-position", "background-attachment"] },
      { id: "background-advanced-tooltip", name: "If you don't know what the below dropdowns do, it's best to leave them.", type: "tooltip", visibleWhen: "Show Advanced Options" },
      { id: "background-size", name: "Background Size", type: "dropdown", default: "cover", options: ["cover", "contain", "auto", "100%", "100% 100%"], visibleWhen: "Show Advanced Options" },
      { id: "background-repeat", name: "Background Repeat", type: "dropdown", default: "no-repeat", options: ["no-repeat", "repeat", "repeat-x", "repeat-y"], visibleWhen: "Show Advanced Options" },
      { id: "background-position", name: "Background Position", type: "dropdown", default: "center center", options: ["center center", "top left", "top center", "top right", "center left", "center right", "bottom left", "bottom center", "bottom right"], visibleWhen: "Show Advanced Options" },
      { id: "background-attachment", name: "Background Attachment", type: "dropdown", default: "fixed", options: ["fixed", "scroll", "local"], visibleWhen: "Show Advanced Options" },
    ]
  },
  {
    id: "today-attendance-highlight",
    name: "Today's Attendance Highlight",
    description: "Highlights today's date on the attendance page",
    properties: [
      { id: "attendance-highlight-colour", name: "Highlight (Background) Colour", type: "color", default: "#4CAF50", allowTransparency: true },
    ]
  },
  {
    id: "school-name-and-motto",
    name: "School Name & Motto Colours",
    description: "Change the colours of the school name and motto, as well as text shadows.",
    properties: [
      { id: "school-name-colour", name: "Name Colour", type: "color", default: "#f7f7f7" },
      { id: "school-motto-colour", name: "Motto Colour", type: "color", default: "#f7f7f7" },
      { id: "school-text-shadow", name: "Text Shadow", type: "toggle", default: false, controlsVisibility: ["school-name-shadow-colour", "school-motto-shadow-colour", "school-shadow-offset-x", "school-shadow-offset-y"] },
      { id: "school-name-shadow-colour", name: "Name Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Text Shadow" },
      { id: "school-motto-shadow-colour", name: "Motto Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Text Shadow" },
      { id: "school-shadow-offset-x", name: "Text Shadow Offset X", type: "number", default: 2, unit: "px", visibleWhen: "Text Shadow" },
      { id: "school-shadow-offset-y", name: "Text Shadow Offset Y", type: "number", default: 2, unit: "px", visibleWhen: "Text Shadow" },
      { id: "school-name-and-motto-visibility", name: "Show School Name & Motto", type: "toggle", default: true },
    ]
  },
  {
    id: "justified-gradients",
    name: "Present, Late, Unjustified & Justified Colours",
    description: "Change the colours of the present, late, unjustified and justified colours.",
    properties: [
      { id: "attendance-gradient-tooltip", name: "If you want a solid colour, you can fill both gradient colours the same.", type: "tooltip"},
      { id: "present-text-colour", name: "Text Colour (Present)", type: "color", default: "#ffffff"},
      { id: "present-gradient", name: "Present Colour", type: "gradient", defaultStart: "#49cea2", defaultEnd: "#00849b" },
      { id: "late-text-colour", name: "Text Colour (Late)", type: "color", default: "#ffffff"},
      { id: "late-gradient", name: "Late Colour", type: "gradient", defaultStart: "#28a3a1", defaultEnd: "#003363" },
      { id: "unjustified-text-colour", name: "Text Colour (Unjustified)", type: "color", default: "#ffffff"},
      { id: "unjustified-gradient", name: "Unjustified Colour", type: "gradient", defaultStart: "#d80000", defaultEnd: "#640000" },
      { id: "justified-text-colour", name: "Text Colour (Justified)", type: "color", default: "#ffffff"},
      { id: "justified-gradient", name: "Justified Colour", type: "gradient", defaultStart: "#edff4c", defaultEnd: "#849b00" },
    ]
  },
  {
    id: "navbar-colours",
    name: "Navbar Colours",
    description: "Change the colours of the Kamar navbar",
    properties: [
      { id: "navbar-background-colour", name: "Background Colour", type: "color", default: "#000000" },
      { id: "navbar-text-colour", name: "Text Colour", type: "color", default: "#ffffff" },
      { id: "navbar-active-text-colour", name: "Active Text Colour", type: "color", default: "#63c9ff" },
      { id: "navbar-hover-text-colour", name: "Active Hover Text Colour", type: "color", default: "#8fd8ff" },
      { id: "navbar-box-shadow", name: "Box Shadow", type: "toggle", default: false, controlsVisibility: ["navbar-box-shadow-colour", "navbar-box-shadow-offset-x", "navbar-box-shadow-offset-y"] },
      { id: "navbar-box-shadow-colour", name: "Box Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Box Shadow" },
      { id: "navbar-box-shadow-offset-x", name: "Box Shadow Offset X", type: "number", default: 2, unit: "px", visibleWhen: "Box Shadow" },
      { id: "navbar-box-shadow-offset-y", name: "Box Shadow Offset Y", type: "number", default: 2, unit: "px", visibleWhen: "Box Shadow" },
    ]
  },
  {
    id: "main-colour-schemes",
    name: "Main Colour Schemes",
    description: "Change the properties of the main content box, where most things are displayed",
    properties: [
      { id: "main-toggle", name: "Main Content Box", type: "toggle", default: false, controlsVisibility: ["main-bg", "main-text", "card-body"]},
      { id: "main-tooltip", name: "By default in Kamar, the background colour is completely transparent.", type: "tooltip", visibleWhen: "Main Content Box" },
      { id: "main-bg", name: "Main Content Box Background Colour (sk_main_content)", type: "color", default: "#000000", visibleWhen: "Main Content Box" },
      { id: "main-text", name: "Main Content Box Text Colour (sk_main_content)", type: "color", default: "#ffffff", visibleWhen: "Main Content Box" },
      { id: "card-body", name: "Navbar/Card Background Colour (card-body)", type: "color", default: "#000000", visibleWhen: "Main Content Box" },
      { id: "card-body-border", name: "Navbar/Card Border Colour (card-body)", type: "color", default: "#ffffff", visibleWhen: "Main Content Box" },
      { id: "table-toggle", name: "Table Colour Scheming", type: "toggle", default: false, controlsVisibility: ["table-header", "table-border"] },
      { id: "table-header", name: "Table Header Colour (sk_thead_cell)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
      { id: "table-border", name: "Table Border Colour (sk_border, sk_thead_cell)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
      { id: "generic-toggle", name: "Generic", type: "toggle", default: false, controlsVisibility: ["btn-bg", "btn-text", "btn-hover-bg", "btn-hover-text", "sk_button_border_colour", "sk_button_hover_colour", "a_link_text_colour"] },
      { id: "btn-bg", name: "Button Colour (sk_btn)", type: "color", default: "#000000", visibleWhen: "Generic" },
      { id: "btn-text", name: "Button Text Colour (sk_btn)", type: "color", default: "#ffffff", visibleWhen: "Generic" },
      { id: "btn-hover-bg", name: "Button Hover & Active Background Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#000000", visibleWhen: "Generic" },
      { id: "btn-hover-text", name: "Button Hover & Active Text Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#ffffff", visibleWhen: "Generic" },
      { id: "sk_button_border_colour", name: "Button Border Colour (sk_btn)", type: "color", default: "#ffffff", visibleWhen: "Generic", uniqueId: "sk_button_border_colour" },
      { id: "sk_button_hover_colour", name: "Button Hover & Active Border Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#ffffff", visibleWhen: "Generic", uniqueId: "sk_button_hover_colour" },
      { id: "a_link_text_colour", name: "Link Text Colour (a)", type: "color", default: "#0066ff", visibleWhen: "Generic", uniqueId: "a_link_text_colour" },
    ]
  },
  {
    id: "additional-css-properties",
    name: "Additional CSS Properties",
    description: "Something missing from the above settings? Add it here!",
    properties: [
      { id: "css-tooltip", name: "Below, you can add your own CSS styles that will trail on after the settings from the Visual Theme Editor.", type: "tooltip" },
      { id: "css-input", name: "CSS Properties", type: "text", default: "" },
      { id: "css-warning-tooltip", name: "If you don't know what this is, it's best to remove it.", type: "tooltip" },
      { id: "css-discord-tooltip", name: "If you want to add something that's not in the settings, but don't know how to code, feel free to ask in the Discord! https://discord.gg/HjJvakyAXe", type: "tooltip" },
    ]
  }
];

chrome.storage.sync.get("redeemedCodes").then((result) => {
  if (result.redeemedCodes) {
    for (const code of result.redeemedCodes) {
      if (code === "SILKSONGISREAL") {
        availableElements.push({
          id: "ext-promo-01",
          name: "Days Since Silksong Announced (Exclusive)",
          description: "Redeemed via exclusive code. Appears on attendance/week page.",
          properties: [
            { id: "ext-promo-01-tc-tooltip", name: "BetterKMR and the InterLabs team are not affiliated with Team Cherry.", type: "tooltip" },
            { id: "ext-promo-01-enabled", name: "Enabled", type: "toggle", default: true },
          ]
        });
      }
      if (code === "EXTRAFONTPACK") {
        const extraFonts = ["-- Experiments: Extra Font Pack --", "Monocraft"];

        const fontFamilyElement = availableElements.find(e => e.id === "font-family");
        if (fontFamilyElement) {
          const presetProp = fontFamilyElement.properties.find(p => p.id === "font-family-preset");
          if (presetProp && Array.isArray(presetProp.options)) {
            extraFonts.forEach(font => {
              if (!presetProp.options.includes(font)) {
                /* if (font == "-- Extra Font Pack --") {
                  presetProp.options.push(font);
                } */
                presetProp.options.push(font);
              }
            });
          }
        }
      }
    }
  }
});

function convertThemeToNewVersion(themeData) {
  // Convert old name-based properties to ID-based
  themeData.elements.forEach(element => {
    const elementTemplate = availableElements.find(temp => temp.id === element.id);
    if (elementTemplate && element.properties) {
      const newProperties = {};
      Object.entries(element.properties).forEach(([propName, propValue]) => {
        const property = elementTemplate.properties.find(p => p.name === propName);
        if (property) {
          newProperties[property.id] = propValue;
        }
      });
      element.properties = newProperties;
    }
  });
  themeData.vtt_version = VTT_VERSION;
  return themeData;
}

let addedElements = [];
let css = '';
let extras = [];

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 200);
});

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const themeID = urlParams.get('themeID');
  
  if (themeID && themeID !== 'new_theme') {
    loadThemeForEditing(themeID);
  }
  
  document.getElementById('save-button').addEventListener('click', saveTheme);
  
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 200);
});

// Tab switching functionality
const tabs = document.querySelectorAll('.tab-item');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.textContent === '← Back') {
      window.location.href = chrome.runtime.getURL("settings/index.html") + "?nested-tab-selected=custom-themes";
      return;
    }
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tc => tc.classList.remove('active'));
    
    const tabId = tab.getAttribute('data-tab');
    document.getElementById('tab-' + tabId).classList.add('active');
  });
});

const addElementButton = document.getElementById('add-element-button');
const elementDialog = document.getElementById('element-dialog');
const dialogOverlay = document.getElementById('dialog-overlay');
const elementSearch = document.getElementById('element-search');
const elementList = document.getElementById('element-list');
const closeDialogButton = document.querySelector('.element-dialog-close');

addElementButton.addEventListener('click', () => {
  populateElementList();
  elementDialog.style.display = 'block';
  dialogOverlay.style.display = 'block';
  elementSearch.focus();
});

closeDialogButton.addEventListener('click', closeDialog);
dialogOverlay.addEventListener('click', closeDialog);

function closeDialog() {
  elementDialog.style.display = 'none';
  dialogOverlay.style.display = 'none';
  elementSearch.value = '';
}

elementSearch.addEventListener('input', () => {
  const searchTerm = elementSearch.value.toLowerCase();
  populateElementList(searchTerm);
});

function populateElementList(searchTerm = '') {
  elementList.innerHTML = '';
  
  availableElements.forEach(element => {
    if (!searchTerm || element.name.toLowerCase().includes(searchTerm) || 
        element.description.toLowerCase().includes(searchTerm)) {
      
      const isAdded = addedElements.some(added => added.id === element.id);
      let itemName = element.name;
      
      if (isAdded) {
        itemName += ' (In Use)';
      }
      
      const itemElement = document.createElement('div');
      itemElement.className = `element-dialog-item ${isAdded ? 'disabled' : ''}`;
      
      itemElement.innerHTML = `
        <div class="element-dialog-item-details">
          <div class="element-dialog-item-name">${itemName}</div>
          <div class="element-dialog-item-desc">${element.description}</div>
        </div>
        <button class="element-dialog-item-add">Add</button>
      `;
      
      const addButton = itemElement.querySelector('.element-dialog-item-add');
      
      if (!isAdded) {
        addButton.addEventListener('click', (e) => {
          e.stopPropagation();
          addElement(element);
          closeDialog();
        });
        
        itemElement.addEventListener('click', () => {
          if (!isAdded) {
            addElement(element);
            closeDialog();
          }
        });
      }
      
      elementList.appendChild(itemElement);
    }
  });
  
  if (elementList.children.length === 0) {
    const noResults = document.createElement('div');
    noResults.style.padding = '15px 20px';
    noResults.style.color = '#999';
    noResults.textContent = 'No elements found matching your search.';
    elementList.appendChild(noResults);
  }
}

function addElement(element) {
  addedElements.push({...element});
  
  const addedElement = document.createElement('div');
  addedElement.className = 'added-element';
  addedElement.dataset.elementId = element.id;
  
  let elementContent = `
    <div class="added-element-header">
      <div class="added-element-title">${element.name}</div>
      <button class="added-element-remove" data-element-id="${element.id}">
        <img src="../assets/images/font-awesome/trash-solid.svg" width="12px" height="12px" class="svg-white"></img>
      </button>
    </div>
    <div class="added-element-content">
  `;

  
  element.properties.forEach(property => {
    const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
    let visibilityAttribute = '';
    
    if (property.visibleWhen) {
      visibilityAttribute = `data-visible-when="${property.visibleWhen}" style="display: none;"`;
    }
    
    const uniqueIdAttr = property.uniqueId ? `data-unique-id="${property.uniqueId}"` : '';
    
    if (property.type === 'color') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute} ${uniqueIdAttr}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <div class="color-picker-container">
            <div class="color-picker">
              <input type="color" id="${propId}" value="${property.default}" data-alpha="1.0" class="color-with-alpha">
            </div>
            <span id="${propId}-hex" class="color-hex-value">${property.default}</span>
            <button class="alpha-toggle-btn" id="${propId}-alpha-toggle">Add Transparency</button>
          </div>
        </div>
      `;
    } else if (property.type === 'gradient') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute} ${uniqueIdAttr}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <div class="gradient-container">
        <div class="gradient-preview" id="${propId}-preview"></div>
        <div class="gradient-controls">
          <div class="color-picker-container">
            <label>Start:</label>
            <div class="color-picker">
          <input type="color" id="${propId}-start" value="${property.defaultStart || '#ffffff'}" data-alpha="1.0" class="color-with-alpha">
            </div>
            <span id="${propId}-start-hex" class="color-hex-value">${property.defaultStart || '#ffffff'}</span>
            <button class="alpha-toggle-btn" id="${propId}-start-alpha-toggle">Add Transparency</button>
          </div>
          <div class="color-picker-container">
            <label>End:</label>
            <div class="color-picker">
          <input type="color" id="${propId}-end" value="${property.defaultEnd || '#000000'}" data-alpha="1.0" class="color-with-alpha">
            </div>
            <span id="${propId}-end-hex" class="color-hex-value">${property.defaultEnd || '#000000'}</span>
            <button class="alpha-toggle-btn" id="${propId}-end-alpha-toggle">Add Transparency</button>
          </div>
          <div class="gradient-direction">
            <label>Direction:</label>
            <select id="${propId}-direction" class="dropdown-input select-dropdown">
          <option value="to bottom" ${property.defaultDirection === 'to bottom' ? 'selected' : ''}>Top to Bottom</option>
          <option value="to right" ${property.defaultDirection === 'to right' ? 'selected' : ''}>Left to Right</option>
          <option value="to bottom right" ${property.defaultDirection === 'to bottom right' ? 'selected' : ''}>Diagonal ↘</option>
          <option value="to bottom left" ${property.defaultDirection === 'to bottom left' ? 'selected' : ''}>Diagonal ↙</option>
            </select>
          </div>
        </div>
          </div>
        </div>
      `;
        } else if (property.type === 'dropdown') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <select id="${propId}" class="dropdown-input select-dropdown">
        ${property.options.map(option => 
          `<option value="${option}" ${option === property.default ? 'selected' : ''} ${option === '-- Experiments: Extra Font Pack --' ? 'disabled' : ''}>${option}</option>`
        ).join('')}
          </select>
        </div>
      `;
    } else if (property.type === 'toggle') {
      elementContent += `
        <div class="added-element-property">
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <label class="switch">
            <input type="checkbox" id="${propId}" ${property.default ? 'checked' : ''}>
            <span class="slider round"></span>
          </label>
        </div>
      `;
    } else if (property.type === 'number') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <input type="number" id="${propId}" class="text-input" value="${property.default}" min="0" max="1000">
          <span>${property.unit || ''}</span>
        </div>
      `;
    } else if (property.type === 'text') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <input type="text" id="${propId}" class="text-input" value="${property.default}">
          <span>${property.unit || ''}</span>
        </div>
      `;
    } else if (property.type === 'tooltip') {
      elementContent += `
        <p style="color: grey; margin-bottom: 10px; font-size: 15px;" ${visibilityAttribute} id="${propId}">${property.name}</p>
      `;
    }
    else if (property.type === 'image-upload') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute}>
          <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
          <div class="image-upload-container" id="${propId}-container">
            <div class="drop-area" id="${propId}-drop-area">
              <p>Drag & drop an image on the button or</p>
              <input type="file" id="${propId}" accept="image/*" class="file-input" style="display: none;">
              <button class="upload-btn" id="${propId}-upload-btn">Choose Image</button>
            </div>
            <div class="image-preview" id="${propId}-preview" style="display: none;">
              <img id="${propId}-img" src="" alt="Preview">
              <div class="image-info" id="${propId}-info"></div>
            </div>
            <input type="hidden" id="${propId}-data" value="${property.default || ''}">
          </div>
        </div>
      `;
    }
    else if (property.type === 'button') {
      elementContent += `
        <div class="added-element-property" ${visibilityAttribute}>
          <button class="action-button" id="${propId}">${property.default}</button>
        </div>
      `;
    }
  });
  
  elementContent += `</div>`;
  addedElement.innerHTML = elementContent;
  
  // Add to container
  document.getElementById('added-elements-container').appendChild(addedElement);
  
  // Set up event handlers for properties
  element.properties.forEach(property => {
    const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
    
    if (property.type === 'color') {
      const colorInput = document.getElementById(propId);
      const hexDisplay = document.getElementById(`${propId}-hex`);
      const alphaToggleBtn = document.getElementById(`${propId}-alpha-toggle`);
      
      if (colorInput && hexDisplay && alphaToggleBtn) {
        setupColourWithAlpha(colorInput, hexDisplay, alphaToggleBtn);
      }
    } else if (property.type === 'gradient') {
      const startColor = document.getElementById(`${propId}-start`);
      const endColor = document.getElementById(`${propId}-end`);
      const direction = document.getElementById(`${propId}-direction`);
      const preview = document.getElementById(`${propId}-preview`);
      const startHex = document.getElementById(`${propId}-start-hex`);
      const endHex = document.getElementById(`${propId}-end-hex`);
      const startAlphaToggleBtn = document.getElementById(`${propId}-start-alpha-toggle`);
      const endAlphaToggleBtn = document.getElementById(`${propId}-end-alpha-toggle`);
      
      const updateGradientPreview = () => {
        const gradientCSS = createGradient(startHex.textContent, endHex.textContent, direction.value);
        preview.style.background = gradientCSS;
      };
      
      if (startColor && endColor && direction && preview) {
        setupColourWithAlpha(startColor, startHex, startAlphaToggleBtn);
        
        setupColourWithAlpha(endColor, endHex, endAlphaToggleBtn);
        
        updateGradientPreview();
        
        const startObserver = new MutationObserver(() => updateGradientPreview());
        const endObserver = new MutationObserver(() => updateGradientPreview());
        
        startObserver.observe(startHex, { childList: true, characterData: true, subtree: true });
        endObserver.observe(endHex, { childList: true, characterData: true, subtree: true });
        
        direction.addEventListener('change', updateGradientPreview);
      }
    } else if (property.type === 'toggle' && property.controlsVisibility) {
      const toggleInput = document.getElementById(propId);
      
      if (toggleInput) {
        toggleVisibilityBasedOnToggle(element.id, property.name, toggleInput.checked);
        
        toggleInput.addEventListener('change', (e) => {
          toggleVisibilityBasedOnToggle(element.id, property.name, e.target.checked);
        });
      }
    }
    if (property.type === 'image-upload') {
      const fileInput = document.getElementById(propId);
      const uploadBtn = document.getElementById(`${propId}-upload-btn`);
      const dropArea = document.getElementById(`${propId}-drop-area`);
      const preview = document.getElementById(`${propId}-preview`);
      const previewImg = document.getElementById(`${propId}-img`);
      const infoDisplay = document.getElementById(`${propId}-info`);
      const dataInput = document.getElementById(`${propId}-data`);
      
      if (fileInput && uploadBtn && dropArea && preview && previewImg && infoDisplay) {
        uploadBtn.addEventListener('click', () => {
          fileInput.click();
        });
        
        if (dataInput.value) {
          previewImg.src = dataInput.value;
          console.log("set preview src to ", dataInput.value);
          const infoDisplay = document.getElementById(`${propId}-info`);
          updateImageInfo(dataInput.value, infoDisplay);
          previewImg.style.display = 'block';
        }
        
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            handleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay);
          }
        });
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
          dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('highlight');
          }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
          dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('highlight');
          }, false);
        });
        
        dropArea.addEventListener('drop', (e) => {
          const file = e.dataTransfer.files[0];
          if (file && file.type.match('image.*')) {
            handleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay);
          }
        }, false);
        
        if (property.controlsVisibility) {
          toggleVisibilityBasedOnValue(element.id, property.name, dataInput.value !== '');
          
          const observer = new MutationObserver(() => {
            toggleVisibilityBasedOnValue(element.id, property.name, dataInput.value !== '');
          });
          
          observer.observe(dataInput, { attributes: true });
        }
      }
    }
    else if (property.type === 'button' && property.name === 'Delete Uploaded Image') {
      const deleteBtn = document.getElementById(propId);
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          const uploadId = propId.replace('-Delete-Uploaded-Image', '-Or-Upload-Background-Image');
          const fileInput = document.getElementById(uploadId);
          const dataInput = document.getElementById(`${uploadId}-data`);
          const previewImg = document.getElementById(`${uploadId}-img`);
          const preview = document.getElementById(`${uploadId}-preview`);
          const dropArea = document.getElementById(`${uploadId}-drop-area`);
          const infoDisplay = document.getElementById(`${uploadId}-info`);

          if (fileInput) {
            fileInput.value = '';
          }

          if (dataInput) {
            dataInput.value = '';
            dataInput.setAttribute('data-has-image', 'false');
          }

          if (previewImg) {
            previewImg.src = '';
          }
          
          if (preview) {
            preview.style.display = 'none';
          }
          if (dropArea) {
            dropArea.style.display = 'block';
          }
          
          if (infoDisplay) {
            infoDisplay.textContent = '';
          }

          if (dataInput) {
            dataInput.dispatchEvent(new Event('change'));
          }
        });
      }
    }
  });
  
  const removeButton = addedElement.querySelector('.added-element-remove');
  removeButton.addEventListener('click', () => removeElement(element.id));
}

function actualHandleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const base64data = e.target.result;
    dataInput.value = base64data;
    previewImg.src = base64data;
    preview.style.display = 'block';
    dropArea.style.display = 'none';
    
    updateImageInfo(base64data, infoDisplay);
    
    dataInput.dispatchEvent(new Event('change'));
    
    dataInput.setAttribute('data-has-image', 'true');
  };
  
  reader.readAsDataURL(file);
}

function handleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay) {
  if (!file.type.match('image.*')) {
    createNotification("Please select an image file.", "#e74c3c", "#ffffff");
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    createNotification("Image is too large! Please select an image under 5MB.", "#e74c3c", "#ffffff");
    return;
  }

  const img = new Image();
  img.onload = () => {
    if (img.width < 800 || img.height < 600) {
      createDialog({
        title: 'Small Image Warning',
        content: `This image is quite small, as it is less than 800x600 pixels, the bare minimum.<br>Do you want to use this image? Note that there may be some low quality pixelation issues.<br><br>Selected image width & height: ${img.width}×${img.height} pixels.`,
        buttons: [
          {
            text: 'Yes',
            callback: () => {
              actualHandleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay);
            }
          },
          {
            text: 'No',
            callback: () => {
              URL.revokeObjectURL(img.src);
              img.src = '';
              const fileInput = document.querySelector(`input[type="file"][id$="-Or-Upload-Background-Image"]`);
              if (fileInput) {
                fileInput.value = '';
              }
            }
          }
        ]
      });
    } else {
      actualHandleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay);
    }
  };
  img.src = URL.createObjectURL(file);
}

function updateImageInfo(base64data, infoDisplay) {
  const approxSize = Math.round((base64data.length * 3) / 4);
  let sizeDisplay = '';
  
  if (approxSize > 1024 * 1024) {
    sizeDisplay = `${(approxSize / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    sizeDisplay = `${(approxSize / 1024).toFixed(2)} KB`;
  }
  
  const img = new Image();
  img.onload = () => {
    infoDisplay.textContent = `${img.width} × ${img.height} (${sizeDisplay})`;
  };
  img.src = base64data;
}

function toggleVisibilityBasedOnValue(elementId, controlName, hasValue) {
  const element = document.querySelector(`.added-element[data-element-id="${elementId}"]`);
  if (!element) return;
  
  const controlProperties = element.querySelectorAll(`[data-visible-when="${controlName}"]`);
  controlProperties.forEach(prop => {
    prop.style.display = hasValue ? 'inline-block' : 'none';
  });
}

function toggleVisibilityBasedOnToggle(elementId, toggleName, isChecked) {
  const elementsToControl = document.querySelectorAll(`[data-visible-when="${toggleName}"]`);
  elementsToControl.forEach(el => {
    el.style.display = isChecked ? 'inline' : 'none';
    el.classList.add('is-descendant-toggle');
  });
}

const imageUploadStyles = `
.image-upload-container {
  max-width: 400px;
}

.drop-area {
  border: 2px dashed #555;
  border-radius: 4px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.drop-area.highlight {
  border-color: #2979ff;
  background-color: rgba(41, 121, 255, 0.1);
}

.drop-area p {
  margin-bottom: 15px;
  color: #999;
}

.upload-btn {
  background-color: #2979ff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.upload-btn:hover {
  background-color: #1c68e0;
}

.image-preview {
  margin-top: 15px;
  border: 1px solid #444;
  border-radius: 4px;
  overflow: hidden;
}

.image-preview img {
  max-width: 100%;
  display: block;
}

.image-info {
  background-color: #222;
  color: #999;
  padding: 8px;
  font-size: 12px;
  text-align: center;
}

.action-button {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
}

.action-button:hover {
  background-color: #c62828;
}
`;

document.addEventListener('DOMContentLoaded', function() {
const styleElement = document.createElement('style');
styleElement.textContent = imageUploadStyles;
document.head.appendChild(styleElement);
});

const styleElement = document.createElement('style');
styleElement.textContent = `
  /* Toggle Switch Styles */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }

  .select-dropdown {
     margin-bottom: 18px;
  }

  .is-descendant-toggle .setting-label {
    margin-top: 10px;
  }

  .CodeMirror {
    height: 300px !important;
    border: 1px solid #444;
    border-radius: 4px;
  }

  .CodeMirror-focused {
    border-color: #2979ff;
    box-shadow: 0 0 0 1px rgba(41, 121, 255, 0.3);
  }
`;
document.head.appendChild(styleElement);

function removeElement(elementId) {
  const element = document.querySelector(`.added-element[data-element-id="${elementId}"]`);
  if (element) {
    element.remove();
  }
  
  addedElements = addedElements.filter(el => el.id !== elementId);
}

function formatPropertyName(name) {
  /* return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); */
    return name;
}

function getAllCustomThemes(callback) {
  chrome.storage.local.get('themes', function(data) {
    const themes = data.themes || {};
    callback(themes);
  });
}

function loadThemeForEditing(themeId) {
  getAllCustomThemes(function(themes) {
    const theme = themes[themeId];
    if (!theme) {
      console.error('Theme not found:', themeId);
      createNotification("Theme not found. Creating a new theme instead.", "#e74c3c", "#ffffff");
      return;
    }

    const loadTheme = (themeToLoad) => {
      if (!themeToLoad.autoApplySave) {
        document.getElementById("apply-theme-auto").checked = false;
      }
      
      document.getElementById('theme-name').value = themeToLoad.name;
      
      const addedElementsContainer = document.getElementById('added-elements-container');
      if (addedElementsContainer) {
        addedElementsContainer.innerHTML = '';
      }
      
      addedElements = [];
      
      if (themeToLoad.elements && Array.isArray(themeToLoad.elements)) {
        themeToLoad.elements.forEach(element => {
          const elementTemplate = availableElements.find(temp => temp.id === element.id);
          if (elementTemplate) {
            addElement(elementTemplate);
            
            if (element.properties) {
              Object.entries(element.properties).forEach(([propName, propValue]) => {
                const property = elementTemplate.properties.find(p => p.id === propName);
                if (property) {
                  const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
                  
                  if (property.type === 'color') {
                    const input = document.getElementById(propId);
                    const hexDisplay = document.getElementById(`${propId}-hex`);
                    const alphaToggleBtn = document.getElementById(`${propId}-alpha-toggle`);
                    
                    if (input && hexDisplay) {
                      if (propValue && typeof propValue === 'object' && propValue.hex) {
                        const hexColor = propValue.hex;
                        const alpha = propValue.alpha || 1.0;
                        
                        input.value = hexColor;
                        input.dataset.originalHex = hexColor;
                        input.dataset.alpha = alpha;
                        
                        if (alpha < 1.0) {
                          const r = parseInt(hexColor.slice(1, 3), 16);
                          const g = parseInt(hexColor.slice(3, 5), 16);
                          const b = parseInt(hexColor.slice(5, 7), 16);
                          const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                          hexDisplay.textContent = hexWithAlpha;
                          
                          if (alphaToggleBtn) {
                            const alphaContainer = input.parentNode.parentNode.querySelector('.alpha-slider-container');
                            
                            if (!alphaContainer) {
                              alphaToggleBtn.click();
                              
                              setTimeout(() => {
                                const alphaSlider = input.parentNode.parentNode.querySelector('.alpha-slider');
                                const alphaValue = input.parentNode.parentNode.querySelector('.alpha-value');
                                
                                if (alphaSlider && alphaValue) {
                                  const alphaPercent = Math.round(alpha * 100);
                                  alphaSlider.value = alphaPercent;
                                  alphaValue.textContent = `${alphaPercent}%`;
                                }
                              }, 50);
                            } else if (alphaContainer) {
                              const alphaSlider = alphaContainer.querySelector('.alpha-slider');
                              const alphaValue = alphaContainer.querySelector('.alpha-value');
                              
                              if (alphaSlider && alphaValue) {
                                const alphaPercent = Math.round(alpha * 100);
                                alphaSlider.value = alphaPercent;
                                alphaValue.textContent = `${alphaPercent}%`;
                              }
                            }
                          }
                        } else {
                          hexDisplay.textContent = hexColor;
                        }
                      }
                      else if (propValue && typeof propValue === 'string') {
                        if (propValue.length === 9) { // Full hex with alpha #RRGGBBAA
                          const alphaHex = propValue.substring(7, 9);
                          const alphaDecimal = parseInt(alphaHex, 16) / 255;
                          const alphaPercent = Math.round(alphaDecimal * 100);
                          const colorWithoutAlpha = propValue.substring(0, 7);
                          
                          input.value = colorWithoutAlpha;
                          input.dataset.originalHex = colorWithoutAlpha;
                          input.dataset.alpha = alphaDecimal;
                          hexDisplay.textContent = propValue;
                          
                          if (alphaToggleBtn) {
                            const alphaContainer = input.parentNode.parentNode.querySelector('.alpha-slider-container');
                            
                            if (!alphaContainer) {
                              alphaToggleBtn.click();
                              
                              setTimeout(() => {
                                const alphaSlider = input.parentNode.parentNode.querySelector('.alpha-slider');
                                const alphaValue = input.parentNode.parentNode.querySelector('.alpha-value');
                                
                                if (alphaSlider && alphaValue) {
                                  alphaSlider.value = alphaPercent;
                                  alphaValue.textContent = `${alphaPercent}%`;
                                }
                              }, 50);
                            }
                          }
                        } else {
                          input.value = propValue;
                          input.dataset.originalHex = propValue;
                          input.dataset.alpha = "1.0";
                          hexDisplay.textContent = propValue;
                        }
                      }
                    }
                  }
                  else if (property.type === 'gradient') {
                    const startInput = document.getElementById(`${propId}-start`);
                    const startHex = document.getElementById(`${propId}-start-hex`);
                    const endInput = document.getElementById(`${propId}-end`);
                    const endHex = document.getElementById(`${propId}-end-hex`);
                    const direction = document.getElementById(`${propId}-direction`);
                    const startAlphaToggleBtn = document.getElementById(`${propId}-start-alpha-toggle`);
                    const endAlphaToggleBtn = document.getElementById(`${propId}-end-alpha-toggle`);
                    
                    if (propValue && typeof propValue === 'object') {
                      if (direction && propValue.direction) {
                        direction.value = propValue.direction;
                      }
                      
                      if (startInput && startHex && propValue.start && typeof propValue.start === 'object' && propValue.start.hex) {
                        const hexColor = propValue.start.hex;
                        const alpha = propValue.start.alpha || 1.0;
                        
                        startInput.value = hexColor;
                        startInput.dataset.originalHex = hexColor;
                        startInput.dataset.alpha = alpha;
                        
                        if (alpha < 1.0 && startAlphaToggleBtn) {
                          const r = parseInt(hexColor.slice(1, 3), 16);
                          const g = parseInt(hexColor.slice(3, 5), 16);
                          const b = parseInt(hexColor.slice(5, 7), 16);
                          const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                          startHex.textContent = hexWithAlpha;
                          
                          const alphaContainer = startInput.parentNode.parentNode.querySelector('.alpha-slider-container');
                          if (!alphaContainer && startAlphaToggleBtn) {
                            startAlphaToggleBtn.click();
                            
                            setTimeout(() => {
                              const alphaSlider = startInput.parentNode.parentNode.querySelector('.alpha-slider');
                              const alphaValue = startInput.parentNode.parentNode.querySelector('.alpha-value');
                              
                              if (alphaSlider && alphaValue) {
                                const alphaPercent = Math.round(alpha * 100);
                                alphaSlider.value = alphaPercent;
                                alphaValue.textContent = `${alphaPercent}%`;
                              }
                            }, 50);
                          }
                        } else {
                          startHex.textContent = hexColor;
                        }
                      }
                      else if (startInput && startHex && propValue.start && typeof propValue.start === 'string') {
                        startInput.value = propValue.start.substring(0, 7);
                        startInput.dataset.originalHex = propValue.start.substring(0, 7);
                        startInput.dataset.alpha = "1.0";
                        startHex.textContent = propValue.start;
                        
                        if (propValue.start.length === 9) {
                          const alphaHex = propValue.start.substring(7, 9);
                          const alphaDecimal = parseInt(alphaHex, 16) / 255;
                          startInput.dataset.alpha = alphaDecimal;
                          
                          if (alphaDecimal < 1.0 && startAlphaToggleBtn) {
                            const alphaContainer = startInput.parentNode.parentNode.querySelector('.alpha-slider-container');
                            if (!alphaContainer) {
                              startAlphaToggleBtn.click();
                              
                              setTimeout(() => {
                                const alphaSlider = startInput.parentNode.parentNode.querySelector('.alpha-slider');
                                const alphaValue = startInput.parentNode.parentNode.querySelector('.alpha-value');
                                
                                if (alphaSlider && alphaValue) {
                                  const alphaPercent = Math.round(alphaDecimal * 100);
                                  alphaSlider.value = alphaPercent;
                                  alphaValue.textContent = `${alphaPercent}%`;
                                }
                              }, 50);
                            }
                          }
                        }
                      }
                      
                      if (endInput && endHex && propValue.end && typeof propValue.end === 'object' && propValue.end.hex) {
                        const hexColor = propValue.end.hex;
                        const alpha = propValue.end.alpha || 1.0;
                        
                        endInput.value = hexColor;
                        endInput.dataset.originalHex = hexColor;
                        endInput.dataset.alpha = alpha;
                        
                        if (alpha < 1.0 && endAlphaToggleBtn) {
                          const r = parseInt(hexColor.slice(1, 3), 16);
                          const g = parseInt(hexColor.slice(3, 5), 16);
                          const b = parseInt(hexColor.slice(5, 7), 16);
                          const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                          endHex.textContent = hexWithAlpha;
                          
                          const alphaContainer = endInput.parentNode.parentNode.querySelector('.alpha-slider-container');
                          if (!alphaContainer && endAlphaToggleBtn) {
                            endAlphaToggleBtn.click();
                            
                            setTimeout(() => {
                              const alphaSlider = endInput.parentNode.parentNode.querySelector('.alpha-slider');
                              const alphaValue = endInput.parentNode.parentNode.querySelector('.alpha-value');
                              
                              if (alphaSlider && alphaValue) {
                                const alphaPercent = Math.round(alpha * 100);
                                alphaSlider.value = alphaPercent;
                                alphaValue.textContent = `${alphaPercent}%`;
                              }
                            }, 50);
                          }
                        } else {
                          endHex.textContent = hexColor;
                        }
                      }
                      else if (endInput && endHex && propValue.end && typeof propValue.end === 'string') {
                        endInput.value = propValue.end.substring(0, 7);
                        endInput.dataset.originalHex = propValue.end.substring(0, 7);
                        endInput.dataset.alpha = "1.0";
                        endHex.textContent = propValue.end;
                        
                        if (propValue.end.length === 9) {
                          const alphaHex = propValue.end.substring(7, 9);
                          const alphaDecimal = parseInt(alphaHex, 16) / 255;
                          endInput.dataset.alpha = alphaDecimal;
                          
                          if (alphaDecimal < 1.0 && endAlphaToggleBtn) {
                            const alphaContainer = endInput.parentNode.parentNode.querySelector('.alpha-slider-container');
                            if (!alphaContainer) {
                              endAlphaToggleBtn.click();
                              
                              setTimeout(() => {
                                const alphaSlider = endInput.parentNode.parentNode.querySelector('.alpha-slider');
                                const alphaValue = endInput.parentNode.parentNode.querySelector('.alpha-value');
                                
                                if (alphaSlider && alphaValue) {
                                  const alphaPercent = Math.round(alphaDecimal * 100);
                                  alphaSlider.value = alphaPercent;
                                  alphaValue.textContent = `${alphaPercent}%`;
                                }
                              }, 50);
                            }
                          }
                        }
                      }
                    }
                  }
                  else if (property.type === 'checkbox' || property.type === 'toggle') {
                    const checkbox = document.getElementById(propId);
                    if (checkbox) {
                      checkbox.checked = propValue;
                      
                      // Trigger change event to show/hide dependent content
                      const event = new Event('change', { bubbles: true });
                      checkbox.dispatchEvent(event);
                    }
                  } 
                  else if (property.type === 'select') {
                    const select = document.getElementById(propId);
                    if (select) {
                      select.value = propValue;
                      
                      // Trigger change event in case select has dependent fields
                      const event = new Event('change', { bubbles: true });
                      select.dispatchEvent(event);
                    }
                  } 
                  else if (property.type === 'text' || property.type === 'url' || property.type === 'number') {
                    const input = document.getElementById(propId);
                    if (input) {
                      input.value = propValue;
                    }
                  }
                  else if (property.type === 'image-upload') {
                    // For image upload, we need to handle the base64 data and update the UI
                    const dataInput = document.getElementById(`${propId}-data`);
                    const preview = document.getElementById(`${propId}-preview`);
                    const dropArea = document.getElementById(`${propId}-drop-area`);
                    const imageContainer = document.getElementById(`${propId}-preview-container`);
                    const infoDisplay = document.getElementById(`${propId}-info`);
                    
                    if (dataInput && propValue) {
                      // Set the image data
                      dataInput.value = propValue;
                      
                      // Show the preview if we have an image
                      if (preview && propValue.startsWith('data:image')) {
                        // Show the image container and hide the drop area
                        if (imageContainer) imageContainer.style.display = 'block';
                        if (dropArea) dropArea.style.display = 'none';
                        
                        // Update the preview image
                        preview.src = propValue;
                        preview.style.display = 'block';
                        
                        // Update image info
                        if (infoDisplay) {
                          updateImageInfo(propValue, infoDisplay);
                        }
                        
                        // If there's a clear button, make sure it's visible
                        const clearBtn = document.getElementById(`${propId}-clear`);
                        if (clearBtn) clearBtn.style.display = 'block';
                      }
                    }
                  }
                  else if (property.type) {
                    console.log(`Loading property of type ${property.type}: ${propName}`);
                    const input = document.getElementById(propId);
                    if (input) {
                      try {
                        input.value = propValue;
                      } catch (e) {
                        console.warn(`Could not set value directly for "${property.type}" property "${propName}"`);
                        createNotification(`⚠️ Could not set value directly for "${property.type}" property "${propName}"`, "#7d7300", "#ffffff");
                        createNotification(`The above warning may mean some elements won't be loaded properly. Please remake the theme if you experience any issues.`, "#7d7300", "#ffffff");
                        input.setAttribute('data-value', JSON.stringify(propValue));
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
      
      // Load CSS if present
      if (themeToLoad.code) {
        cssEditor.setValue(themeToLoad.code);
      }
      
      // Trigger any post-load initialization that might be needed
      if (typeof postLoad === 'function') {
        try {
          postLoad(themeToLoad.elements);
        } catch (e) {
          console.error('Error in postLoad function:', e);
          createNotification("Error loading the compiling function. Please check console for", "#961a1a", "#ffffff");
        }
      }
    };

  function createThemeBackup(themes, callback) {
    const backupData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      themes: themes
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `betterkmr-themes-backup-${new Date().toISOString().slice(0,10)}.bktbackup`;
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (typeof callback === "function") callback(backupData);
    }, 0);
    
    return backupData;
  }

    // Check version and handle conversion if needed
    if (!theme.vtt_version) {
      chrome.storage.local.get("themes", (data) => {
        if (!data.themes) return;
        createDialog({
        title: 'Theme Version Update Required',
        content: 'This theme requires updating to a new version.<br>Would you like to get it converted?',
        buttons: [
          {
            text: 'Yes',
            callback: () => {
            createDialog({
              title: 'Back Up Themes',
              content: 'Would you like to back up your themes before conversion?<br>It\'s possible some things can break during conversion.<br><br>We cannot provide support if you do not back up.',
              buttons: [
                {
                  text: 'Yes',
                  callback: () => {
                    createThemeBackup(data, function(backupData) {
                      createNotification(`Backup created. Continuing with conversion.`, "#3c8443", "#ffffff");
                      preConvertTheme(theme);
                    });
                  }
                },
                {
                  text: 'No',
                  classname: 'dialog-button-not',
                  callback: () => {
                    window.location.href = "index.html?nested-tab-selected=custom-themes";
                  }
                }
              ]
            });
            }
          },
          {
            text: 'No',
            classname: 'dialog-button-not',
            callback: () => {
              window.location.href = "index.html?nested-tab-selected=custom-themes";
            }
          }
        ]
      });
      });
    } else {
      loadTheme(theme);
    }
    function preConvertTheme(theme) {
  const dialog = createDialog({
  title: 'Converting Theme', 
                content: `
                  <p>The Visual Theme Editor is now converting your theme to a newer version.</p>
                  <p>Please do not forget to save your theme after conversion.</p><br>
                  <p>This tab may freeze during this process.</p>
                  <p>This may take a while. Thanks for your patience.</p>`,
                });
              setTimeout(() => {
                console.log("Beginning conversion in 1 second");
                const convertedTheme = convertThemeToNewVersion(theme);
                createDialog({
                  title: 'Conversion Completed!',
                  content: `
                      Conversion successfully completed!<br>
                      If you're experiencing issues, please contact us via our support forum (Discord).
                  `,
                  buttons: [
                    {
                      text: 'Ok',
                    }
                  ]
                });
                loadTheme(convertedTheme);
                dialog.close();
              }, "1000");
}
  });
}

// Save theme functionality
document.getElementById('save-button').addEventListener('click', saveTheme);

// Add a helper function to properly refresh image previews
function updateImagePreviews() {
  document.querySelectorAll('[id$="-data"]').forEach(dataInput => {
    if (dataInput.value && dataInput.value.startsWith('data:image')) {
      const propId = dataInput.id.replace('-data', '');
      const preview = document.getElementById(`${propId}-preview`);
      const dropArea = document.getElementById(`${propId}-drop-area`);
      const imageContainer = document.getElementById(`${propId}-image-container`);
      
      if (preview) {
        const previewImg = document.getElementById(`${propId}-img`);
        previewImg.src = dataInput.value;
        console.log("set preview src to ", dataInput.value);
        const infoDisplay = document.getElementById(`${propId}-info`);
        updateImageInfo(dataInput.value, infoDisplay);
        previewImg.style.display = 'block';
      }
      
      if (imageContainer) imageContainer.style.display = 'block';
      if (dropArea) dropArea.style.display = 'none';
    }
  });
}

function saveTheme() {
  var failedSavingCode = false;
  chrome.storage.local.getBytesInUse(null, function(bytesInUse) {
    const availableBytes = 100 * 1024 * 1024 - bytesInUse; // 100MB limit
    const cssByteSize = new Blob([cssEditor.getValue()]).size;
    if (cssByteSize > availableBytes) {
      failedSavingCode = true;
      createNotification("Failed saving theme: Total theme limit exceeds 100MB. Please delete some custom themes to make space.", "#961a1a", "#ffffff");
      return;
    } else {
      const saveButton = document.getElementById('save-button');
      saveButton.disabled = true;
      saveButton.textContent = 'Saving...';
      console.log("Saving theme...");
      
      try {
        const themeName = document.getElementById('theme-name').value.trim();
        if (!themeName) {
          createNotification("Please enter a theme name.", "#961a1a", "#ffffff");
          saveButton.disabled = false;
          saveButton.textContent = 'Save Theme';
          return;
        }
        
        try {
          const theme = {
            name: themeName,
            elements: []
          };
          
          addedElements.forEach(element => {
            const elementData = {
              id: element.id,
              name: element.name,
              properties: {}
            };
            
            element.properties.forEach(property => {
              const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
              
              if (property.type === 'color') {
                const hexDisplay = document.getElementById(`${propId}-hex`);
                const colorInput = document.getElementById(propId);
                if (hexDisplay && colorInput) {
                  const originalHex = colorInput.dataset.originalHex || colorInput.value;
                  const alpha = parseFloat(colorInput.dataset.alpha) || 1.0;
                  
                  elementData.properties[property.id] = {
                    hex: originalHex,
                    alpha: alpha
                  };
                }
              } else if (property.type === 'gradient') {
                const startInput = document.getElementById(`${propId}-start`);
                const startHex = document.getElementById(`${propId}-start-hex`);
                const endInput = document.getElementById(`${propId}-end`);
                const endHex = document.getElementById(`${propId}-end-hex`);
                const direction = document.getElementById(`${propId}-direction`);
                
                elementData.properties[property.id] = {
                  start: startInput ? {
                    hex: startInput.dataset.originalHex || startInput.value,
                    alpha: parseFloat(startInput.dataset.alpha) || 1.0
                  } : { hex: '#ffffff', alpha: 1.0 },
                  end: endInput ? {
                    hex: endInput.dataset.originalHex || endInput.value,
                    alpha: parseFloat(endInput.dataset.alpha) || 1.0
                  } : { hex: '#000000', alpha: 1.0 },
                  direction: direction ? direction.value : 'to bottom'
                };
              } else if (property.type === 'image-upload') {
                const dataInput = document.getElementById(`${propId}-data`);
                if (dataInput) {
                  elementData.properties[property.id] = dataInput.value;
                }
              } else if (property.type === 'checkbox' || property.type === 'toggle') {
                const checkbox = document.getElementById(propId);
                if (checkbox) {
                  elementData.properties[property.id] = checkbox.checked;
                  
                  const event = new Event('change', { bubbles: true });
                  checkbox.dispatchEvent(event);
                }
              } else if (property.type === 'select' || property.type === 'dropdown') {
                const select = document.getElementById(propId);
                if (select) {
                  elementData.properties[property.id] = select.value;
                  
                  const event = new Event('change', { bubbles: true });
                  select.dispatchEvent(event);
                }
              } else if (property.type === 'text' || property.type === 'url' || property.type === 'number') {
                const input = document.getElementById(propId);
                if (input) {
                  elementData.properties[property.id] = input.value;
                }
              }
              else if (property.type) {
                console.log(`Saving property of type ${property.type}: ${property.name}`);
                const input = document.getElementById(propId);
                if (input) {
                  let value;
                  
                  if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA') {
                    value = input.value;
                  } else if (input.tagName === 'DIV' || input.tagName === 'SPAN') {
                    if (input.hasAttribute('data-value')) {
                      try {
                        value = JSON.parse(input.getAttribute('data-value'));
                      } catch (e) {
                        value = input.getAttribute('data-value');
                      }
                    } else {
                      value = input.textContent;
                    }
                  } else {
                    value = input.value || input.textContent || '';
                  }
                  
                  elementData.properties[property.id] = value;
                }
              }
            });
            
            theme.elements.push(elementData);
          });
          
          console.log("Elements collected:", theme.elements);
          
          try {
            postSave(theme.elements);
            cssEditor.save();
          } catch (error) {
            console.error("Error generating CSS:", error);
            createNotification("Error generating CSS. Default CSS will be used.", "#e74c3c", "#ffffff");
          }
          
          const urlParams = new URLSearchParams(window.location.search);
          let themeId = urlParams.get('themeID');
          
          if (!themeId || themeId === 'new_theme') {
            themeId = uuidv4();
          }
          
          getAllCustomThemes(function(themes) {
            try {
              console.log("Get all custom themes:", themes);
              const themeData = {
                id: themeId,
                name: themeName,
                code: cssEditor.getValue(),
                js: extras,
                elements: theme.elements,
                lastModified: new Date().toISOString(),
                autoApplySave: document.getElementById("apply-theme-auto").checked,
                vtt_version: VTT_VERSION
              };
              
              themes[themeId] = themeData;
              
              chrome.storage.local.set({ themes: themes }, function() {
                if (chrome.runtime.lastError) {
                  console.error("Error saving theme:", chrome.runtime.lastError);
                  createNotification("Failed saving theme, check console for details.", "#961a1a", "#ffffff");
                } else {
                  console.log("Theme saved successfully!");
                  if (document.getElementById("apply-theme-auto").checked) {
                    saveSetting('theme-id-text', themeId);
                  }
                  // add apply theme on save logic here
                  createNotification(`Theme "${themeName}" saved successfully! It's now available in the Custom Themes section.`, "#3c8443", "#ffffff");
                  
                  // Update URL if this was a new theme
                  if (urlParams.get('themeID') === 'new_theme') {
                    let newUrl = new URL(window.location.href);
                    newUrl.searchParams.set('themeID', themeId);
                    window.history.replaceState({}, '', newUrl);
                  }
                }
                saveButton.disabled = false;
                saveButton.textContent = 'Save Theme';
              });
            } catch (error) {
              console.error("Error in theme saving process:", error);
              createNotification("An unexpected error occurred while saving.", "#961a1a", "#ffffff");
              saveButton.disabled = false;
              saveButton.textContent = 'Save Theme';
            }
          });
        } catch (error) {
          console.error("Error collecting theme data:", error);
          createNotification("An unexpected error occurred while preparing your theme.", "#961a1a", "#ffffff");
          saveButton.disabled = false;
          saveButton.textContent = 'Save Theme';
        }
      } catch (error) {
        console.error("Critical error in save process:", error);
        createNotification("A critical error occurred. Please try again.", "#961a1a", "#ffffff");
        saveButton.disabled = false;
        saveButton.textContent = 'Save Theme';
      }
    }
  });
}

// Compiles CSS from theme data which is probably my most favourite function in this file
function postSave(elements) {
css = '';

function applyAlphaToColour(colorObj) {
if (!colorObj) return '#000000';

if (typeof colorObj === 'string') return colorObj;

// If we have the new format with separate hex and alpha
if (colorObj.hex && typeof colorObj.alpha === 'number') {
if (colorObj.alpha < 1.0) {
  const r = parseInt(colorObj.hex.slice(1, 3), 16);
  const g = parseInt(colorObj.hex.slice(3, 5), 16);
  const b = parseInt(colorObj.hex.slice(5, 7), 16);
  return hexToRgba(colorObj.hex, colorObj.alpha);
}
return colorObj.hex;
}

return '#000000'; // Default fallback
}

function processGradient(gradientObj) {
if (!gradientObj) return 'linear-gradient(to bottom, #ffffff, #000000)';

if (typeof gradientObj.start === 'string') {
return createGradient(gradientObj.start, gradientObj.end, gradientObj.direction);
}

const startColor = applyAlphaToColour(gradientObj.start);
const endColor = applyAlphaToColour(gradientObj.end);
return createGradient(startColor, endColor, gradientObj.direction);
}

for (let i in elements) {
const element = elements[i];

if (element.id == "backimg-setting") {
css += `
.sk_page {
  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"}!important;
`
const uploadedImage = element.properties["background-upload-image"];
if (uploadedImage) {
  css += `  background-image: url("${uploadedImage}") !important;\n`;
  css += `  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"} !important;\n`;
}
else if (element.properties["background-image-url"]) {
  css += `  background-image: url("${element.properties["background-image-url"]}") !important;\n`;
  css += `  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"} !important;\n`;
}

css += `
  background-size: ${element.properties["background-size"] ?? "cover"} !important;
  background-repeat: ${element.properties["background-repeat"] ?? "no-repeat"} !important;
  background-position: ${element.properties["background-position"] ?? "center center"} !important;
  background-attachment: ${element.properties["background-attachment"] ?? "fixed"} !important;
}
.sk_header {
  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"}!important;
`

if (uploadedImage) {
  css += `  background-image: url("${uploadedImage}") !important;\n`;
  css += `  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"} !important;\n`;
}
else if (element.properties["background-image-url"]) {
  css += `  background-image: url("${element.properties["background-image-url"]}") !important;\n`;
  css += `  background-color: ${applyAlphaToColour(element.properties["background-colour"]) ?? "#000000"} !important;\n`;
}

css += `
  background-size: ${element.properties["background-size"] ?? "cover"} !important;
  background-repeat: ${element.properties["background-repeat"] ?? "no-repeat"} !important;
  background-position: ${element.properties["background-position"] ?? "center center"} !important;
  background-attachment: ${element.properties["background-attachment"] ?? "fixed"} !important;
}
`
} //end backimg-setting
      if (element.id == "school-name-and-motto") {
          css += `
/* BetterKMR Compiled: School Name & Motto */
.sk_school_name {
  color: ${applyAlphaToColour(element.properties["school-name-colour"]) ?? "#f7f7f7"}!important;
  ${element.properties["school-text-shadow"] === true ?? element.properties["school-name-shadow-colour"] ? `text-shadow: ${applyAlphaToColour(element.properties["school-name-shadow-colour"])} ${element.properties["school-shadow-offset-x"]}px ${element.properties["school-shadow-offset-y"]}px;` : ""}
}
.sk_school_subheading {
  color: ${applyAlphaToColour(element.properties["school-motto-colour"]) ?? "#f7f7f7"}!important;
  ${element.properties["school-text-shadow"] === true ?? element.properties["school-motto-shadow-colour"] ? `text-shadow: ${applyAlphaToColour(element.properties["school-motto-shadow-colour"])} ${element.properties["school-shadow-offset-x"]}px ${element.properties["school-shadow-offset-y"]}px;` : ""}
}
    `
      if (element.properties["school-name-and-motto-visibility"] == false) {
          css += `
/* BetterKMR Compiled: School Name & Motto Visibility */
.sk_header_content {
  visibility: hidden !important;
}
`
      }
      }
      if (element.id == "today-attendance-highlight") {
          const highlightColorObj = element.properties["attendance-highlight-colour"];
          const highlightColor = applyAlphaToColour(highlightColorObj);

          css += `
/* BetterKMR Compiled: Today's Attendance Highlight */
.is-today {
  background-color: ${highlightColor}!important;
}
    `
      }
      if (element.id == "justified-gradients") {
          const presentGradient = element.properties["present-gradient"];
          const lateGradient = element.properties["late-gradient"];
          const unjustifiedGradient = element.properties["unjustified-gradient"];
          const justifiedGradient = element.properties["justified-gradient"];

          css += `
/* BetterKMR Compiled: Attendance Gradients */
.btn-success, .bg-success {
  background: ${processGradient(presentGradient)}!important;
  color: ${applyAlphaToColour(element.properties["present-text-colour"]) ?? "#ffffff"}!important;
}
.btn-info, .bg-info {
  background: ${processGradient(lateGradient)}!important;
  color: ${applyAlphaToColour(element.properties["late-text-colour"]) ?? "#ffffff"}!important;
}
.btn-danger, .bg-danger {
  background: ${processGradient(unjustifiedGradient)}!important;
  color: ${applyAlphaToColour(element.properties["unjustified-text-colour"]) ?? "#ffffff"}!important;
}
.btn-warning, .bg-warning {
  background: ${processGradient(justifiedGradient)}!important;
  color: ${applyAlphaToColour(element.properties["justified-text-colour"]) ?? "#ffffff"}!important;
}
    `
      }
      if (element.id == "navbar-colours") {
          css += `
/* BetterKMR Compiled: Navbar Colours */
body .sk_nav {
  background: ${applyAlphaToColour(element.properties["navbar-background-colour"]) ?? "#000000"}!important;
  color: ${applyAlphaToColour(element.properties["navbar-text-colour"]) ?? "#ffffff"}!important;
  ${element.properties["navbar-box-shadow"] === true ? `box-shadow: ${applyAlphaToColour(element.properties["navbar-box-shadow-colour"])} ${element.properties["navbar-box-shadow-offset-x"]}px ${element.properties["navbar-box-shadow-offset-y"]}px;` : ""}
}
body .sk_nav_text {
  color: ${applyAlphaToColour(element.properties["navbar-text-colour"]) ?? "#ffffff"}!important;
}
`
          if (element.properties["navbar-active-text-colour"] != "") {
              css += `
body .nav-item.active .sk_nav_text {
  color: ${applyAlphaToColour(element.properties["navbar-active-text-colour"]) ?? "#63c9ff"}!important;
}`
          }
          if (element.properties["navbar-hover-text-colour"] != "") {
              css += `
body .sk_nav_text.nav-link.nav-link:hover {
  color: ${applyAlphaToColour(element.properties["navbar-hover-text-colour"]) ?? "#8fd8ff"}!important;
}
`
          }
      }
      if (element.id == "font-family") {
          var fontName = "Inter";
          if (element.properties["font-family-use-custom-google-font"] == true) {
              fontName = element.properties["font-family-custom-name"].trim();
css = `/* BetterKMR Compiled: Font Family (set to top) */
@import url('https://fonts.googleapis.com/css2?family=${fontName}&display=swap');
body {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["font-family-weight"] ?? "400"} !important;
}
` + css;
          } else {
          if (element.properties["font-family-preset"] == "Monocraft") {
            const fontPath = chrome.runtime.getURL("src/fonts/" + element.properties["font-family-preset"] + ".ttf")
            css = `
@font-face {
  font-family: "${element.properties["font-family-preset"]}";
  src: url("${fontPath}") format("truetype");
}
            `
          }
              css += `
body {
  font-family: "${element.properties["font-family-preset"]}", sans-serif !important;
}
`
          }
          if (element.properties["font-family-include-name-motto"] == true) {
            css += `
body .sk_school_name {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["font-family-weight"] ?? "400"} !important;
}

body .sk_school_subheading {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["font-family-weight"] ?? "400"} !important;
}
`;
          }
      }
      if (element.id == "main-colour-schemes") {
        if (element.properties["main-toggle"] == true) {
          css += `
/* BetterKMR Compiled: Main Colour Schemes */
body .sk_text.sk_page.sk-main-content {
  background: ${applyAlphaToColour(element.properties["main-bg"]) ?? "#000000"}!important;
  color: ${applyAlphaToColour(element.properties["main-text"]) ?? "#ffffff"}!important;
}
body .d-flex {
  color: ${applyAlphaToColour(element.properties["main-text"]) ?? "#ffffff"}!important;
}
body .sk_table {
  color: ${applyAlphaToColour(element.properties["main-text"]) ?? "#ffffff"}!important;
}
`

          if (element.properties["card-body"]) {
            css += `
/* BetterKMR Compiled: Navbar/Card Background Colour */
body .card-body {
  background-color: ${applyAlphaToColour(element.properties["card-body"]) ?? "#000000"}!important;
}
`
          }
          if (element.properties["card-body-border"]) {
            css += `
/* BetterKMR Compiled: Navbar/Card Border Colour */
body .card {
  border-color: ${applyAlphaToColour(element.properties["card-body-border"]) ?? "#ffffff"}!important;
}
`
          }
        }
        if (element.properties["table-toggle"] == true) {
          css += `
/* BetterKMR Compiled: Table Colour Scheming */
body .sk_thead_cell, body .sk_thead th {
  background-color: ${applyAlphaToColour(element.properties["table-border"]) ?? "#000000"}!important;
}
body .sk_border, body .sk_thead_cell, body .table td, body .table th {
  border-color: ${applyAlphaToColour(element.properties["table-border"]) ?? "#000000"}!important;
}
`
        }
        if (element.properties["generic-toggle"] == true) {
          css += `
/* BetterKMR Compiled: Generic */
.sk_btn {
  background-color: ${applyAlphaToColour(element.properties["btn-bg"]) ?? "#000000"}!important;
  color: ${applyAlphaToColour(element.properties["btn-text"]) ?? "#ffffff"}!important;
  border-color: ${applyAlphaToColour(element.properties["sk_button_border_colour"]) ?? "#ffffff"}!important;
}

.sk_btn:hover, .sk_btn.active {
  background-color: ${applyAlphaToColour(element.properties["btn-hover-bg"]) ?? "#000000"}!important;
  color: ${applyAlphaToColour(element.properties["btn-hover-text"]) ?? "#ffffff"}!important;
  border-color: ${applyAlphaToColour(element.properties["sk_button_hover_colour"]) ?? "#ffffff"}!important;
}

a {
  color: ${applyAlphaToColour(element.properties["a_link_text_colour"]) ?? "#0066ff"}!important;
}
`
        }
      }
      if (element.id == "additional-css-properties") {
        css += `
${element.properties["css-input"]}
`
      }
      // JS
      if (element.id == "ext-promo-01") {
        if (element.properties["ext-promo-01-enabled"] == true) {
          extras.push("promo_01");
      }
    }
  }

  // Update the CSS editor
  if (cssEditor) {
      cssEditor.setValue(css);
      cssEditor.refresh();
  }
}

// Initialize CodeMirror editor
let cssEditor;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize CodeMirror on the CSS textarea
  cssEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "css",
    lineNumbers: true,
    theme: "ayu-dark",
    extraKeys: { "Ctrl-Space": "autocomplete" },
    colorpicker: true,
    readOnly: true
  });

  // Add autocomplete functionality
  cssEditor.on("inputRead", function(cm, change) {
    if (change.text[0] && /[a-zA-Z0-9_]/.test(change.text[0])) {
      cm.showHint({ completeSingle: false });
    }
  });

  // Add zoom functionality (Ctrl+mousewheel)
  let currentFontSize = 16; // starting font size
  
  cssEditor.getWrapperElement().addEventListener("wheel", function(e) {
    if (e.ctrlKey) {
      e.preventDefault();
      
      if (e.deltaY < 0) {
        currentFontSize += 1;
      } else {
        currentFontSize = Math.max(1, currentFontSize - 1); // prevent negative font size
      }
      
      let codeElement = cssEditor.getWrapperElement().querySelector(".CodeMirror-code");
      if (codeElement) {
        codeElement.style.fontSize = currentFontSize + "px";
        cssEditor.refresh();
      }
    }
  });

  cssEditor.refresh();
  
  document.getElementById('save-button').addEventListener('click', function() {
    cssEditor.save();
  });
  
  // Add Ctrl+S shortcut for saving
  cssEditor.on('keydown', function(cm, event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      document.getElementById('save-button').click();
    }
  });
});

// This code works somehow and I don't know how
function hexToRgba(hex, alpha = 1) {
  if (!hex) return '';
  
  if (hex.length === 9) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setupColourWithAlpha(colorInput, hexDisplay, alphaToggleBtn) {
  if (!colorInput || !hexDisplay || !alphaToggleBtn) return;
  
  let hasAlpha = false;
  
  colorInput.addEventListener('input', (e) => {
    const hex = e.target.value;
    const alpha = parseFloat(colorInput.dataset.alpha) || 1.0;
    
    colorInput.dataset.originalHex = hex;
    
    if (hasAlpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const hexWithAlpha = rgbaToHex(r, g, b, alpha);
      hexDisplay.textContent = hexWithAlpha;
    } else {
      hexDisplay.textContent = hex;
    }
  });
  
  alphaToggleBtn.addEventListener('click', () => {
    hasAlpha = !hasAlpha;
    
    if (hasAlpha) {
      alphaToggleBtn.textContent = "Remove Transparency";
      const alphaContainer = document.createElement('div');
      alphaContainer.className = 'alpha-slider-container';
      alphaContainer.innerHTML = `
        <input type="range" class="alpha-slider" min="1" max="100" value="100" id="${colorInput.id}-alpha-slider">
        <span class="alpha-value">100%</span>
      `;
      hexDisplay.parentNode.insertBefore(alphaContainer, alphaToggleBtn);
      
      const alphaSlider = alphaContainer.querySelector('.alpha-slider');
      const alphaValue = alphaContainer.querySelector('.alpha-value');
      
      alphaSlider.addEventListener('input', (e) => {
        const alphaPercent = parseInt(e.target.value);
        const safeAlphaPercent = Math.max(1, alphaPercent);
        const alphaDecimal = safeAlphaPercent / 100;
        alphaValue.textContent = `${safeAlphaPercent}%`;
        colorInput.dataset.alpha = alphaDecimal;
        
        const hex = colorInput.dataset.originalHex || colorInput.value;
        
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const hexWithAlpha = rgbaToHex(r, g, b, alphaDecimal);
        hexDisplay.textContent = hexWithAlpha;
      });
    } else {
      alphaToggleBtn.textContent = "Add Transparency";
      const alphaContainer = colorInput.parentNode.parentNode.querySelector('.alpha-slider-container');
      if (alphaContainer) {
        alphaContainer.remove();
      }
      
      const hex = colorInput.value;
      hexDisplay.textContent = hex;
      colorInput.dataset.alpha = "1.0";
    }
  });
}

function createGradientFromProperty(gradientProp) {
  if (typeof gradientProp === 'object') {
    return createGradient(gradientProp.start, gradientProp.end, gradientProp.direction);
  } else {
    return gradientProp;
  }
}

function createGradient(color1, color2, direction = 'to bottom') {
  const color1WithAlpha = color1.length === 9 ? hexToRgba(color1) : color1;
  const color2WithAlpha = color2.length === 9 ? hexToRgba(color2) : color2;
  
  return `linear-gradient(${direction}, ${color1WithAlpha}, ${color2WithAlpha})`;
}

const additionalStyles = `
  .gradient-container {
    width: 100%;
    max-width: 400px;
  }
  
  .gradient-preview {
    height: 40px;
    border-radius: 4px;
    margin-bottom: 10px;
    border: 1px solid #444;
  }
  
  .gradient-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .gradient-direction {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .alpha-slider-container {
    display: flex;
    align-items: center;
    margin-top: 5px;
    gap: 10px;
  }
  
  .alpha-slider {
    width: 100px;
    background: #222;
  }
  
  .alpha-toggle-btn {
    background-color: #1a1a1a;
    border: 1px solid #555;
    color: #ccc;
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    cursor: pointer;
    margin-left: 5px;
  }
  
  .alpha-toggle-btn:hover {
    background: #444;
    color: #fff;
  }
  
  .alpha-value {
    font-size: 12px;
    min-width: 40px;
  }
`;

document.addEventListener('DOMContentLoaded', function() {
  const styleElement = document.createElement('style');
  styleElement.textContent = additionalStyles;
  document.head.appendChild(styleElement);
});

function rgbaToHex(r, g, b, a = 1) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  const alpha = Math.round(a * 255);
  
  return '#' + 
    (r < 16 ? '0' : '') + r.toString(16) +
    (g < 16 ? '0' : '') + g.toString(16) +
    (b < 16 ? '0' : '') + b.toString(16) +
    (alpha < 16 ? '0' : '') + alpha.toString(16);
}

window.createNotification = function(message, color, frontcol) {
  const notificationContainer = document.getElementById('notification-container');
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.backgroundColor = color;
  notification.style.color = frontcol;
  notification.innerText = message;

  const removeNotification = () => {
    notification.classList.add('hidden');
    setTimeout(() => notification.remove(), 500);
  };

  notification.addEventListener('click', removeNotification);
  notificationContainer.appendChild(notification);
  setTimeout(removeNotification, 5000);
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function getAlphaFromHex(hexColor) {
  if (hexColor && hexColor.length === 9) {
    const alphaHex = hexColor.substring(7, 9);
    return parseInt(alphaHex, 16) / 255;
  }
  return 1;
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    const saveButton = document.getElementById('save-button');
    if (!saveButton.disabled) {
      saveButton.click();
    }
  }
}, false);

function postLoad(elements) {
  setTimeout(updateImagePreviews, 100);
  
  console.log('Theme loaded successfully with', elements.length, 'elements');
}

function postLoad(elements) {
  setTimeout(updateImagePreviews, 100);
  
  console.log('Theme loaded successfully with', elements.length, 'elements');
}

// From settings/lib.js
function saveSetting(key, value) {
  if (window.chrome && chrome.storage && chrome.storage.sync) {
    let data = {};
    data[key] = value;
    chrome.storage.sync.set(data, function() {
      console.log('Saved ' + key + ': ' + value);
    });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
    document.getElementById("update-notice").addEventListener('click', () => {
        document.getElementById("update-notice").remove();
    });
    //chrome.storage.sync.set({ 'update_notice_closed': true });

    window.createDialog = function({ title, content, buttons = [] }) {
      console.log("Creating dialog with title:", title);
      const overlay = document.createElement('div');
      overlay.className = 'dialog-overlay-fixed';
    
      const dialog = document.createElement('div');
      dialog.className = 'dialog-box';
    
      const titleElement = document.createElement('h2');
      titleElement.className = 'dialog-title';
      titleElement.textContent = title;
    
      const contentElement = document.createElement('p');
      contentElement.className = 'dialog-content';
      contentElement.innerHTML = content;
    
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'dialog-buttons';
    
      buttons.forEach(({ text, callback, classname }) => {
        const button = document.createElement('button');
        button.className = classname || 'dialog-button';
        button.textContent = text;
        button.onclick = () => {
          callback?.();
          dialog.close();
        };
        buttonContainer.appendChild(button);
      });
    
      dialog.append(titleElement, contentElement, buttonContainer);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
    
      dialog.close = () => {
        document.body.removeChild(overlay);
      };
    
      return dialog;
    };

document.getElementById("export-button").addEventListener('click', () => {
  createDialog({
    title: 'Import/Export',
    content: `What would you like to do?<br><br>Importing from File means you can upload a theme file to import settings.<br>Exporting to File will download a theme file with your current settings.<br>Exporting to CSS will download a CSS file with your current settings.<br><br>You may need to save your theme before continuing.<br>If you import this theme on a newer version, it may convert it for you.`,
    buttons: [
      {
        text: 'Import from File',
        callback: () => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = '.bkt';
          
          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const themeData = JSON.parse(e.target.result);
                
                if (!themeData.name || !themeData.elements) {
                  throw new Error('Invalid theme file format');
                }

                // Check if theme needs conversion
                if (!themeData.vtt_version) {
                  createDialog({
                    title: 'Theme Version Update Required',
                    content: 'This theme file requires updating to a new version.<br>Would you like to convert it?',
                    buttons: [
                      {
                        text: 'Yes',
                        callback: () => {
                          const dialog = createDialog({
                            title: 'Converting Theme',
                            content: `
                              <p>Converting your theme to version ${VTT_VERSION}...</p>
                              <p>Please do not close this window during conversion.</p>
                              <p>This may take a moment.</p>
                            `
                          });

                          setTimeout(() => {
                            try {
                              const convertedTheme = convertThemeToNewVersion(themeData);
                              importTheme(convertedTheme);
                              dialog.close();
                              createDialog({
                                title: 'Conversion Complete',
                                content: `
                                  Theme successfully converted and imported!<br>
                                  Please save your theme to keep the converted version.
                                `,
                                buttons: [{ text: 'OK' }]
                              });
                            } catch (error) {
                              console.error('Conversion error:', error);
                              dialog.close();
                              createNotification("Failed to convert theme", "#961a1a", "#ffffff");
                            }
                          }, 500);
                        }
                      },
                      {
                        text: 'Cancel',
                        classname: 'dialog-button-not',
                        callback: () => {}
                      }
                    ]
                  });
                  return;
                }

                // If theme is current version or already converted, import it
                importTheme(themeData);

              } catch (error) {
                console.error('Import error:', error);
                createNotification("Failed to import theme: Invalid file format", "#961a1a", "#ffffff");
              }
            };
            reader.readAsText(file);
          });
          
          fileInput.click();
        }
      },
      {
        text: 'Export to File',
        callback: () => {
          const themeName = document.getElementById('theme-name').value.trim();
          if (!themeName) {
            createNotification("Please enter a theme name.", "#961a1a", "#ffffff");
            return;
          }
          try {
            const theme = {
              name: themeName,
              vtt_version: VTT_VERSION,
              elements: []
            };
            
            addedElements.forEach(element => {
              const elementData = {
                id: element.id,
                name: element.name,
                properties: {}
              };
              
              element.properties.forEach(property => {
                const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
                
                if (property.type === 'image-upload') {
                  const dataInput = document.getElementById(`${propId}-data`);
                  if (dataInput) {
                    elementData.properties[property.id] = dataInput.value;
                  }
                } else if (property.type === 'toggle' || property.type === 'checkbox') {
                  const input = document.getElementById(propId);
                  if (input) {
                    elementData.properties[property.id] = input.checked;
                  }
                } else {
                  const input = document.getElementById(propId);
                  if (input) {
                    elementData.properties[property.id] = input.value;
                  }
                }
              });
              
              theme.elements.push(elementData);
            });
            
            const blob = new Blob([JSON.stringify(theme, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${themeName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.bkt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            createNotification("Theme exported successfully!", "#3c8443", "#ffffff");
            
          } catch (error) {
            console.error('Export error:', error);
            createNotification("Failed to export theme", "#961a1a", "#ffffff");
          }
        }
      },
      {
        text: 'Export to CSS',
        classname: 'dialog-button',
        callback: () => {
          const cssContent = cssEditor.getValue();
                
          const blob = new Blob([cssContent], {type: 'text/css'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${document.getElementById('theme-name').value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.css`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          createNotification("Theme CSS exported successfully!", "#3c8443", "#ffffff");
        }
      },
      {
        text: 'Cancel',
        classname: 'dialog-button-not',
        callback: () => {}
      }
    ]
  });
});

function importTheme(themeData) {
  const container = document.getElementById('added-elements-container');
  container.innerHTML = '';
  addedElements = [];
  
  document.getElementById('theme-name').value = themeData.name;
  
  themeData.elements.forEach(element => {
    const elementTemplate = availableElements.find(temp => temp.id === element.id);
    if (elementTemplate) {
      addElement(elementTemplate);
      
      if (element.properties) {
        Object.entries(element.properties).forEach(([propName, propValue]) => {
          const property = elementTemplate.properties.find(p => p.id === propName);
          if (property) {
            const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
            const input = document.getElementById(propId);
            
            if (input) {
              if (property.type === 'image-upload') {
                const dataInput = document.getElementById(`${propId}-data`);
                if (dataInput && propValue) {
                  dataInput.value = propValue;
                  const event = new Event('change');
                  dataInput.dispatchEvent(event);
                }
              } else if (property.type === 'toggle' || property.type === 'checkbox') {
                input.checked = propValue;
                const event = new Event('change');
                input.dispatchEvent(event);
              } else {
                input.value = propValue;
                const event = new Event('change');
                input.dispatchEvent(event);
              }
            }
          }
        });
      }
    }
  });
  
  postLoad(themeData.elements);
  createNotification("Theme imported successfully!", "#3c8443", "#ffffff");
}