/* This is a huge amount of code.
   It's clear I haven't been able to write this as one person with little free time.
   Powered by Claude 3.7 Sonnet.
   Developing this much code by myself would be a total nightmare.
   So no, I didn't make a lot of this, only some.
   But I guess I still "maintain" it?
*/
      
      const availableElements = [
        { // moved from below navbar colours
          id: "font-family",
          name: "Font Family",
          description: "Change the font family of the Kamar website",
          properties: [
            { name: "Preset Font Family", type: "dropdown", default: "Inter", options: ["Inter", "Arial", "Times New Roman", "Courier New"] },
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
            { name: "Table Colour Scheming", type: "toggle", default: false, controlsVisibility: ["Table Header Colour (sk_thead_cell)", "Table Border Colour (sk_border)" ]},
            { name: "Table Header Colour (sk_thead_cell)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
            { name: "Table Border Colour (sk_border)", type: "color", default: "#000000", visibleWhen: "Table Colour Scheming" },
            { name: "Generic", type: "toggle", default: false, controlsVisibility: ["Button Colour (sk_btn)", "Button Text Colour (sk_btn)"]},
            { name: "Button Colour (sk_btn)", type: "color", default: "#000000", visibleWhen: "Generic" },
            { name: "Button Text Colour (sk_btn)", type: "color", default: "#ffffff", visibleWhen: "Generic" },
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
      
      // Tab switching functionality
      const tabs = document.querySelectorAll('.tab-item');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
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
          const propId = `${element.id}-${property.name}`;
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
          const propId = `${element.id}-${property.name}`;
          
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
                preview.style.display = 'block';
                dropArea.style.display = 'none';
                updateImageInfo(dataInput.value, infoDisplay);
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
                // Find the upload control this button is associated with
                const uploadControlName = property.visibleWhen;
                const uploadPropId = `${element.id}-${uploadControlName}`;
                const dataInput = document.getElementById(`${uploadPropId}-data`);
                const preview = document.getElementById(`${uploadPropId}-preview`);
                const dropArea = document.getElementById(`${uploadPropId}-drop-area`);
                
                if (dataInput && preview && dropArea) {
                  // Clear the data
                  dataInput.value = '';
                  // Hide preview, show drop area
                  preview.style.display = 'none';
                  dropArea.style.display = 'block';
                  // Hide this button
                  deleteBtn.parentElement.style.display = 'none';
                }
              });
            }
          }
        });
        
        // Setup remove button
        const removeButton = addedElement.querySelector('.added-element-remove');
        removeButton.addEventListener('click', () => removeElement(element.id));
      }
      
      function handleImageUpload(file, dataInput, previewImg, preview, dropArea, infoDisplay) {
        if (!file.type.match('image.*')) {
          alert('Please select an image file');
          return;
        }
        
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image is too large. Please select an image under 5MB.');
          return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const base64data = e.target.result;
          dataInput.value = base64data;
          previewImg.src = base64data;
          preview.style.display = 'block';
          dropArea.style.display = 'none';
          
          // Update image info
          updateImageInfo(base64data, infoDisplay);
          
          // Trigger change event on dataInput to update visibility of controlled elements
          dataInput.dispatchEvent(new Event('change'));
          
          // Update the attribute to trigger MutationObserver
          dataInput.setAttribute('data-has-image', 'true');
        };
        
        reader.readAsDataURL(file);
      }
      
      // Add function to update image info display
      function updateImageInfo(base64data, infoDisplay) {
        // Calculate approximate size
        const approxSize = Math.round((base64data.length * 3) / 4);
        let sizeDisplay = '';
        
        if (approxSize > 1024 * 1024) {
          sizeDisplay = `${(approxSize / (1024 * 1024)).toFixed(2)} MB`;
        } else {
          sizeDisplay = `${(approxSize / 1024).toFixed(2)} KB`;
        }
        
        // Create a temporary image to get dimensions
        const img = new Image();
        img.onload = () => {
          infoDisplay.textContent = `${img.width} × ${img.height} (${sizeDisplay})`;
        };
        img.src = base64data;
      }

      function toggleVisibilityBasedOnValue(elementId, controlName, hasValue) {
        const element = document.querySelector(`.added-element[data-element-id="${elementId}"]`);
        if (!element) return;
        
        // Find all properties that should be visible when this control has a value
        const controlProperties = element.querySelectorAll(`[data-visible-when="${controlName}"]`);
        controlProperties.forEach(prop => {
          prop.style.display = hasValue ? 'inline-block' : 'none';
        });
      }

      // Function to toggle visibility of elements based on toggle state
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
      
      // Custom font functionality
      document.getElementById('font-family').addEventListener('change', function() {
        const customFontContainer = document.getElementById('custom-font-container');
        if (this.value === 'custom') {
          customFontContainer.style.display = 'block';
        } else {
          customFontContainer.style.display = 'none';
        }
      });
      
      // Update color hex values when colors change
      document.getElementById('background-color').addEventListener('input', function(e) {
        document.getElementById('bg-color-hex').textContent = e.target.value;
      });
      
      document.getElementById('text-color').addEventListener('input', function(e) {
        document.getElementById('text-color-hex').textContent = e.target.value;
      });
      
      document.getElementById('accent-color').addEventListener('input', function(e) {
        document.getElementById('accent-color-hex').textContent = e.target.value;
      });
      
      document.getElementById('header-color').addEventListener('input', function(e) {
        document.getElementById('header-color-hex').textContent = e.target.value;
      });
      
      // Save theme functionality
      document.getElementById('save-button').addEventListener('click', saveTheme);
      
      function saveTheme() {
        // Collect basic theme information
        const theme = {
          name: document.getElementById('theme-name').value,
          enableTransitions: document.getElementById('enable-transitions').checked,
          themeType: document.getElementById('theme-type').value,
          backgroundImage: document.getElementById('background-image').value,
          backgroundFixed: document.getElementById('bg-fixed').checked,
          fontFamily: document.getElementById('font-family').value === 'custom' ? 
                     document.getElementById('custom-font').value : 
                     document.getElementById('font-family').value,
          backgroundColor: document.getElementById('background-color').value,
          textColor: document.getElementById('text-color').value,
          accentColor: document.getElementById('accent-color').value,
          headerColor: document.getElementById('header-color').value,
          customCSS: document.getElementById('editor').value,
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
            const propId = `${element.id}-${property.name}`;
            
            if (property.type === 'color') {
              const hexDisplay = document.getElementById(`${propId}-hex`);
              if (hexDisplay) {
                elementData.properties[property.name] = hexDisplay.textContent;
              }
            } else if (property.type === 'gradient') {
              const startHex = document.getElementById(`${propId}-start-hex`);
              const endHex = document.getElementById(`${propId}-end-hex`);
              const direction = document.getElementById(`${propId}-direction`);
              
              if (startHex && endHex && direction) {
                elementData.properties[property.name] = {
                  start: startHex.textContent,
                  end: endHex.textContent,
                  direction: direction.value
                };
              }
            } else if (property.type === 'image-upload') {
              const dataInput = document.getElementById(`${propId}-data`);
              if (dataInput) {
                elementData.properties[property.name] = dataInput.value;
              }
            } else if (property.type !== 'button') { // Skip button properties when saving
              const propElement = document.getElementById(propId);
              if (propElement) {
                elementData.properties[property.name] = propElement.type === 'checkbox' ? 
                                                        propElement.checked : 
                                                        propElement.value;
              }
            } else {
              const propElement = document.getElementById(propId);
              if (propElement) {
                elementData.properties[property.name] = propElement.value;
              }
            }
          });
          
          theme.elements.push(elementData);
        });
        
        // For the custom CSS, make sure you're getting the value from CodeMirror
        cssEditor.save(); // This updates the value of the textarea
        theme.customCSS = document.getElementById('editor').value;
        
        // Here you would save the theme to storage
        console.log('Theme saved:', theme);
        alert('Theme saved successfully!');
        postSave(theme.elements);
      }

      function postSave(elements) {
        let css = '';

        for (i in elements) {
            var element = elements[i];

            // Handle elements based on their ID
            // Handle elements based on their ID
            if (element.id == "backimg-setting") {
                cssEditor.setValue("");
                console.log(element);
                console.log(element.properties);
                css += `
.sk_page {
  background-color: ${element.properties["Background Colour"] ?? "#000000"}!important;
`
                // Check if we have an uploaded image first
                const uploadedImage = element.properties["Or Upload Background Image"];
                if (uploadedImage) {
                    css += `  background: url("${uploadedImage}") ${element.properties["Background Colour"] ?? "#000000"} top fixed no-repeat !important;\n`;
                }
                // If no uploaded image, use the URL if provided
                else if (element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"] != "") {
                    css += `  background: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"] ?? ""}") ${element.properties["Background Colour"] ?? "#000000"} top fixed no-repeat !important;\n`;
                }

                css += `
  background-size: ${element.properties["Background Size"] ?? "cover"} !important;
  background-repeat: ${element.properties["Background Repeat"] ?? "no-repeat"} !important;
  background-position: ${element.properties["Background Position"] ?? "center center"} !important;
  background-attachment: ${element.properties["Background Attachment"] ?? "fixed"} !important;
}
.sk_header {
  background-color: ${element.properties["Background Colour"] ?? "#000000"}!important;
`
                // Check if we have an uploaded image first
                if (uploadedImage) {
                    css += `  background: url("${uploadedImage}") ${element.properties["Background Colour"] ?? "#000000"} top fixed no-repeat !important;\n`;
                }
                // If no uploaded image, use the URL if provided
                else if (element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"] != "") {
                    css += `  background: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set) e.g. https://placehold.co/1920x1080.jpg"] ?? ""}") ${element.properties["Background Colour"] ?? "#000000"} top fixed no-repeat !important;\n`;
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
.sk_school_name {
  color: ${element.properties["Name Colour"] ?? "#f7f7f7"}!important;
  ${element.properties["Text Shadow"] === true ?? element.properties["Name Shadow Colour"] ? `text-shadow: ${element.properties["Name Shadow Colour"]} ${element.properties["Text Shadow Offset X"]}px ${element.properties["Text Shadow Offset Y"]}px;` : ""}
}
.sk_school_subheading {
  color: ${element.properties["Motto Colour"] ?? "#f7f7f7"}!important;
  ${element.properties["Text Shadow"] === true ?? element.properties["Motto Shadow Colour"] ? `text-shadow: ${element.properties["Motto Shadow Colour"]} ${element.properties["Text Shadow Offset X"]}px ${element.properties["Text Shadow Offset Y"]}px;` : ""}
}
          `
            }
            if (element.id == "today-attendance-highlight") {
                const highlightColor = element.properties["Highlight (Background) Colour"];
                // Check if color has alpha
                const colorValue = highlightColor.length === 9 ?
                    hexToRgba(highlightColor) :
                    highlightColor;

                css += `
.is-today {
  background-color: ${colorValue}!important;
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
.btn-success {
  background: ${createGradientFromProperty(presentGradient)}!important;
  color: ${element.properties["Text Colour (Present)"] ?? "#ffffff"}!important;
}
.btn-info {
  background: ${createGradientFromProperty(lateGradient)}!important;
  color: ${element.properties["Text Colour (Late)"] ?? "#ffffff"}!important;
}
.btn-danger {
  background: ${createGradientFromProperty(unjustifiedGradient)}!important;
  color: ${element.properties["Text Colour (Unjustified)"] ?? "#ffffff"}!important;
}
.btn-warning {
  background: ${createGradientFromProperty(justifiedGradient)}!important;
  color: ${element.properties["Text Colour (Justified)"] ?? "#ffffff"}!important;
}
          `
            }
            if (element.id == "navbar-colours") {
                css += `
body .sk_nav {
  background: ${element.properties["Background Colour"] ?? "#000000"}!important;
  color: ${element.properties["Text Colour"] ?? "#ffffff"}!important;
  ${element.properties["Box Shadow"] === true ? `box-shadow: ${element.properties["Box Shadow Colour"]} ${element.properties["Box Shadow Offset X"]}px ${element.properties["Box Shadow Offset Y"]}px;` : ""}
}`
                if (element.properties["Active Text Colour"] != "") {
                    css += `
body .nav-item.active .sk_nav_text {
  color: ${element.properties["Active Text Colour"] ?? "#63c9ff"}!important;
}`
                }
                if (element.properties["Active Hover Text Colour"] != "") {
                    css += `
body .sk_nav_text.nav-link.nav-link:hover {
  color: ${element.properties["Active Hover Text Colour"] ?? "#8fd8ff"}!important;
}
`
                }
            }
            if (element.id == "font-family") {
                var fontName = "Inter";
                if (element.properties["Use custom font from Google Fonts"] == true) {
                    fontName = element.properties["Custom Google Font Name"].trim();
css = `@import url('https://fonts.googleapis.com/css2?family=${fontName}&display=swap');
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
            }
            if (element.id == "main-colour-schemes") {
              if (element.properties["Main Content Box"] == true) {
                css += `
.sk-main-content {
  background-color: ${element.properties["Main Content Box Background Colour (sk_main_content)"] ?? "#000000"}!important;
  color: ${element.properties["Main Content Box Text Colour (sk_main_content)"] ?? "#ffffff"}!important;
}
`
              }
              if (element.properties["Table Colour Scheming"] == true) {
                css += `
.sk_thead_cell {
  background-color: ${element.properties["Table Header Colour (sk_thead_cell)"] ?? "#000000"}!important;
}
.sk_border {
  border-color: ${element.properties["Table Border Colour (sk_border)"] ?? "#000000"}!important;
}
`
              }
              if (element.properties["Generic"] == true) {
                css += `
.sk_btn {
  background-color: ${element.properties["Button Colour (sk_btn)"] ?? "#000000"}!important;
  color: ${element.properties["Button Text Colour (sk_btn)"] ?? "#ffffff"}!important;
}
`
              }
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

        // Refresh the editor to properly render
        cssEditor.refresh();
        
        // Update the theme.customCSS when saving
        document.getElementById('save-button').addEventListener('click', function() {
          // Make sure to update the textarea with the editor content before saving
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

      // Add this helper function to convert hex to rgba
      function hexToRgba(hex, alpha = 1) {
        if (!hex) return '';
        
        // Check if hex already includes alpha channel
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

      // Update the color input with alpha
      function setupColorWithAlpha(colorInput, hexDisplay, alphaToggleBtn) {
        if (!colorInput || !hexDisplay || !alphaToggleBtn) return;
        
        let hasAlpha = false;
        
        colorInput.addEventListener('input', (e) => {
          const hex = e.target.value;
          const alpha = parseFloat(colorInput.dataset.alpha) || 1.0;
          
          if (hasAlpha) {
            // Extract RGB from the hex color
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            // Create new hex with alpha
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
              
              // Update hex display with alpha
              const hex = colorInput.value;
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