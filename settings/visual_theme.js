      // Define available elements
      const availableElements = [
        {
          id: "backimg-setting",
          name: "Change Background",
          description: "Changes the background of Kamar (solid colour, image)",
          properties: [
            { name: "Background Image URL (empty if none, replaces Background Colour if set)", type: "text", default: "https://placehold.co/1920x1080" },
            { name: "Background Colour", type: "color", default: "#000000" },
            { name: "If you don't know what the below dropdowns do, it's best to leave them.", type: "tooltip" },
            { name: "Background Size", type: "color", default: "#333333" },
            { name: "Background Repeat", type: "color", default: "#333333" },
            { name: "Background Position", type: "color", default: "#333333" },
            { name: "Background Attachment", type: "color", default: "#333333" },
          ]
        },
        {
          id: "attendance-highlight",
          name: "Today's Attendance Highlight",
          description: "Highlight attendance status on dashboard",
          properties: [
            { name: "color", type: "color", default: "#4CAF50" }
          ]
        },
        {
          id: "upcoming-events",
          name: "Upcoming Events Widget",
          description: "Display upcoming school events in sidebar",
          properties: [
            { name: "background-color", type: "color", default: "#333333" },
            { name: "text-color", type: "color", default: "#ffffff" }
          ]
        },
        {
          id: "custom-header",
          name: "Custom Header",
          description: "Personalized header with custom styling",
          properties: [
            { name: "background-color", type: "color", default: "#1e1e1e" },
            { name: "text-color", type: "color", default: "#ffffff" },
            { name: "height", type: "number", default: 60, unit: "px" }
          ]
        },
        {
          id: "navbar-styling",
          name: "Navigation Bar Styling",
          description: "Custom styling for the main navigation bar",
          properties: [
            { name: "background-color", type: "color", default: "#222222" },
            { name: "text-color", type: "color", default: "#ffffff" },
            { name: "active-color", type: "color", default: "#2979ff" }
          ]
        },
        {
          id: "timetable-highlight",
          name: "Current Period Highlight",
          description: "Highlight the current period in timetable view",
          properties: [
            { name: "color", type: "color", default: "#ff5722" }
          ]
        }
      ];
      
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
          if (property.type === 'color') {
            const propId = `${element.id}-${property.name}`;
            elementContent += `
              <div class="added-element-property">
                <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
                <div class="color-picker-container">
                  <div class="color-picker">
                    <input type="color" id="${propId}" value="${property.default}">
                  </div>
                  <span id="${propId}-hex" class="color-hex-value">${property.default}</span>
                </div>
              </div>
            `;
          } else if (property.type === 'number') {
            const propId = `${element.id}-${property.name}`;
            elementContent += `
              <div class="added-element-property">
                <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
                <input type="number" id="${propId}" class="text-input" value="${property.default}" min="0" max="1000">
                <span>${property.unit || ''}</span>
              </div>
            `;
          } else if (property.type === 'text') {
            const propId = `${element.id}-${property.name}`;
            elementContent += `
              <div class="added-element-property">
                <label class="setting-label" for="${propId}">${formatPropertyName(property.name)}:</label>
                <input type="text" id="${propId}" class="text-input" value="${property.default}">
                <span>${property.unit || ''}</span>
              </div>
            `;
          } else if (property.type === 'tooltip') {
            const propId = `${element.id}-${property.name}`;
            elementContent += `
              <p style="color: grey; margin-bottom: 10px; font-size: 15px;" for=${propId}>${property.name}</p>
            `;
          }
        });
        
        elementContent += `</div>`;
        addedElement.innerHTML = elementContent;
        
        // Add to container
        document.getElementById('added-elements-container').appendChild(addedElement);
        
        // Setup color pickers
        element.properties.forEach(property => {
          if (property.type === 'color') {
            const propId = `${element.id}-${property.name}`;
            const colorInput = document.getElementById(propId);
            const hexDisplay = document.getElementById(`${propId}-hex`);
            
            colorInput.addEventListener('input', (e) => {
              hexDisplay.textContent = e.target.value;
            });
          }
        });
        
        // Setup remove button
        const removeButton = addedElement.querySelector('.added-element-remove');
        removeButton.addEventListener('click', () => removeElement(element.id));
      }
      
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
          customCSS: document.getElementById('custom-css').value,
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
            const propElement = document.getElementById(propId);
            if (propElement) {
              elementData.properties[property.name] = propElement.value;
            }
          });
          
          theme.elements.push(elementData);
        });
        
        // Here you would save the theme to storage
        console.log('Theme saved:', theme);
        alert('Theme saved successfully!');
        postSave(theme.elements);
      }

      function postSave(elements) {
        for (i in elements) {
          var element = elements[i]
          if (element.id == "backimg-setting") {
            document.getElementById("custom-css").textContent = "";
            console.log(element);
            console.log(element.properties);
            document.getElementById("custom-css").textContent += `
/* Auto generated by BetterKMR "backimg-setting" Please do not touch unless you know what you're doing */
.sk_page {
    background-color: ${element.properties["Background Colour"] ?? "#000000"}!important;
    background: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set)"]}") #1C1C1C top fixed no-repeat !important;
    background-size:     cover !important;                      /* <------ */
    background-repeat:   no-repeat !important;
    background-position: center center !important;              /* optional, center the image */
    background-attachment: fixed !important;
}
.sk_header {
    background-color: ${element.properties["Background Colour"] ?? "#000000"}!important;
    background: url("${element.properties["Background Image URL (empty if none, replaces Background Colour if set)"]}") #1C1C1C top fixed no-repeat !important;
    background-size:     cover !important;                      /* <------ */
    background-repeat:   no-repeat !important;
    background-position: center center !important;              /* optional, center the image */
    background-attachment: fixed !important;
}
/* End auto generation for "backimg-setting" */
              `
          }
        }
      }