document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const themeForm = document.getElementById('themeForm');
    const themeNameInput = document.getElementById('themeName');
    const backgroundColorInput = document.getElementById('backgroundColor');
    const backgroundColorText = document.getElementById('backgroundColorText');
    const backgroundImageInput = document.getElementById('backgroundImage');
    const headerColorInput = document.getElementById('headerColor');
    const headerColorText = document.getElementById('headerColorText');
    const todayHighlightInput = document.getElementById('todayHighlight');
    const todayHighlightText = document.getElementById('todayHighlightText');
    const textColorInput = document.getElementById('textColor');
    const textColorText = document.getElementById('textColorText');
    const previewArea = document.getElementById('previewArea');
    const themesListContainer = document.getElementById('themesList');
    const resetFormButton = document.getElementById('resetForm');
    const advancedToggle = document.getElementById('advancedToggle');
    const advancedSection = document.getElementById('advancedSection');
    const cssEditor = document.getElementById('cssEditor');
    const updateFromCSSButton = document.getElementById('updateFromCSS');
    
    // Current theme being edited
    let currentThemeId = null;
    
    // Generate a UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Update color text inputs when color pickers change
    backgroundColorInput.addEventListener('input', function() {
        backgroundColorText.value = this.value;
        updatePreview();
        updateCSSEditor();
    });
    
    headerColorInput.addEventListener('input', function() {
        headerColorText.value = this.value;
        updatePreview();
        updateCSSEditor();
    });
    
    todayHighlightInput.addEventListener('input', function() {
        todayHighlightText.value = this.value;
        updatePreview();
        updateCSSEditor();
    });
    
    textColorInput.addEventListener('input', function() {
        textColorText.value = this.value;
        updatePreview();
        updateCSSEditor();
    });
    
    // Update color pickers when text inputs change
    backgroundColorText.addEventListener('input', function() {
        if (isValidColor(this.value)) {
            backgroundColorInput.value = convertToHex(this.value);
            updatePreview();
            updateCSSEditor();
        }
    });
    
    headerColorText.addEventListener('input', function() {
        if (isValidColor(this.value)) {
            headerColorInput.value = convertToHex(this.value);
            updatePreview();
            updateCSSEditor();
        }
    });
    
    todayHighlightText.addEventListener('input', function() {
        // Allow rgba values for this field
        updatePreview();
        updateCSSEditor();
    });
    
    textColorText.addEventListener('input', function() {
        if (isValidColor(this.value)) {
            textColorInput.value = convertToHex(this.value);
            updatePreview();
            updateCSSEditor();
        }
    });
    
    // Background image input changes
    backgroundImageInput.addEventListener('input', function() {
        updatePreview();
        updateCSSEditor();
    });
    
    // Theme name changes
    themeNameInput.addEventListener('input', updateCSSEditor);
    
    // Check if a string is a valid color
    function isValidColor(color) {
        // Simple check for hex color
        return /^#([0-9A-F]{3}){1,2}$/i.test(color) || 
               /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(color) ||
               /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/i.test(color);
    }
    
    // Convert rgb/rgba to hex if possible
    function convertToHex(color) {
        // If already hex, return as is
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            return color;
        }
        
        // Try to convert RGB to hex
        const rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (rgbMatch) {
            return '#' + 
                ((1 << 24) + (parseInt(rgbMatch[1]) << 16) + 
                (parseInt(rgbMatch[2]) << 8) + parseInt(rgbMatch[3]))
                .toString(16).slice(1).toUpperCase();
        }
        
        // For rgba, just return the default color
        return '#000000';
    }
    
    // Update the visual preview based on current settings
    function updatePreview() {
        const bgColor = backgroundColorText.value;
        const bgImage = backgroundImageInput.value;
        const headerColor = headerColorText.value;
        const todayColor = todayHighlightText.value;
        const txtColor = textColorText.value;
        
        // Set the preview background
        previewArea.style.backgroundColor = bgColor;
        previewArea.style.color = txtColor;
        
        // Set background image if provided
        if (bgImage) {
            previewArea.style.backgroundImage = `url(${bgImage})`;
            previewArea.style.backgroundSize = 'cover';
            previewArea.style.backgroundPosition = 'center';
        } else {
            previewArea.style.backgroundImage = 'none';
        }
        
        // Update the today highlight
        const todayCell = document.querySelector('.preview-today');
        if (todayCell) {
            todayCell.style.backgroundColor = todayColor;
        }
    }
    
    // Generate CSS based on the current form values
    function generateCSS() {
        const themeName = themeNameInput.value;
        const bgColor = backgroundColorText.value;
        const bgImage = backgroundImageInput.value;
        const headerColor = headerColorText.value;
        const todayColor = todayHighlightText.value;
        const txtColor = textColorText.value;
        
        let css = `/* ${themeName} */\n`;
        
        // Background styles
        css += `.sk_page {\n`;
        css += `    background-color: ${bgColor} !important;\n`;
        
        if (bgImage) {
            css += `    background: url("${bgImage}") ${bgColor} top fixed no-repeat !important;\n`;
            css += `    background-size: cover !important;\n`;
            css += `    background-repeat: no-repeat !important;\n`;
            css += `    background-position: center center !important;\n`;
            css += `    background-attachment: fixed !important;\n`;
        }
        
        if (txtColor) {
            css += `    color: ${txtColor} !important;\n`;
        }
        
        css += `}\n\n`;
        
        // Header styles
        css += `.sk_header {\n`;
        css += `    background-color: ${headerColor} !important;\n`;
        
        if (bgImage) {
            css += `    background: url("${bgImage}") ${headerColor} top fixed no-repeat !important;\n`;
            css += `    background-size: cover !important;\n`;
            css += `    background-repeat: no-repeat !important;\n`;
            css += `    background-position: center center !important;\n`;
            css += `    background-attachment: fixed !important;\n`;
        }
        
        css += `}\n\n`;
        
        // Today highlight
        if (todayColor) {
            css += `.is-today {\n`;
            css += `    background-color: ${todayColor} !important;\n`;
            css += `}\n`;
        }
        
        return css;
    }
    
    // Update the CSS editor with generated CSS
    function updateCSSEditor() {
        cssEditor.value = generateCSS();
    }
    
    // Save the current theme
    function saveTheme() {
        const themeName = themeNameInput.value.trim();
        if (!themeName) {
            alert('Please provide a theme name');
            return;
        }
        
        // Get the current theme data
        const themeData = {
            id: currentThemeId || generateUUID(),
            name: themeName,
            backgroundColor: backgroundColorText.value,
            backgroundImage: backgroundImageInput.value,
            headerColor: headerColorText.value,
            todayHighlight: todayHighlightText.value,
            textColor: textColorText.value,
            css: cssEditor.value
        };
        
        // Save to Chrome storage
        chrome.storage.sync.get(['visual-theme-data'], function(result) {
            let themes = result['visual-theme-data'] || [];
            
            if (currentThemeId) {
                // Update existing theme
                const index = themes.findIndex(t => t.id === currentThemeId);
                if (index !== -1) {
                    themes[index] = themeData;
                } else {
                    themes.push(themeData);
                }
            } else {
                // Add new theme
                themes.push(themeData);
            }
            
            chrome.storage.sync.set({'visual-theme-data': themes}, function() {
                alert(`Theme "${themeName}" has been saved!`);
                loadThemes();
                resetForm();
            });
        });
    }
    
    // Load theme data into the form
    function loadThemeIntoForm(theme) {
        currentThemeId = theme.id;
        themeNameInput.value = theme.name;
        backgroundColorText.value = theme.backgroundColor;
        backgroundColorInput.value = convertToHex(theme.backgroundColor);
        backgroundImageInput.value = theme.backgroundImage || '';
        headerColorText.value = theme.headerColor;
        headerColorInput.value = convertToHex(theme.headerColor);
        todayHighlightText.value = theme.todayHighlight;
        if (isValidColor(theme.todayHighlight)) {
            todayHighlightInput.value = convertToHex(theme.todayHighlight);
        }
        textColorText.value = theme.textColor || '#FFFFFF';
        textColorInput.value = convertToHex(theme.textColor || '#FFFFFF');
        
        cssEditor.value = theme.css || generateCSS();
        updatePreview();
    }
    
    // Reset the form
    function resetForm() {
        currentThemeId = null;
        themeForm.reset();
        backgroundColorText.value = '#1C1C1C';
        headerColorText.value = '#0078D7';
        todayHighlightText.value = '#409dc257';
        textColorText.value = '#FFFFFF';
        
        backgroundColorInput.value = '#1C1C1C';
        headerColorInput.value = '#0078D7';
        todayHighlightInput.value = '#409dc2';
        textColorInput.value = '#FFFFFF';
        
        updatePreview();
        updateCSSEditor();
    }
    
    // Delete a theme
    function deleteTheme(themeId) {
        if (confirm('Are you sure you want to delete this theme?')) {
            chrome.storage.sync.get(['visual-theme-data'], function(result) {
                let themes = result['visual-theme-data'] || [];
                themes = themes.filter(t => t.id !== themeId);
                
                chrome.storage.sync.set({'visual-theme-data': themes}, function() {
                    loadThemes();
                    if (currentThemeId === themeId) {
                        resetForm();
                    }
                });
            });
        }
    }
    
    // Load and display all saved themes
    function loadThemes() {
        chrome.storage.sync.get(['visual-theme-data'], function(result) {
            const themes = result['visual-theme-data'] || [];
            themesListContainer.innerHTML = '';
            
            if (themes.length === 0) {
                themesListContainer.innerHTML = '<p>No custom themes yet. Create your first theme above!</p>';
                return;
            }
            
            themes.forEach(theme => {
                const themeItem = document.createElement('div');
                themeItem.className = 'theme-item';
                
                const themeInfo = document.createElement('div');
                themeInfo.className = 'theme-info';
                
                // Create theme name with color previews
                let infoHTML = `<strong>${theme.name}</strong> `;
                
                // Add color preview boxes
                infoHTML += `<span class="color-preview" style="background-color:${theme.backgroundColor}" title="Background"></span>`;
                infoHTML += `<span class="color-preview" style="background-color:${theme.headerColor}" title="Header"></span>`;
                infoHTML += `<span class="color-preview" style="background-color:${theme.todayHighlight}" title="Today Highlight"></span>`;
                
                themeInfo.innerHTML = infoHTML;
                themeItem.appendChild(themeInfo);
                
                // Theme actions
                const themeActions = document.createElement('div');
                themeActions.className = 'theme-actions';
                
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', function() {
                    loadThemeIntoForm(theme);
                });
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete';
                deleteButton.addEventListener('click', function() {
                    deleteTheme(theme.id);
                });
                
                themeActions.appendChild(editButton);
                themeActions.appendChild(deleteButton);
                themeItem.appendChild(themeActions);
                
                themesListContainer.appendChild(themeItem);
            });
        });
    }
    
    // Event listeners
    themeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveTheme();
    });
    
    resetFormButton.addEventListener('click', resetForm);
    
    advancedToggle.addEventListener('click', function() {
        const isVisible = advancedSection.style.display === 'block';
        advancedSection.style.display = isVisible ? 'none' : 'block';
        advancedToggle.innerHTML = isVisible ? 
            '<h3>▶ Advanced CSS Editing</h3>' : 
            '<h3>▼ Advanced CSS Editing</h3>';
    });
    
    updateFromCSSButton.addEventListener('click', function() {
        // For now, we just update the preview when the manual CSS is changed
        updatePreview();
    });
    
    // Initialize preview and load saved themes
    updatePreview();
    updateCSSEditor();
    loadThemes();
});