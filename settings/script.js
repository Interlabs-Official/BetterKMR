       /**********************************************************************
       * Initialization & Example Usage
       **********************************************************************/
       console.log(`%c[BetterKMR 📘] ` + `%cWelcome to the BetterKMR extension settings. Please do not paste/enter commands in this console unless you know what you're doing.`, 'color: #0091EA', 'color: #fff');
       function formatCurrentDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        
        const suffix = getDaySuffix(day);
        
        return `${day}${suffix} ${month}`;
      }
      
      function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      }
      
      document.addEventListener('DOMContentLoaded', () => {
        const settingsPage = new SettingsPage();
        // --- Privacy Tab: Example "Private Mode" with Child Settings ---
        Promise.all([
          loadSettingPromise("private_mode"),
          loadSettingPromise("super_private_mode"),
        ]).then(([private_mode, super_private_mode]) => {
        settingsPage.addNestedSetting('general', {
          name: 'private_mode',
          label: 'Private Mode',
          tooltip: 'Gain enhanced privacy from anybody looking over your screen.',
          type: 'toggle',
          default: private_mode ?? false,
          callback: (val) => { saveSetting("private_mode", val); },
          children: [
            {
              name: 'super_private_mode',
              label: 'Super Private Mode',
              tooltip: 'Hides your profile card info and school name/motto/logo. Stacks with Private Mode.',
              type: 'toggle',
              default: super_private_mode ?? false,
              callback: (val) => { saveSetting("super_private_mode", val); }
            },
          ]
        });
      });

        /* Public Holiday Bar */
        Promise.all([
          loadSettingPromise("public_holiday_bar"),
          loadSettingPromise("public_holiday_bar-show_actual_date"),
          loadSettingPromise("public_holiday_bar-show_when_near"),
          loadSettingPromise("public_holiday_bar-enabled_pages")
        ]).then(([parentValue, actualDateValue, whenNearValue, enabledPagesValue]) => {
          settingsPage.addNestedSetting('general', {
            name: 'public_holiday_bar',
            label: 'Upcoming Public Holiday Bar',
            tooltip: 'Shows a bar containing the closest upcoming public holiday.',
            type: 'toggle',
            default: parentValue ?? true,
            callback: (val) => { saveSetting("public_holiday_bar", val); },
            children: [
              {
                name: 'public_holiday_bar-show_actual_date',
                label: `Show Actual Date (e.g. ${formatCurrentDate()})`,
                tooltip: `If enabled, instead of "in x days", the date shown is formatted to something like "on ${formatCurrentDate()}".`,
                type: 'toggle',
                default: actualDateValue ?? false,
                callback: (val) => { saveSetting("public_holiday_bar-show_actual_date", val); }
              },
              {
                name: 'public_holiday_bar-show_when_near',
                label: 'Only Show When Near (7 Days)',
                tooltip: 'Only shows the public holiday bar 7 days before instead of all the time.',
                type: 'toggle',
                default: whenNearValue ?? true,
                callback: (val) => { saveSetting("public_holiday_bar-show_when_near", val); }
              },
              {
                name: 'public_holiday_bar-enabled_pages',
                label: 'Enabled Pages',
                tooltip: 'The pages where the public holiday bar is shown. Separate with a comma ",".',
                type: 'text',
                default: enabledPagesValue ?? 'attendance/week, calendar',
                callback: (val) => { saveSetting("public_holiday_bar-enabled_pages", val); }
              }
            ]
          });
        });
        
        /* Student Barcode */
        Promise.all([
          loadSettingPromise("show_student_barcode"),
        ]).then(([value]) => {
          settingsPage.addNestedSetting('general', {
            name: 'show_student_barcode',
            label: 'Show Student Barcode',
            tooltip: 'Shows your student barcode on the student card, disabled by default.',
            type: 'toggle',
            default: value ?? false,
            callback: (val) => { 
              saveSetting("show_student_barcode", val); 
            }
          });
        });

        settingsPage.addNestedSetting('profile', {
          name: 'choose_profile_picture',
          label: 'Upload Profile Picture (PNG, JPG/JPEG)',
          tooltip: 'Adds a custom profile picture to remove your school photo.',
          type: 'button',
          default: null,
          callback: (e) => { window.location.href = chrome.runtime.getURL("settings/legacy/pfp_wizard.html"); }
       });
  
        /* Profile Picture URL */
        Promise.all([
          loadSettingPromise("profile_picture_url"),
        ]).then(([value]) => {
          settingsPage.addNestedSetting('profile', {
            name: 'profile_picture_url',
            label: 'Profile Picture URL (other image types):',
            tooltip: 'Adds a custom profile picture to remove your school photo.',
            type: 'text',
            default: value ?? "",
            callback: (val) => {
              saveSetting("profile_picture_url", val);
            }
          });
        });

        // --- Advanced Tab: An example text setting ---
        Promise.all([
          loadSettingPromise("theme-id-text"),
        ]).then(([value]) => {
        settingsPage.addSetting('advanced', {
          name: 'theme-id-text',
          label: 'Theme ID',
          tooltip: 'The ID of the theme you want to use for KAMAR. Default = 0, No Theme = 1. Note that setting a value here is not recommended - please use the Theme Browser.',
          type: 'text',
          default: value || '0',
          callback: (val) => { saveSetting("theme-id-text", val); }
        });
      });

        /* Hide External JS Warning */
        Promise.all([
          loadSettingPromise("hide_external_js_warning"),
        ]).then(([value]) => {
          settingsPage.addSetting('advanced', {
            name: 'hide_external_js_warning',
            label: 'Hide External JS Warning',
            tooltip: 'Hides the dialog warning when you apply a theme with external JavaScript.',
            type: 'toggle',
            default: value ?? false,
            callback: (val) => { 
              saveSetting("hide_external_js_warning", val); 
            }
          });
        });
  
        /* Nested Tab "UI Behaviour": a dropdown for animation speed
        settingsPage.addNestedSetting('ui_behaviour', {
           name: 'animation_speed',
           label: 'Animation Speed',
           tooltip: 'Set the animation speed (slow, medium, fast).',
           type: 'dropdown',
           options: ['Slow', 'Medium', 'Fast'],
           default: 'Medium',
           callback: (val) => { console.log('Animation speed changed:', val); }
        }); */

        /* Theme Switching */
                /**
         * Creates a theme card and appends it to the container with id "theme-grid".
         *
         * @param {string} customID - The custom ID you assign to the card.
         * @param {string} title - The theme title.
         * @param {string} thumbnailURL - The URL for the thumbnail image.
         * @param {string} author - The author name, e.g. Convy32.
         * @param {string} description - The theme description.
         * @param {string} externalJS - The theme's external JS, if applicable.
         * @param {function} applyCallback - A callback function to run when the "Apply" button is clicked, which is the function onApply. I love callback functions. They're awesome.
         * 
         */
        function createThemeCard(customID, title, thumbnailURL, author, description, fullDescription, externalJS, applyCallback) {
          const themeGrid = document.getElementById('theme-grid');

          const card = document.createElement('div');
          card.className = 'theme-card';
          card.id = customID;

          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'theme-image-wrapper';

          const img = document.createElement('img');
          img.src = thumbnailURL;
          img.alt = title + ' Thumbnail';
          imgWrapper.appendChild(img);

          /* imgWrapper.addEventListener('click', function() {
            if (typeof fullDescription == 'undefined' || fullDescription == null) {
              openDetailedThemeView(customID, title, thumbnailURL, author, description);
            } else {
              openDetailedThemeView(customID, title, thumbnailURL, author, fullDescription);
            }
          }); */
          
          imgWrapper.appendChild(img);

          if (externalJS != null) {
              const badge = document.createElement('div');
              badge.className = 'external-js-badge';
              badge.textContent = 'External JS';
              imgWrapper.appendChild(badge);
          }
          
          card.appendChild(imgWrapper);

          const content = document.createElement('div');
          content.className = 'theme-content';

          const titleRow = document.createElement('div');
          titleRow.className = 'title-row';

          const h2 = document.createElement('h2');
          h2.className = 'theme-title';
          h2.textContent = title;
          titleRow.appendChild(h2);

          img.addEventListener('click', () => {
            window.location.href = chrome.runtime.getURL('settings/theme_detail.html?themeID=' + customID);
          });

          const button = document.createElement('button');
          button.className = 'download-button';
          button.textContent = 'Apply';
          button.addEventListener('click', function() {
            Promise.all([
              loadSettingPromise("hide_external_js_warning"),
            ]).then(([value]) => {
              if (externalJS != null && value == false || value == null) {
                  fetch(chrome.runtime.getURL("src/config/general.yml"))
                  .then(response => response.text())
                  .then(data => {
                      const yamlToJson = jsyaml.load(data);
                      console.log(yamlToJson);
                      for (const i in yamlToJson["trusted-authors"]) {
                        console.log(yamlToJson["trusted-authors"][i]);
                        if (!yamlToJson["trusted-authors"][i] == author) {
                          createDialog({
                            title: 'Installing \'' + title + '\'',
                            content: 'This theme contains external JavaScript.<br>Themes with external JavaScript aren\'t sandboxed.<br><br>Things to be careful of:<br>- Themes with external JS can contain malicious code<br>- Using a theme with external JS gives the author complete power<br><br>Are you sure you want to use this theme?',
                            buttons: [
                                { text: 'Cancel', callback: () => console.log('Cancelled'), classname: "dialog-button-not" },
                                { text: 'OK', callback: () => applyCallback(title, customID, button, true) }
                            ]
                        });   
                        } else {
                          /* don't have time but this needs fixing so it doesn't occur 3 times, same as above */
                          applyCallback(title, customID, button, true)
                        }
                      }
                  })
                  .catch(error => console.error("Failed to load themes:", error));
              } else {
                  applyCallback(title, customID, button, true);
              }
            });
          });
          titleRow.appendChild(button);

          content.appendChild(titleRow);

          const pAuthor = document.createElement('p');
          pAuthor.className = 'theme-author';
          pAuthor.textContent = 'by ' + author;
          content.appendChild(pAuthor);

          const pDesc = document.createElement('p');
          pDesc.className = 'theme-description';
          pDesc.textContent = description;
          content.appendChild(pDesc);

          card.appendChild(content);
          themeGrid.appendChild(card);
      }

      function onApply(themeName, customID, button, shouldApply) {
          if (document.getElementById("greyed-out-applied")) {
              document.getElementById("greyed-out-applied").textContent = "Apply"
              document.getElementById("greyed-out-applied").disabled = false;
              document.getElementById("greyed-out-applied").removeAttribute("id");
          }
          button.setAttribute("id", "greyed-out-applied")
          button.disabled = true;
          button.textContent = "In Use"

          if (shouldApply) {
              saveSetting('theme-id-text', customID);
              console.log('Theme applied:', themeName, 'with ID:', customID);
              createNotification(`Theme "${themeName}" has been successfully applied.`, "#3c8443", "#ffffff");
          }
      }

      function getThemeCardById(id) {
          return document.getElementById(id);
      }

      function getThemeCardButtonById(id) {
          const card = getThemeCardById(id);
          if (card) {
              return card.querySelector('.download-button');
          }
          return null;
      }

      document.getElementById("school-default-theme").addEventListener('click', function() {
          onApply("School Colours", 1, document.getElementById("school-default-theme"), true);
      });

      function doYAMLThemes() {
          fetch(chrome.runtime.getURL("src/config/themes.yml"))
              .then(response => response.text())
              .then(data => {
                  const yamlToJson = jsyaml.load(data);
      
                  Object.entries(yamlToJson).forEach(([key, theme]) => {
                      if (key == null || key == "") { assert("A specific theme does not have a key."); return; } // this shouldn't be possible but we'll make sure anyway
                      if (key != "1") { // if not the school colours theme
                          if (theme.css == null || theme.css == "") { assert("Theme with key \"" + key + "\" does not have a CSS stylesheet attached!"); return; }
                          if (theme.author == null || theme.author == "") { assert("Theme with key \"" + key + "\" does not have an author!"); return; }

                          createThemeCard(
                              key,
                              theme.name,
                              "../../assets/" + theme.thumbnail,
                              theme.author,
                              theme.highlight,
                              theme.description || null,
                              theme.js,
                              onApply
                          )
                      }
                  });
              })
              .catch(error => console.error("Failed to load themes:", error));
      }
      doYAMLThemes();

      function assert(error) {
        console.log(`%c[BetterKMR 📕] ` + `%cAn error occurred while attempting to load a theme preview:\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
    }

    function createNotification(message, color, frontcol) {
        const notificationContainer = document.getElementById('notification-container');
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.backgroundColor = color;
        notification.style.color = frontcol;
        notification.innerText = message;
    
        notification.addEventListener('click', () => {
            notification.classList.add('hidden');
            setTimeout(() => notification.remove(), 500);
        });
    
        notificationContainer.appendChild(notification);
    
        setTimeout(() => {
            if (notification) {
                notification.classList.add('hidden');
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }    

    function createDialog({ title, content, buttons = [] }) {
        const overlay = document.createElement('div');
        overlay.className = 'dialog-overlay';
        
        const dialog = document.createElement('div');
        dialog.className = 'dialog-box';
        
        const titleElement = document.createElement('h2');
        titleElement.className = 'dialog-title';
        titleElement.textContent = title;
        dialog.appendChild(titleElement);
        
        const contentElement = document.createElement('p');
        contentElement.className = 'dialog-content';
        contentElement.innerHTML = content;
        dialog.appendChild(contentElement);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dialog-buttons';
        
        buttons.forEach(({ text, callback, classname }) => {
            const button = document.createElement('button');
            button.className = 'dialog-button';
            if (classname) {
                button.className = classname;
            }
            button.textContent = text;
            button.onclick = () => {
                if (callback) callback();
                document.body.removeChild(overlay);
            };
            buttonContainer.appendChild(button);
        });
        
        dialog.appendChild(buttonContainer);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    chrome.runtime.sendMessage({ action: "checkPinned" }, (response) => {
        if (response.isPinned) {
            console.log("Thank you for pinning the BetterKMR extension!");
        } else {
            const randomInt = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            if (randomInt > 50) {
                createNotification("You should totally pin BetterKMR for easy access!", "#0073de", "#ffffff");
            }
            console.log("Rolled a(n) " + randomInt + ". Values over 50 show the BetterKMR pin notification.");
        }
    });
  
        // --- Main Sidebar Tab Switching ---
        const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tc => tc.classList.remove('active'));
            const tabId = tab.getAttribute('data-tab');
            document.getElementById('tab-' + tabId).classList.add('active');
            // on (*every*) tab activation, check to see which theme is active and update buttons accordingly
            if (tabId == "themes") {
              chrome.storage.sync.get(["theme-id-text"]).then((result) => {
                  const id = result["theme-id-text"] || "0";
                  const buttonById = getThemeCardButtonById(id);
                  if (buttonById) {
                      // it's fine to call null here on the name, we don't need it for this situation
                      onApply(null, id, buttonById, false);
                  }
              });
          }
          });
        });
  
        // --- Nested Tab Switching (inside the General tab) ---
        const nestedTabs = document.querySelectorAll('.nested-tab-item');
        nestedTabs.forEach(nTab => {
          nTab.addEventListener('click', () => {
            nestedTabs.forEach(nt => nt.classList.remove('active'));
            nTab.classList.add('active');
            const nestedTabId = nTab.getAttribute('data-nested-tab');
            const nestedContents = document.querySelectorAll('.nested-tab-content');
            nestedContents.forEach(content => content.classList.remove('active'));
            document.getElementById('nested-tab-' + nestedTabId).classList.add('active');
          });
        });
  
        // Expose the settingsPage instance and API globally:
        window.settingsPage = settingsPage;
        window.isItemToggled = settingsPage.isItemToggled.bind(settingsPage);
      });