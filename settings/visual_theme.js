const availableElements = [
  { // moved from below navbar colours
    id: "font-family",
    name: "Font Family",
    description: "Change the font family of the Kamar website",
    properties: [
      { name: "Preset Font Family", type: "dropdown", default: "Inter", options: ["Inter", "Arial", "Times New Roman", "Courier New"] },
      { name: "Include School Name & Motto", type: "toggle", default: false },
      { name: "Use custom font from Google Fonts", type: "toggle", default: false, controlsVisibility: ["Custom Google Font Name", "Fonts are case sensitive, so for example 'inter' should be 'Inter'. View the list of Google Fonts at https://fonts.google.com.", "Font Weight (100-900) (thin-black)", "<br><br>Also, some fonts don't have many font weights, sometimes even only the standard 400."] },
      { name: "Fonts are case sensitive, so for example 'inter' should be 'Inter'. View the list of Google Fonts at https://fonts.google.com.", type: "tooltip", visibleWhen: "Use custom font from Google Fonts" },
      { name: "Custom Google Font Name", type: "text", default: "Delius Swash Caps", visibleWhen: "Use custom font from Google Fonts" },
      { name: "Font Weight (100-900) (thin-black)", type: "number", default: 400, unit: "px", visibleWhen: "Use custom font from Google Fonts" },
      { name: "<br><br>Also, some fonts don't have many font weights, sometimes even only the standard 400.", type: "tooltip", visibleWhen: "Use custom font from Google Fonts" },
    ]
  },
  {
    id: "backimg-setting",
    name: "Change Background",
    description: "Changes the background of Kamar (solid colour, image)",
    properties: [
      { name: "By providing a background image, you agree that you have permission to use it and you agree the developers aren't held responsible.", type: "tooltip" },
      { name: "Background Colour", type: "color", default: "#000000" },
      { name: "Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg", type: "text", default: "" },
      { name: "Show Advanced Options", type: "toggle", default: false, controlsVisibility: ["Background Size", "Background Repeat", "Background Position", "Background Attachment"] },
      { name: "If you don't know what the below dropdowns do, it's best to leave them.", type: "tooltip", visibleWhen: "Show Advanced Options" },
      { name: "Background Size", type: "dropdown", default: "cover", options: ["cover", "contain", "auto", "100%", "100% 100%"], visibleWhen: "Show Advanced Options" },
      { name: "Background Repeat", type: "dropdown", default: "no-repeat", options: ["no-repeat", "repeat", "repeat-x", "repeat-y"], visibleWhen: "Show Advanced Options" },
      { name: "Background Position", type: "dropdown", default: "center center", options: ["center center", "top left", "top center", "top right", "center left", "center right", "bottom left", "bottom center", "bottom right"], visibleWhen: "Show Advanced Options" },
      { name: "Background Attachment", type: "dropdown", default: "fixed", options: ["fixed", "scroll", "local"], visibleWhen: "Show Advanced Options" },
    ]
  },
  {
    id: "today-attendance-highlight",
    name: "Today's Attendance Highlight",
    description: "Highlights today's date on the attendance page",
    properties: [
      { name: "Highlight (Background) Colour", type: "color", default: "#4CAF50", allowTransparency: true },
    ]
  },
  {
    id: "school-name-and-motto",
    name: "School Name & Motto Colours",
    description: "Change the colours of the school name and motto, as well as text shadows.",
    properties: [
      { name: "Name Colour", type: "color", default: "#f7f7f7" },
      { name: "Motto Colour", type: "color", default: "#f7f7f7" },
      { name: "Text Shadow", type: "toggle", default: false, controlsVisibility: ["Text Shadow Colour", "Motto Shadow Colour", "Text Shadow Offset X", "Text Shadow Offset Y"]},
      { name: "Name Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Text Shadow" },
      { name: "Motto Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Text Shadow" },
      { name: "Text Shadow Offset X", type: "number", default: 2, unit: "px", visibleWhen: "Text Shadow" },
      { name: "Text Shadow Offset Y", type: "number", default: 2, unit: "px", visibleWhen: "Text Shadow" },
    ]
  },
  {
    id: "justified-gradients",
    name: "Present, Late, Unjustified & Justified Colours",
    description: "Change the colours of the present, late, unjustified and justified colours.",
    properties: [
      { name: "If you want a solid colour, you can fill both gradient colours the same.", type: "tooltip"},
      { name: "Text Colour (Present)", type: "color", default: "#ffffff"},
      { name: "Present Colour", type: "gradient", defaultStart: "#49cea2", defaultEnd: "#00849b" },
      { name: "Text Colour (Late)", type: "color", default: "#ffffff"},
      { name: "Late Colour", type: "gradient", defaultStart: "#28a3a1", defaultEnd: "#003363" },
      { name: "Text Colour (Unjustified)", type: "color", default: "#ffffff"},
      { name: "Unjustified Colour", type: "gradient", defaultStart: "#d80000", defaultEnd: "#640000" },
      { name: "Text Colour (Justified)", type: "color", default: "#ffffff"},
      { name: "Justified Colour", type: "gradient", defaultStart: "#edff4c", defaultEnd: "#849b00" },
    ]
  },
  {
    id: "navbar-colours",
    name: "Navbar Colours",
    description: "Change the colours of the Kamar navbar",
    properties: [
      { name: "Background Colour", type: "color", default: "#000000" },
      { name: "Text Colour", type: "color", default: "#ffffff" },
      { name: "Active Text Colour", type: "color", default: "#63c9ff" },
      { name: "Active Hover Text Colour", type: "color", default: "#8fd8ff" },
      { name: "Box Shadow", type: "toggle", default: false, controlsVisibility: ["Text Shadow Colour", "Motto Shadow Colour", "Text Shadow Offset X", "Text Shadow Offset Y"]},
      { name: "Box Shadow Colour", type: "color", default: "#003f87", visibleWhen: "Box Shadow" },
      { name: "Box Shadow Offset X", type: "number", default: 2, unit: "px", visibleWhen: "Box Shadow" },
      { name: "Box Shadow Offset Y", type: "number", default: 2, unit: "px", visibleWhen: "Box Shadow" },
    ]
  },
  {
    id: "main-colour-schemes",
    name: "Main Colour Schemes",
    description: "Change the properties of the main content box, where most things are displayed",
    properties: [
      { name: "Main Content Box", type: "toggle", default: false, controlsVisibility: ["Main Content Box Background Colour (sk_main_content)", "Main Content Box Text Colour (sk_main_content)"]},
      { name: "By default in Kamar, the background colour is completely transparent.", type: "tooltip", visibleWhen: "Main Content Box" },
      { name: "Main Content Box Background Colour (sk_main_content)", type: "color", default: "#000000", visibleWhen: "Main Content Box" },
      { name: "Main Content Box Text Colour (sk_main_content)", type: "color", default: "#ffffff", visibleWhen: "Main Content Box" },
      { name: "Navbar/Card Background Colour (card-body)", type: "color", default: "#ffffff", visibleWhen: "Main Content Box" },
      { name: "Table Colour Scheming", type: "toggle", default: false, controlsVisibility: ["Table Header Colour (sk_thead_cell)", "Table Border Colour (sk_border)" ]},
      { name: "Table Header Colour (sk_thead_cell)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
      { name: "Table Border Colour (sk_border, sk_thead_cell)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
      { name: "Generic", type: "toggle", default: false, controlsVisibility: ["Button Colour (sk_btn)", "Button Text Colour (sk_btn)"]},
      { name: "Button Colour (sk_btn)", type: "color", default: "#000000", visibleWhen: "Generic" },
      { name: "Button Text Colour (sk_btn)", type: "color", default: "#ffffff", visibleWhen: "Generic" },
      { name: "Button Hover & Active Background Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#000000", visibleWhen: "Generic" },
      { name: "Button Hover & Active Text Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#ffffff", visibleWhen: "Generic" },
      { name: "Button Border Colour (sk_btn)", type: "color", default: "#ffffff", visibleWhen: "Generic", uniqueId: "sk_button_border_colour" },
      { name: "Button Hover & Active Border Colour (sk_btn.active, sk_btn:hover)", type: "color", default: "#ffffff", visibleWhen: "Generic", uniqueId: "sk_button_hover_colour" },
      { name: "Link Text Colour (a)", type: "color", default: "#0066ff", visibleWhen: "Generic", uniqueId: "a_link_text_colour" },
    ]
  },
  {
    id: "additional-css-properties",
    name: "Additional CSS Properties",
    description: "Something missing from the above settings? Add it here!",
    properties: [
      { name: "Below, you can add your own CSS styles that will trail on after the settings from the Visual Theme Editor.", type: "tooltip" },
      { name: "CSS Properties", type: "text", default: "" },
      { name: "If you don't know what this is, it's best to remove it.", type: "tooltip" },
      { name: "If you want to add something that's not in the settings, but don't know how to code, feel free to ask in the Discord! https://discord.gg/HjJvakyAXe", type: "tooltip" },
    ]
  }
];

const backimgSettingIndex = availableElements.findIndex(el => el.id === "backimg-setting");
if (backimgSettingIndex !== -1) {
  // Add the new upload property after the background image URL property
  const backgroundImagePropertyIndex = availableElements[backimgSettingIndex].properties.findIndex(
    prop => prop.name === "Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"
  );
  
  if (backgroundImagePropertyIndex !== -1) {
    // Add the new upload image property after the URL property
    availableElements[backimgSettingIndex].properties.splice(backgroundImagePropertyIndex + 1, 0, 
      { 
        name: "Or Upload Background Image", 
        type: "image-upload", 
        default: "", 
        controlsVisibility: ["Delete Uploaded Image"] 
      },
      {
        name: "Delete Uploaded Image",
        type: "button",
        default: "Delete Image",
        visibleWhen: "Or Upload Background Image"
      }
    );
  }
}

// Keep track of added elements
let addedElements = [];


// Add this near the top of your file, after any imports but before other code
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 200);
});

document.addEventListener('DOMContentLoaded', function() {
  // Get theme ID from URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const themeID = urlParams.get('themeID');
  
  if (themeID && themeID !== 'new_theme') {
    loadThemeForEditing(themeID);
  }
  
  // Set up save button
  document.getElementById('save-button').addEventListener('click', saveTheme);
  
  // Hide loading screen after a brief delay
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

// Dialog functionality
const addElementButton = document.getElementById('add-element-button');
const elementDialog = document.getElementById('element-dialog');
const dialogOverlay = document.getElementById('dialog-overlay');
const elementSearch = document.getElementById('element-search');
const elementList = document.getElementById('element-list');
const closeDialogButton = document.querySelector('.element-dialog-close');

// Open dialog
addElementButton.addEventListener('click', () => {
  populateElementList();
  elementDialog.style.display = 'block';
  dialogOverlay.style.display = 'block';
  elementSearch.focus();
});

// Close dialog
closeDialogButton.addEventListener('click', closeDialog);
dialogOverlay.addEventListener('click', closeDialog);

function closeDialog() {
  elementDialog.style.display = 'none';
  dialogOverlay.style.display = 'none';
  elementSearch.value = '';
}

// Search functionality
elementSearch.addEventListener('input', () => {
  const searchTerm = elementSearch.value.toLowerCase();
  populateElementList(searchTerm);
});

// Populate element list
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
        
        // Also allow clicking anywhere on the item to add it
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
  
  // Show message if no elements found
  if (elementList.children.length === 0) {
    const noResults = document.createElement('div');
    noResults.style.padding = '15px 20px';
    noResults.style.color = '#999';
    noResults.textContent = 'No elements found matching your search.';
    elementList.appendChild(noResults);
  }
}

// Add element to appearance tab
function addElement(element) {
  // Add to our tracking array
  addedElements.push({...element});
  
  // Create the element UI
  const addedElement = document.createElement('div');
  addedElement.className = 'added-element';
  addedElement.dataset.elementId = element.id;
  
  let elementContent = `
    <div class="added-element-header">
      <div class="added-element-title">${element.name}</div>
      <button class="added-element-remove" data-element-id="${element.id}">Remove</button>
    </div>
    <div class="added-element-content">
  `;

  
  // Add properties
  element.properties.forEach(property => {
    const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
    let visibilityAttribute = '';
    
    if (property.visibleWhen) {
      visibilityAttribute = `data-visible-when="${property.visibleWhen}" style="display: none;"`;
    }
    
    // Add unique identifier as a data attribute if provided
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
              `<option value="${option}" ${option === property.default ? 'selected' : ''}>${option}</option>`
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
        setupColorWithAlpha(colorInput, hexDisplay, alphaToggleBtn);
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
        // Set up alpha for start color
        setupColorWithAlpha(startColor, startHex, startAlphaToggleBtn);
        
        // Set up alpha for end color
        setupColorWithAlpha(endColor, endHex, endAlphaToggleBtn);
        
        // Initial preview
        updateGradientPreview();
        
        // Replace DOMSubtreeModified with a MutationObserver
        const startObserver = new MutationObserver(() => updateGradientPreview());
        const endObserver = new MutationObserver(() => updateGradientPreview());
        
        startObserver.observe(startHex, { childList: true, characterData: true, subtree: true });
        endObserver.observe(endHex, { childList: true, characterData: true, subtree: true });
        
        direction.addEventListener('change', updateGradientPreview);
      }
    } else if (property.type === 'toggle' && property.controlsVisibility) {
      const toggleInput = document.getElementById(propId);
      
      if (toggleInput) {
        // Set initial visibility
        toggleVisibilityBasedOnToggle(element.id, property.name, toggleInput.checked);
        
        // Add event listener for changes
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
        // Setup click handler for the upload button
        uploadBtn.addEventListener('click', () => {
          fileInput.click();
        });
        
        // Show preview if there's already data
        if (dataInput.value) {
          previewImg.src = dataInput.value;
          console.log("set preview src to ", dataInput.value);
          const infoDisplay = document.getElementById(`${propId}-info`);
          updateImageInfo(dataInput.value, infoDisplay);
          previewImg.style.display = 'block';
        }
        
        // File select handler
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            handleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay);
          }
        });
        
        // Drag & Drop handlers
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
        
        // If this is a visible control, update visibility of controlled elements
        if (property.controlsVisibility) {
          toggleVisibilityBasedOnValue(element.id, property.name, dataInput.value !== '');
          
          // Monitor for changes to update visibility
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

// Append the image upload styles to your existing styleElement
document.addEventListener('DOMContentLoaded', function() {
const styleElement = document.createElement('style');
styleElement.textContent = imageUploadStyles;
document.head.appendChild(styleElement);
});

// Add CSS for toggle switches
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

// Remove element from appearance tab
function removeElement(elementId) {
  // Remove from the DOM
  const element = document.querySelector(`.added-element[data-element-id="${elementId}"]`);
  if (element) {
    element.remove();
  }
  
  // Remove from our tracking array
  addedElements = addedElements.filter(el => el.id !== elementId);
}

// Helper function to format property names for display
function formatPropertyName(name) {
  /* return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); */
    return name;
}

// Define a proper getAllCustomThemes function
function getAllCustomThemes(callback) {
  chrome.storage.local.get('themes', function(data) {
    const themes = data.themes || {};
    callback(themes);
  });
}

// Update the loadThemeForEditing function to use this correctly
// Update loadThemeForEditing to handle complex properties correctly
function loadThemeForEditing(themeId) {
  getAllCustomThemes(function(themes) {
    const theme = themes[themeId];
    if (!theme) {
      console.error('Theme not found:', themeId);
      createNotification("Theme not found. Creating a new theme instead.", "#e74c3c", "#ffffff");
      return;
    }

    if (!theme.autoApplySave) {
      document.getElementById("apply-theme-auto").checked = false;
    }
    
    // Set theme name
    document.getElementById('theme-name').value = theme.name;
    
    // Clear any existing elements
    const addedElementsContainer = document.getElementById('added-elements-container');
    if (addedElementsContainer) {
      addedElementsContainer.innerHTML = '';
    }
    
    // Reset the addedElements array
    addedElements = [];
    
    // Load saved elements if they exist
    if (theme.elements && Array.isArray(theme.elements)) {
      theme.elements.forEach(element => {
        // Find the matching element template
        const elementTemplate = availableElements.find(temp => temp.id === element.id);
        if (elementTemplate) {
          // Add the element to the UI
          addElement(elementTemplate);
          
          // Now set all the property values from the saved theme
          if (element.properties) {
            Object.entries(element.properties).forEach(([propName, propValue]) => {
              const property = elementTemplate.properties.find(p => p.name === propName);
              if (property) {
                const propId = `${element.id}-${propName.replace(/\s+/g, '-')}`;
                
                // Handle different property types
                if (property.type === 'color') {
                  // Handle colors with transparency
                  const input = document.getElementById(propId);
                  const hexDisplay = document.getElementById(`${propId}-hex`);
                  const alphaToggleBtn = document.getElementById(`${propId}-alpha-toggle`);
                  
                  if (input && hexDisplay) {
                    // Handle new format (color object with hex and alpha)
                    if (propValue && typeof propValue === 'object' && propValue.hex) {
                      const hexColor = propValue.hex;
                      const alpha = propValue.alpha || 1.0;
                      
                      // Set the original hex color
                      input.value = hexColor;
                      input.dataset.originalHex = hexColor;
                      input.dataset.alpha = alpha;
                      
                      if (alpha < 1.0) {
                        // Calculate display color with alpha
                        const r = parseInt(hexColor.slice(1, 3), 16);
                        const g = parseInt(hexColor.slice(3, 5), 16);
                        const b = parseInt(hexColor.slice(5, 7), 16);
                        const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                        hexDisplay.textContent = hexWithAlpha;
                        
                        // Enable transparency UI
                        if (alphaToggleBtn) {
                          // Check if transparency is already enabled
                          const alphaContainer = input.parentNode.parentNode.querySelector('.alpha-slider-container');
                          
                          if (!alphaContainer) {
                            // If alpha slider doesn't exist but we have alpha value, trigger the toggle
                            alphaToggleBtn.click(); // Enable transparency
                            
                            // Now set the slider value
                            setTimeout(() => {
                              const alphaSlider = input.parentNode.parentNode.querySelector('.alpha-slider');
                              const alphaValue = input.parentNode.parentNode.querySelector('.alpha-value');
                              
                              if (alphaSlider && alphaValue) {
                                const alphaPercent = Math.round(alpha * 100);
                                alphaSlider.value = alphaPercent;
                                alphaValue.textContent = `${alphaPercent}%`;
                              }
                            }, 50); // Short delay to ensure toggle has completed
                          } else if (alphaContainer) {
                            // Alpha container already exists, just update values
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
                        // No transparency
                        hexDisplay.textContent = hexColor;
                      }
                    }
                    // Backward compatibility for old format (string color)
                    else if (propValue && typeof propValue === 'string') {
                      // Handle old format colors with transparency
                      if (propValue.length === 9) { // Full hex with alpha #RRGGBBAA
                        const alphaHex = propValue.substring(7, 9);
                        const alphaDecimal = parseInt(alphaHex, 16) / 255;
                        const alphaPercent = Math.round(alphaDecimal * 100);
                        const colorWithoutAlpha = propValue.substring(0, 7);
                        
                        input.value = colorWithoutAlpha;
                        input.dataset.originalHex = colorWithoutAlpha;
                        input.dataset.alpha = alphaDecimal;
                        hexDisplay.textContent = propValue;
                        
                        // Check if transparency is already enabled
                        if (alphaToggleBtn) {
                          const alphaContainer = input.parentNode.parentNode.querySelector('.alpha-slider-container');
                          
                          if (!alphaContainer) {
                            // If alpha slider doesn't exist but we have alpha value, trigger the toggle
                            alphaToggleBtn.click(); // Enable transparency
                            
                            // Now set the slider value
                            setTimeout(() => {
                              const alphaSlider = input.parentNode.parentNode.querySelector('.alpha-slider');
                              const alphaValue = input.parentNode.parentNode.querySelector('.alpha-value');
                              
                              if (alphaSlider && alphaValue) {
                                alphaSlider.value = alphaPercent;
                                alphaValue.textContent = `${alphaPercent}%`;
                              }
                            }, 50); // Short delay to ensure toggle has completed
                          }
                        }
                      } else {
                        // Regular color without alpha
                        input.value = propValue;
                        input.dataset.originalHex = propValue;
                        input.dataset.alpha = "1.0";
                        hexDisplay.textContent = propValue;
                      }
                    }
                  }
                }
                else if (property.type === 'gradient') {
                  // Handle gradient properties
                  const startInput = document.getElementById(`${propId}-start`);
                  const startHex = document.getElementById(`${propId}-start-hex`);
                  const endInput = document.getElementById(`${propId}-end`);
                  const endHex = document.getElementById(`${propId}-end-hex`);
                  const direction = document.getElementById(`${propId}-direction`);
                  const startAlphaToggleBtn = document.getElementById(`${propId}-start-alpha-toggle`);
                  const endAlphaToggleBtn = document.getElementById(`${propId}-end-alpha-toggle`);
                  
                  if (propValue && typeof propValue === 'object') {
                    // Handle direction
                    if (direction && propValue.direction) {
                      direction.value = propValue.direction;
                    }
                    
                    // Handle start color (new format with hex and alpha)
                    if (startInput && startHex && propValue.start && typeof propValue.start === 'object' && propValue.start.hex) {
                      const hexColor = propValue.start.hex;
                      const alpha = propValue.start.alpha || 1.0;
                      
                      startInput.value = hexColor;
                      startInput.dataset.originalHex = hexColor;
                      startInput.dataset.alpha = alpha;
                      
                      if (alpha < 1.0 && startAlphaToggleBtn) {
                        // Calculate display color with alpha
                        const r = parseInt(hexColor.slice(1, 3), 16);
                        const g = parseInt(hexColor.slice(3, 5), 16);
                        const b = parseInt(hexColor.slice(5, 7), 16);
                        const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                        startHex.textContent = hexWithAlpha;
                        
                        // Handle transparency UI
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
                    // Handle start color (old format string)
                    else if (startInput && startHex && propValue.start && typeof propValue.start === 'string') {
                      startInput.value = propValue.start.substring(0, 7); // Remove alpha if present
                      startInput.dataset.originalHex = propValue.start.substring(0, 7);
                      startInput.dataset.alpha = "1.0";
                      startHex.textContent = propValue.start;
                      
                      // Check for alpha in old format
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
                    
                    // Handle end color (new format with hex and alpha)
                    if (endInput && endHex && propValue.end && typeof propValue.end === 'object' && propValue.end.hex) {
                      const hexColor = propValue.end.hex;
                      const alpha = propValue.end.alpha || 1.0;
                      
                      endInput.value = hexColor;
                      endInput.dataset.originalHex = hexColor;
                      endInput.dataset.alpha = alpha;
                      
                      if (alpha < 1.0 && endAlphaToggleBtn) {
                        // Calculate display color with alpha
                        const r = parseInt(hexColor.slice(1, 3), 16);
                        const g = parseInt(hexColor.slice(3, 5), 16);
                        const b = parseInt(hexColor.slice(5, 7), 16);
                        const hexWithAlpha = rgbaToHex(r, g, b, alpha);
                        endHex.textContent = hexWithAlpha;
                        
                        // Handle transparency UI
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
                    // Handle end color (old format string)
                    else if (endInput && endHex && propValue.end && typeof propValue.end === 'string') {
                      endInput.value = propValue.end.substring(0, 7); // Remove alpha if present
                      endInput.dataset.originalHex = propValue.end.substring(0, 7);
                      endInput.dataset.alpha = "1.0";
                      endHex.textContent = propValue.end;
                      
                      // Check for alpha in old format
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
    if (theme.code) {
      cssEditor.setValue(theme.code);
    }
    
    // Trigger any post-load initialization that might be needed
    if (typeof postLoad === 'function') {
      try {
        postLoad(theme.elements);
      } catch (e) {
        console.error('Error in postLoad function:', e);
        createNotification("Error loading the compiling function. Please check console for", "#961a1a", "#ffffff");
      }
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
      // Disable save button to prevent multiple clicks
      const saveButton = document.getElementById('save-button');
      saveButton.disabled = true;
      saveButton.textContent = 'Saving...';
      console.log("Saving theme...");
      
      try {
        // Get theme name and validate
        const themeName = document.getElementById('theme-name').value.trim();
        if (!themeName) {
          createNotification("Please enter a theme name before continuing.", "#961a1a", "#ffffff");
          saveButton.disabled = false;
          saveButton.textContent = 'Save Theme';
          return;
        }
        
        try {
          // Collect theme data
          const theme = {
            name: themeName,
            elements: []
          };
          
          // Collect all custom elements
          addedElements.forEach(element => {
            const elementData = {
              id: element.id,
              name: element.name,
              properties: {}
            };
            
            // Collect property values
            element.properties.forEach(property => {
              const propId = `${element.id}-${property.name.replace(/\s+/g, '-')}`;
              
              if (property.type === 'color') {
                const hexDisplay = document.getElementById(`${propId}-hex`);
                const colorInput = document.getElementById(propId);
                if (hexDisplay && colorInput) {
                  // Save original hex color and transparency separately
                  const originalHex = colorInput.dataset.originalHex || colorInput.value;
                  const alpha = parseFloat(colorInput.dataset.alpha) || 1.0;
                  
                  elementData.properties[property.name] = {
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
                
                elementData.properties[property.name] = {
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
                  elementData.properties[property.name] = dataInput.value;
                }
              } else if (property.type === 'checkbox' || property.type === 'toggle') {
                const checkbox = document.getElementById(propId);
                if (checkbox) {
                  elementData.properties[property.name] = checkbox.checked;
                  
                  // Trigger change event to show/hide dependent content
                  const event = new Event('change', { bubbles: true });
                  checkbox.dispatchEvent(event);
                }
              } else if (property.type === 'select' || property.type === 'dropdown') {
                const select = document.getElementById(propId);
                if (select) {
                  elementData.properties[property.name] = select.value;
                  
                  // Trigger change event in case select has dependent fields
                  const event = new Event('change', { bubbles: true });
                  select.dispatchEvent(event);
                }
              } else if (property.type === 'text' || property.type === 'url' || property.type === 'number') {
                const input = document.getElementById(propId);
                if (input) {
                  elementData.properties[property.name] = input.value;
                }
              }
              // Handle any future property types here - making it extensible
              else if (property.type) {
                // Generic handler for any other property types
                // This catches any property types we haven't explicitly handled
                console.log(`Saving property of type ${property.type}: ${property.name}`);
                const input = document.getElementById(propId);
                if (input) {
                  // Get the value from the element based on its type
                  let value;
                  
                  if (input.tagName === 'INPUT' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA') {
                    value = input.value;
                  } else if (input.tagName === 'DIV' || input.tagName === 'SPAN') {
                    // For containers, check for data attributes first
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
                    // Last resort - get any available property
                    value = input.value || input.textContent || '';
                  }
                  
                  // Save the value to the element data
                  elementData.properties[property.name] = value;
                }
              }
            });
            
            theme.elements.push(elementData);
          });
          
          console.log("Elements collected:", theme.elements);
          
          // Generate CSS for the theme
          try {
            postSave(theme.elements);
            cssEditor.save();
          } catch (error) {
            console.error("Error generating CSS:", error);
            createNotification("Error generating CSS. Default CSS will be used.", "#e74c3c", "#ffffff");
          }
          
          // Get the theme ID from URL or generate a new one
          const urlParams = new URLSearchParams(window.location.search);
          let themeId = urlParams.get('themeID');
          
          if (!themeId || themeId === 'new_theme') {
            themeId = uuidv4();
          }
          
          getAllCustomThemes(function(themes) {
            try {
              // Create the theme data object
              console.log("Get all custom themes:", themes);
              const themeData = {
                id: themeId,
                name: themeName,
                code: cssEditor.getValue(),
                elements: theme.elements,
                lastModified: new Date().toISOString(),
                autoApplySave: document.getElementById("apply-theme-auto").checked
              };
              
              // Add to themes collection
              themes[themeId] = themeData;
              
              // Save to Chrome storage
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
let css = '';

// Helper function to apply alpha to hex color
function applyAlphaToColor(colorObj) {
if (!colorObj) return '#000000';

// If the color is a string (for backward compatibility)
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

// Update gradient function to handle new format
function processGradient(gradientObj) {
if (!gradientObj) return 'linear-gradient(to bottom, #ffffff, #000000)';

// Handle old format (backwards compatibility)
if (typeof gradientObj.start === 'string') {
return createGradient(gradientObj.start, gradientObj.end, gradientObj.direction);
}

// Handle new format with separate hex and alpha
const startColor = applyAlphaToColor(gradientObj.start);
const endColor = applyAlphaToColor(gradientObj.end);
return createGradient(startColor, endColor, gradientObj.direction);
}

for (let i in elements) {
const element = elements[i];

// Handle elements based on their ID
if (element.id == "backimg-setting") {
cssEditor.setValue("");
console.log(element);
console.log(element.properties);
css += `
.sk_page {
  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"}!important;
`
// Check if we have an uploaded image first
const uploadedImage = element.properties["Or Upload Background Image"];
if (uploadedImage) {
  css += `  background-image: url("${uploadedImage}") !important;\n`;
  css += `  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"} !important;\n`;
}
// If no uploaded image, use the URL if provided
else if (element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"]) {
  css += `  background-image: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"]}") !important;\n`;
  css += `  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"} !important;\n`;
}

css += `
  background-size: ${element.properties["Background Size"] ?? "cover"} !important;
  background-repeat: ${element.properties["Background Repeat"] ?? "no-repeat"} !important;
  background-position: ${element.properties["Background Position"] ?? "center center"} !important;
  background-attachment: ${element.properties["Background Attachment"] ?? "fixed"} !important;
}
.sk_header {
  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"}!important;
`
// Check if we have an uploaded image first
if (uploadedImage) {
  css += `  background-image: url("${uploadedImage}") !important;\n`;
  css += `  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"} !important;\n`;
}
// If no uploaded image, use the URL if provided
else if (element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"]) {
  css += `  background-image: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"]}") !important;\n`;
  css += `  background-color: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"} !important;\n`;
}

css += `
  background-size: ${element.properties["Background Size"] ?? "cover"} !important;
  background-repeat: ${element.properties["Background Repeat"] ?? "no-repeat"} !important;
  background-position: ${element.properties["Background Position"] ?? "center center"} !important;
  background-attachment: ${element.properties["Background Attachment"] ?? "fixed"} !important;
}
`
} //end backimg-setting
      if (element.id == "school-name-and-motto") {
          css += `
/* BetterKMR Compiled: School Name & Motto */
.sk_school_name {
  color: ${applyAlphaToColor(element.properties["Name Colour"]) ?? "#f7f7f7"}!important;
  ${element.properties["Text Shadow"] === true ?? element.properties["Name Shadow Colour"] ? `text-shadow: ${applyAlphaToColor(element.properties["Name Shadow Colour"])} ${element.properties["Text Shadow Offset X"]}px ${element.properties["Text Shadow Offset Y"]}px;` : ""}
}
.sk_school_subheading {
  color: ${applyAlphaToColor(element.properties["Motto Colour"]) ?? "#f7f7f7"}!important;
  ${element.properties["Text Shadow"] === true ?? element.properties["Motto Shadow Colour"] ? `text-shadow: ${applyAlphaToColor(element.properties["Motto Shadow Colour"])} ${element.properties["Text Shadow Offset X"]}px ${element.properties["Text Shadow Offset Y"]}px;` : ""}
}
    `
      }
      if (element.id == "today-attendance-highlight") {
          const highlightColorObj = element.properties["Highlight (Background) Colour"];
          const highlightColor = applyAlphaToColor(highlightColorObj);

          css += `
/* BetterKMR Compiled: Today's Attendance Highlight */
.is-today {
  background-color: ${highlightColor}!important;
}
    `
      }
      if (element.id == "justified-gradients") {
          // Get each gradient property and create the CSS
          const presentGradient = element.properties["Present Colour"];
          const lateGradient = element.properties["Late Colour"];
          const unjustifiedGradient = element.properties["Unjustified Colour"];
          const justifiedGradient = element.properties["Justified Colour"];

          // Create CSS for each gradient
          css += `
/* BetterKMR Compiled: Attendance Gradients */
.btn-success {
  background: ${processGradient(presentGradient)}!important;
  color: ${applyAlphaToColor(element.properties["Text Colour (Present)"]) ?? "#ffffff"}!important;
}
.btn-info {
  background: ${processGradient(lateGradient)}!important;
  color: ${applyAlphaToColor(element.properties["Text Colour (Late)"]) ?? "#ffffff"}!important;
}
.btn-danger {
  background: ${processGradient(unjustifiedGradient)}!important;
  color: ${applyAlphaToColor(element.properties["Text Colour (Unjustified)"]) ?? "#ffffff"}!important;
}
.btn-warning {
  background: ${processGradient(justifiedGradient)}!important;
  color: ${applyAlphaToColor(element.properties["Text Colour (Justified)"]) ?? "#ffffff"}!important;
}
    `
      }
      if (element.id == "navbar-colours") {
          css += `
/* BetterKMR Compiled: Navbar Colours */
body .sk_nav {
  background: ${applyAlphaToColor(element.properties["Background Colour"]) ?? "#000000"}!important;
  color: ${applyAlphaToColor(element.properties["Text Colour"]) ?? "#ffffff"}!important;
  ${element.properties["Box Shadow"] === true ? `box-shadow: ${applyAlphaToColor(element.properties["Box Shadow Colour"])} ${element.properties["Box Shadow Offset X"]}px ${element.properties["Box Shadow Offset Y"]}px;` : ""}
}
body .sk_nav_text {
  color: ${applyAlphaToColor(element.properties["Text Colour"]) ?? "#ffffff"}!important;
}
`
          if (element.properties["Active Text Colour"] != "") {
              css += `
body .nav-item.active .sk_nav_text {
  color: ${applyAlphaToColor(element.properties["Active Text Colour"]) ?? "#63c9ff"}!important;
}`
          }
          if (element.properties["Active Hover Text Colour"] != "") {
              css += `
body .sk_nav_text.nav-link.nav-link:hover {
  color: ${applyAlphaToColor(element.properties["Active Hover Text Colour"]) ?? "#8fd8ff"}!important;
}
`
          }
      }
      if (element.id == "font-family") {
          var fontName = "Inter";
          if (element.properties["Use custom font from Google Fonts"] == true) {
              fontName = element.properties["Custom Google Font Name"].trim();
css = `/* BetterKMR Compiled: Font Family (set to top) */
@import url('https://fonts.googleapis.com/css2?family=${fontName}&display=swap');
body {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["Font Weight (100-900) (thin-black)"] ?? "400"} !important;
}
` + css;
          } else {
              css = `
body {
font-family: "${element.properties["Preset Font Family"]}", sans-serif !important;
}
` + css;
          }
          if (element.properties["Include School Name & Motto"] == true) {
            css += `
body .sk_school_name {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["Font Weight (100-900) (thin-black)"] ?? "400"} !important;
}

body .sk_school_subheading {
  font-family: "${fontName}", sans-serif !important;
  font-weight: ${element.properties["Font Weight (100-900) (thin-black)"] ?? "400"} !important;
}
`;
          }
      }
      if (element.id == "main-colour-schemes") {
        if (element.properties["Main Content Box"] == true) {
          css += `
/* BetterKMR Compiled: Main Colour Schemes */
body .sk_text.sk_page.sk-main-content {
  background: ${applyAlphaToColor(element.properties["Main Content Box Background Colour (sk_main_content)"]) ?? "#000000"}!important;
  color: ${applyAlphaToColor(element.properties["Main Content Box Text Colour (sk_main_content)"]) ?? "#ffffff"}!important;
}
body .d-flex {
  color: ${applyAlphaToColor(element.properties["Main Content Box Text Colour (sk_main_content)"]) ?? "#ffffff"}!important;
}
body .sk_table {
  color: ${applyAlphaToColor(element.properties["Main Content Box Text Colour (sk_main_content)"]) ?? "#ffffff"}!important;
}
`

if (element.properties["Button Hover & Active Background Colour (sk_btn.active, sk_btn:hover)"] != "") {
css += `
/* BetterKMR Compiled: Button Hover & Active Background Colour */
body .sk_btn.active, body .sk_btn:hover {
  background-color: ${applyAlphaToColor(element.properties["Button Hover & Active Background Colour (sk_btn.active, sk_btn:hover)"]) ?? "#000000"}!important;
  color: ${applyAlphaToColor(element.properties["Button Hover & Active Text Colour (sk_btn.active, sk_btn:hover)"]) ?? "#ffffff"}!important;
}
`
}
        }
        if (element.properties["Table Colour Scheming"] == true) {
          css += `
/* BetterKMR Compiled: Table Colour Scheming */
body .sk_thead_cell, body .sk_thead th {
  background-color: ${applyAlphaToColor(element.properties["Table Border Colour (sk_border, sk_thead_cell)"]) ?? "#000000"}!important;
}
body .sk_border, body .sk_thead_cell, body .table td, body .table th {
  border-color: ${applyAlphaToColor(element.properties["Table Border Colour (sk_border, sk_thead_cell)"]) ?? "#000000"}!important;
}
`
        }
        if (element.properties["Generic"] == true) {
          css += `
/* BetterKMR Compiled: Generic */
.sk_btn {
  background-color: ${applyAlphaToColor(element.properties["Button Colour (sk_btn)"]) ?? "#000000"}!important;
  color: ${applyAlphaToColor(element.properties["Button Text Colour (sk_btn)"]) ?? "#ffffff"}!important;
}
`
        }
      }
      if (element.properties["Button Hover & Active Border Colour (sk_btn.active, sk_btn:hover)"] != "") {
        css += `
/* BetterKMR Compiled: Button Hover & Active Border Colour */
body .sk_btn:hover, body .sk_btn.active {
  border-color: ${applyAlphaToColor(element.properties["Button Hover & Active Border Colour (sk_btn.active, sk_btn:hover)"]) ?? "#ffffff"}!important;
}
`
      }
      if (element.properties["Navbar/Card Background Colour (card-body)"] != "") {
        css += `
/* BetterKMR Compiled: Navbar/Card Background Colour */
body .card-body {
  background-color: ${applyAlphaToColor(element.properties["Navbar/Card Background Colour (card-body)"]) ?? "#ffffff"}!important;
}
`
      }
      if (element.properties["Button Border Colour (sk_btn)"] != "") {
        css += `
/* BetterKMR Compiled: Button Border Colour (sk_btn) */
body .sk_btn {
  border-color: ${applyAlphaToColor(element.properties["Button Border Colour (sk_btn)"]) ?? "#ffffff"}!important;
}
`
      }
      if (element.properties["Link Text Colour (a)"] != "") {
        css += `
/* BetterKMR Compiled: Link Text Colour (a) */
a {
  color: ${applyAlphaToColor(element.properties["Link Text Colour (a)"]) ?? "#ffffff"}!important;
}
`
      }
      if (element.id == "additional-css-properties") {
        css += `
${element.properties["CSS Properties"]}
`
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
  
  // Normal hex without alpha
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Update the color input with alpha
function setupColorWithAlpha(colorInput, hexDisplay, alphaToggleBtn) {
  if (!colorInput || !hexDisplay || !alphaToggleBtn) return;
  
  let hasAlpha = false;
  
  colorInput.addEventListener('input', (e) => {
    const hex = e.target.value;
    const alpha = parseFloat(colorInput.dataset.alpha) || 1.0;
    
    // Always store the original hex in a data attribute
    colorInput.dataset.originalHex = hex;
    
    if (hasAlpha) {
      // Display the hex with alpha for user feedback
      // But store the original hex and alpha separately
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
      // Create alpha slider
      const alphaContainer = document.createElement('div');
      alphaContainer.className = 'alpha-slider-container';
      alphaContainer.innerHTML = `
        <input type="range" class="alpha-slider" min="0" max="100" value="100" id="${colorInput.id}-alpha-slider">
        <span class="alpha-value">100%</span>
      `;
      hexDisplay.parentNode.insertBefore(alphaContainer, alphaToggleBtn);
      
      const alphaSlider = alphaContainer.querySelector('.alpha-slider');
      const alphaValue = alphaContainer.querySelector('.alpha-value');
      
      alphaSlider.addEventListener('input', (e) => {
        const alphaPercent = parseInt(e.target.value);
        const alphaDecimal = alphaPercent / 100;
        alphaValue.textContent = `${alphaPercent}%`;
        colorInput.dataset.alpha = alphaDecimal;
        
        // Store original hex and alpha separately
        const hex = colorInput.dataset.originalHex || colorInput.value;
        
        // Display the hex with alpha for user feedback
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const hexWithAlpha = rgbaToHex(r, g, b, alphaDecimal);
        hexDisplay.textContent = hexWithAlpha;
      });
    } else {
      alphaToggleBtn.textContent = "Add Transparency";
      // Remove alpha slider
      const alphaContainer = colorInput.parentNode.parentNode.querySelector('.alpha-slider-container');
      if (alphaContainer) {
        alphaContainer.remove();
      }
      
      // Reset to hex without alpha
      const hex = colorInput.value;
      hexDisplay.textContent = hex;
      colorInput.dataset.alpha = "1.0";
    }
  });
}

// Helper function to create gradient CSS from property
function createGradientFromProperty(gradientProp) {
  if (typeof gradientProp === 'object') {
    return createGradient(gradientProp.start, gradientProp.end, gradientProp.direction);
  } else {
    // For backward compatibility or if only a single color is provided
    return gradientProp;
  }
}

// Add this to create CSS gradients
function createGradient(color1, color2, direction = 'to bottom') {
  // Check if colors have alpha channel (#RRGGBBAA format)
  const color1WithAlpha = color1.length === 9 ? hexToRgba(color1) : color1;
  const color2WithAlpha = color2.length === 9 ? hexToRgba(color2) : color2;
  
  return `linear-gradient(${direction}, ${color1WithAlpha}, ${color2WithAlpha})`;
}

// Add CSS for new UI elements
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
    background: #333;
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

// Append the additional styles to your existing styleElement
document.addEventListener('DOMContentLoaded', function() {
  const styleElement = document.createElement('style');
  styleElement.textContent = additionalStyles;
  document.head.appendChild(styleElement);
});

// Convert rgb/rgba to hex with alpha
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

// Add helper function to extract alpha value from hex color
function getAlphaFromHex(hexColor) {
  if (hexColor && hexColor.length === 9) {
    const alphaHex = hexColor.substring(7, 9);
    return parseInt(alphaHex, 16) / 255;
  }
  return 1; // Default to fully opaque
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
  // Refresh image previews after a brief delay to ensure DOM is ready
  setTimeout(updateImagePreviews, 100);
  
  // Any other initialization needed after loading
  console.log('Theme loaded successfully with', elements.length, 'elements');
}

function postLoad(elements) {
  // Refresh image previews after a brief delay to ensure DOM is ready
  setTimeout(updateImagePreviews, 100);
  
  // Any other initialization needed after loading
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

    window.createDialog = function({title, content, buttons = []}) {
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

      buttons.forEach(({text, callback, classname}) => {
        const button = document.createElement('button');
        button.className = classname || 'dialog-button';
        button.textContent = text;
        button.onclick = () => {
          callback?.();
          document.body.removeChild(overlay);
        };
        buttonContainer.appendChild(button);
      });

      dialog.append(titleElement, contentElement, buttonContainer);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
    }

// Replace the existing export button event listener with this:

document.getElementById("export-button").addEventListener('click', () => {
  createDialog({
    title: 'Import/Export (Experimental)',
    content: `What would you like to do?<br><br>Importing from File means you can upload a theme file to import settings.<br>Exporting to File will download a theme file with your current settings.<br>Exporting to CSS will download a CSS file with your current settings.<br><br>You may need to save your theme before continuing.<br>At the moment, themes are version dependent.`,
    buttons: [
      {
        text: 'Import from File',
        callback: () => {
          // Create hidden file input
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
                
                // Validate theme data
                if (!themeData.name || !themeData.elements) {
                  throw new Error('Invalid theme file format');
                }
                
                // Clear existing elements
                const container = document.getElementById('added-elements-container');
                container.innerHTML = '';
                addedElements = [];
                
                // Set theme name
                document.getElementById('theme-name').value = themeData.name;
                
                // Load elements
                themeData.elements.forEach(element => {
                  const elementTemplate = availableElements.find(temp => temp.id === element.id);
                  if (elementTemplate) {
                    addElement(elementTemplate);
                    
                    // Set properties
                    if (element.properties) {
                      Object.entries(element.properties).forEach(([propName, propValue]) => {
                        const property = elementTemplate.properties.find(p => p.name === propName);
                        if (property) {
                          const propId = `${element.id}-${propName.replace(/\s+/g, '-')}`;
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
                
                // Trigger post-load updates
                postLoad(themeData.elements);
                createNotification("Theme imported successfully!", "#3c8443", "#ffffff");
                
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
            createNotification("Please enter a theme name before continuing.", "#961a1a", "#ffffff");
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
                
                if (property.type === 'image-upload') {
                  const dataInput = document.getElementById(`${propId}-data`);
                  if (dataInput) {
                    elementData.properties[property.name] = dataInput.value;
                  }
                } else if (property.type === 'toggle' || property.type === 'checkbox') {
                  const input = document.getElementById(propId);
                  if (input) {
                    elementData.properties[property.name] = input.checked;
                  }
                } else {
                  const input = document.getElementById(propId);
                  if (input) {
                    elementData.properties[property.name] = input.value;
                  }
                }
              });
              
              theme.elements.push(elementData);
            });
            
            // Create and download file
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