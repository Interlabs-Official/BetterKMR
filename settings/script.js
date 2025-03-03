       /* TODO: At a later date, this code needs to be reformed as it's not only bad to look at, but everything's in one file.
	   It probably needs a complete rewrite at some point, but I'll do this when I'm bored. */

	   /**********************************************************************
        * Initialization & Example Usage
        **********************************************************************/
       console.log(`%c[BetterKMR 📘] ` + `%cWelcome to the BetterKMR extension settings. Please do not paste/enter commands in this console unless you know what you're doing.`, 'color: #0091EA', 'color: #fff');

       function formatCurrentDate() {
       	const date = new Date();
       	const day = date.getDate();
       	const month = date.toLocaleString('default', { month: 'long' });
       	return `${day}${getDaySuffix(day)} ${month}`;
       }

       function getDaySuffix(day) {
       	if (day >= 11 && day <= 13) return 'th';
       	switch (day % 10) {
       		case 1: return 'st';
       		case 2: return 'nd';
       		case 3: return 'rd';
       		default: return 'th';
       	}
       }

       document.addEventListener('DOMContentLoaded', () => {
       	const settingsPage = new SettingsPage();

       	// Initialize settings
       	const initializeSettings = async () => {
       		// Private Mode Settings
       		const [private_mode, super_private_mode] = await Promise.all([
       			loadSettingPromise("private_mode"),
       			loadSettingPromise("super_private_mode")
       		]);

       		settingsPage.addNestedSetting('general', {
       			name: 'private_mode',
       			label: 'Private Mode', 
       			tooltip: 'Gain enhanced privacy from anybody looking over your screen.',
       			type: 'toggle',
       			default: private_mode ?? false,
       			callback: (val) => saveSetting("private_mode", val),
       			children: [{
       				name: 'super_private_mode',
       				label: 'Super Private Mode',
       				tooltip: 'Hides your profile card info and school name/motto/logo. Stacks with Private Mode.',
       				type: 'toggle',
       				default: super_private_mode ?? false,
       				callback: (val) => saveSetting("super_private_mode", val)
       			}]
       		});

       		// Public Holiday Bar Settings
       		const [parentValue, actualDateValue, whenNearValue, enabledPagesValue] = await Promise.all([
       			loadSettingPromise("public_holiday_bar"),
       			loadSettingPromise("public_holiday_bar-show_actual_date"),
       			loadSettingPromise("public_holiday_bar-show_when_near"),
       			loadSettingPromise("public_holiday_bar-enabled_pages")
       		]);

       		settingsPage.addNestedSetting('general', {
       			name: 'public_holiday_bar',
       			label: 'Upcoming Public Holiday Bar',
       			tooltip: 'Shows a bar containing the closest upcoming public holiday.',
       			type: 'toggle',
       			default: parentValue ?? true,
       			callback: (val) => saveSetting("public_holiday_bar", val),
       			children: [{
       					name: 'public_holiday_bar-show_actual_date',
       					label: `Show Actual Date (e.g. ${formatCurrentDate()})`,
       					tooltip: `If enabled, instead of "in x days", the date shown is formatted to something like "on ${formatCurrentDate()}".`,
       					type: 'toggle',
       					default: actualDateValue ?? false,
       					callback: (val) => saveSetting("public_holiday_bar-show_actual_date", val)
       				},
       				{
       					name: 'public_holiday_bar-show_when_near',
       					label: 'Only Show When Near (7 Days)',
       					tooltip: 'Only shows the public holiday bar 7 days before instead of all the time.',
       					type: 'toggle',
       					default: whenNearValue ?? true,
       					callback: (val) => saveSetting("public_holiday_bar-show_when_near", val)
       				},
       				{
       					name: 'public_holiday_bar-enabled_pages',
       					label: 'Enabled Pages',
       					tooltip: 'The pages where the public holiday bar is shown. Separate with a comma ",".',
       					type: 'text',
       					default: enabledPagesValue ?? 'attendance/week, calendar',
       					callback: (val) => saveSetting("public_holiday_bar-enabled_pages", val)
       				}
       			]
       		});

       		// Student Barcode Setting
       		const [show_student_barcode] = await Promise.all([loadSettingPromise("show_student_barcode")]);
       		settingsPage.addNestedSetting('general', {
       			name: 'show_student_barcode',
       			label: 'Show Student Barcode',
       			tooltip: 'Shows your student barcode on the student card, disabled by default.',
       			type: 'toggle',
       			default: show_student_barcode ?? false,
       			callback: (val) => saveSetting("show_student_barcode", val)
       		});

       		// Profile Picture Settings
       		settingsPage.addNestedSetting('profile', {
       			name: 'choose_profile_picture',
       			label: 'Upload Profile Picture (PNG, JPG/JPEG)',
       			tooltip: 'Adds a custom profile picture to remove your school photo.',
       			type: 'button',
       			default: null,
       			callback: () => {
       				window.location.href = chrome.runtime.getURL("settings/legacy/pfp_wizard.html");
       			}
       		});

       		const [profile_picture_url] = await Promise.all([loadSettingPromise("profile_picture_url")]);
       		settingsPage.addNestedSetting('profile', {
       			name: 'profile_picture_url',
       			label: 'Profile Picture URL (other image types):',
       			tooltip: 'Adds a custom profile picture to remove your school photo.',
       			type: 'text',
       			default: profile_picture_url ?? "",
       			callback: (val) => saveSetting("profile_picture_url", val)
       		});

       		// Advanced Settings
       		const [theme_id_text] = await Promise.all([loadSettingPromise("theme-id-text")]);
       		settingsPage.addSetting('advanced', {
       			name: 'theme-id-text',
       			label: 'Theme ID',
       			tooltip: 'The ID of the theme you want to use for KAMAR. Default = 0, No Theme = 1. Note that setting a value here is not recommended - please use the Theme Browser.',
       			type: 'text',
       			default: theme_id_text || '0',
       			callback: (val) => saveSetting("theme-id-text", val)
       		});

       		const [hide_external_js_warning] = await Promise.all([loadSettingPromise("hide_external_js_warning")]);
       		settingsPage.addSetting('advanced', {
       			name: 'hide_external_js_warning',
       			label: 'Hide External JS Warning',
       			tooltip: 'Hides the dialog warning when you apply a theme with external JavaScript.',
       			type: 'toggle',
       			default: hide_external_js_warning ?? false,
       			callback: (val) => saveSetting("hide_external_js_warning", val)
       		});
       	};

       	initializeSettings();

       	function addBadge(imgWrapper, text, badgeClass) {
       		let badgeContainer = imgWrapper.querySelector('.badge-container');
       		if (!badgeContainer) {
       			badgeContainer = document.createElement('div');
       			badgeContainer.className = 'badge-container';
       			imgWrapper.appendChild(badgeContainer);
       		}

       		const badge = document.createElement('div');
       		badge.className = `badge ${badgeClass}`;
       		badge.textContent = text;
       		badgeContainer.appendChild(badge);
       	}

       	function createThemeCard(
       		customID,
       		title,
       		thumbnailURL,
       		author,
       		description,
       		fullDescription,
       		externalJS,
       		applyCallback,
       		tags
       	) {
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

       		if (title === 'Space Theme') {
       			addBadge(imgWrapper, '☑️ Recommended', 'recommended-badge');
       		} else if (title === 'Mountain Slideshow') {
       			addBadge(imgWrapper, '⚠️ Experimental', 'experimental-badge');
       		}
       		if (externalJS) {
       			addBadge(imgWrapper, 'External JS', 'external-js-badge');
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
       			window.location.href = chrome.runtime.getURL(
       				'settings/theme_detail.html?themeID=' + customID
       			);
       		});

       		const button = document.createElement('button');
       		button.className = 'download-button';
       		button.textContent = 'Apply';
       		button.addEventListener('click', async function() {
       			const [hide_external_js_warning] = await Promise.all([loadSettingPromise('hide_external_js_warning')]);
       			
       			if (externalJS && (!hide_external_js_warning)) {
       				const response = await fetch(chrome.runtime.getURL('src/config/general.yml'));
       				const data = await response.text();
       				const yamlToJson = jsyaml.load(data);
       				
       				const isTrustedAuthor = yamlToJson['trusted-authors'].includes(author);
       				
       				if (!isTrustedAuthor) {
       					createDialog({
       						title: `Installing '${title}'`,
       						content: 'This theme contains external JavaScript.<br>Themes with external JavaScript aren\'t sandboxed.<br><br>Things to be careful of:<br>- Themes with external JS can contain malicious code<br>- Using a theme with external JS gives the author complete power<br><br>Are you sure you want to use this theme?',
       						buttons: [
       							{
       								text: 'Cancel',
       								callback: () => console.log('Cancelled'),
       								classname: 'dialog-button-not',
       							},
       							{
       								text: 'OK',
       								callback: () => applyCallback(title, customID, button, true),
       							},
       						],
       					});
       				} else {
       					applyCallback(title, customID, button, true);
       				}
       			} else {
       				applyCallback(title, customID, button, true);
       			}
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

       		const tagContainer = document.createElement('div');
       		tagContainer.className = 'tag-container';

       		const tagScrollWrapper = document.createElement('div');
       		tagScrollWrapper.className = 'tag-scroll-wrapper';
       		tagContainer.appendChild(tagScrollWrapper);

       		if (tags) {
       			Object.entries(tags).forEach(([tagName, color]) => {
       				const tagElement = document.createElement('span');
       				tagElement.className = 'theme-tag';
       				tagElement.textContent = tagName;
       				tagElement.style.backgroundColor = color;
       				tagScrollWrapper.appendChild(tagElement);
       			});
       		}

       		content.appendChild(tagContainer);
       		card.appendChild(content);
       		themeGrid.appendChild(card);

       		if (tagScrollWrapper.scrollWidth > tagScrollWrapper.clientWidth) {
       			startTagScrollAnimation(tagScrollWrapper);
       		}
       	}

       	function startTagScrollAnimation(tagScrollWrapper) {
       		let scrollAmount = 0;
       		const scrollStep = 1;
       		const delay = 20;

       		function scroll() {
       			scrollAmount += scrollStep;
       			tagScrollWrapper.scrollLeft = scrollAmount;

       			if (scrollAmount >= tagScrollWrapper.scrollWidth - tagScrollWrapper.clientWidth) {
       				scrollAmount = 0;
       			}

       			setTimeout(scroll, delay);
       		}

       		scroll();
       	}

       	function onApply(themeName, customID, button, shouldApply) {
       		const previousButton = document.getElementById("greyed-out-applied");
       		if (previousButton) {
       			previousButton.textContent = "Apply";
       			previousButton.disabled = false;
       			previousButton.removeAttribute("id");
       		}

       		button.setAttribute("id", "greyed-out-applied");
       		button.disabled = true;
       		button.textContent = "In Use";

       		if (shouldApply) {
       			saveSetting('theme-id-text', customID);
       			createNotification(`Theme "${themeName}" has been successfully applied.`, "#3c8443", "#ffffff");
       		}
       	}

       	function getThemeCardById(id) {
       		return document.getElementById(id);
       	}

       	function getThemeCardButtonById(id) {
       		const card = getThemeCardById(id);
       		return card?.querySelector('.download-button');
       	}

       	document.getElementById("school-default-theme").addEventListener('click', function() {
       		onApply("School Colours", 1, document.getElementById("school-default-theme"), true);
       	});

       	async function doYAMLThemes() {
       		try {
       			const response = await fetch(chrome.runtime.getURL("src/config/themes.yml"));
       			const data = await response.text();
       			const yamlToJson = jsyaml.load(data);
       			const themeCount = Object.keys(yamlToJson).length;
       			let loadedThemes = 0;

       			Object.entries(yamlToJson).forEach(([key, theme]) => {
       				if (!key) {
       					assert("A specific theme does not have a key.");
       					return;
       				}

       				if (key !== "1") {
       					if (!theme.css) {
       						assert(`Theme with key "${key}" does not have a CSS stylesheet attached!`);
       						return;
       					}
       					if (!theme.author) {
       						assert(`Theme with key "${key}" does not have an author!`);
       						return;
       					}

       					createThemeCard(
       						key,
       						theme.name,
       						"../../assets/" + theme.thumbnail,
       						theme.author,
       						theme.highlight,
       						theme.description || null,
       						theme.js,
       						onApply,
       						theme.tags
       					);
       				}
       				loadedThemes++;

       				if (loadedThemes === themeCount) {
       					setTimeout(() => {
       						document.getElementById("loader").style.display = "none";
       						document.getElementById("theme-grid").style.display = "grid";
       					}, 1250);
       				}
       			});
       		} catch (error) {
       			console.error("Failed to load themes:", error);
       		}
       	}

		doYAMLThemes();

		function assert(error) {
			console.log(`%c[BetterKMR 📕] ` + `%cAn error occurred while attempting to load a theme preview:\n      ` + `%c${error}`, 'color: #F44336', 'color: #fff', 'color:rgb(255, 179, 173)');
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

		        function setupThemeSearch() {
            console.log("Setting up theme search...");
            const searchInput = document.getElementById('theme-search-input');
            const clearButton = document.getElementById('clear-search-button');
            
            if (!searchInput || !clearButton) {
                console.error("Theme search elements not found in DOM");
                return;
            }
            
            function filterThemes(searchText) {
                console.log("Filtering themes with:", searchText);
                const themeCards = document.querySelectorAll('.theme-card'); 
                const normalizedSearch = searchText.toLowerCase().trim();
                let matchCount = 0;
                
                themeCards.forEach(card => {
                    if (card.id === "1") {
                        return;
                    }
                    
                    const title = card.querySelector('.theme-title').textContent.toLowerCase();
                    const description = card.querySelector('.theme-description').textContent.toLowerCase();
                    const authorElement = card.querySelector('.theme-author');
                    const authorText = authorElement ? authorElement.textContent.toLowerCase() : '';
                    const tagElements = card.querySelectorAll('.theme-tag');
                    let tags = [];
                    
                    tagElements.forEach(tag => {
                        tags.push(tag.textContent.toLowerCase());
                    });
                    
                    if (normalizedSearch === '' || 
                        title.includes(normalizedSearch) || 
                        description.includes(normalizedSearch) || 
                        authorText.includes(normalizedSearch) || 
                        tags.some(tag => tag.includes(normalizedSearch))) {
                        card.style.display = 'flex';
                        matchCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                const noResultsMessage = document.getElementById('no-theme-results');
                if (noResultsMessage) {
                    if (normalizedSearch !== '' && matchCount === 0) {
                        noResultsMessage.style.display = 'block';
                    } else {
                        noResultsMessage.style.display = 'none';
                    }
                }
            }
            
            searchInput.addEventListener('input', function() {
                filterThemes(this.value);
            });
            
            clearButton.addEventListener('click', function() {
                searchInput.value = '';
                filterThemes('');
                searchInput.focus();
            });
            
            function setupTagClickHandlers() {
                console.log("Setting up tag click handlers");
                const tagElements = document.querySelectorAll('.theme-tag');
                tagElements.forEach(tag => {
                    tag.addEventListener('click', function() {
                        const tagText = this.textContent;
                        console.log("Tag clicked:", tagText);
                        searchInput.value = tagText;
                        filterThemes(tagText);
                        searchInput.focus();
                    });
                });
            }
            
            const themeGrid = document.getElementById('theme-grid');
            if (themeGrid) {
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.addedNodes.length > 0) {
                            setupTagClickHandlers();
                        }
                    });
                });
                
                observer.observe(themeGrid, { childList: true, subtree: true });
            }
            
            setTimeout(setupTagClickHandlers, 2000);
        }

		setTimeout(function() {
            setupThemeSearch();
        }, 2000);

       	window.createDialog = function({title, content, buttons = []}) {
       		const overlay = document.createElement('div');
       		overlay.className = 'dialog-overlay';

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

       	chrome.runtime.sendMessage({action: "checkPinned"}, (response) => {
       		if (!response.isPinned && Math.random() > 0.5) {
       			createNotification("You should totally pin BetterKMR for easy access!", "#0073de", "#ffffff");
       		}
       	});

		const tabs = document.querySelectorAll('.tab-item');
		tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				tabs.forEach(t => t.classList.remove('active'));
				tab.classList.add('active');
		   
				const tabContents = document.querySelectorAll('.tab-content');
				tabContents.forEach(tc => tc.classList.remove('active'));
				   
				const tabId = tab.getAttribute('data-tab');
				document.getElementById('tab-' + tabId).classList.add('active');
		   
				// reset nested tabs to first tab when switching main tabs
				const activeTabContent = document.getElementById('tab-' + tabId);
				if (activeTabContent) {
					const nestedTabList = activeTabContent.querySelector('.nested-tab-list');
					if (nestedTabList) {
						const firstNestedTab = nestedTabList.querySelector('.nested-tab-item');
						if (firstNestedTab) {
							// simulate click on first nested tab
							nestedTabs.forEach(nt => nt.classList.remove('active'));
							firstNestedTab.classList.add('active');
							   
							const firstNestedTabId = firstNestedTab.getAttribute('data-nested-tab');
							const nestedContents = document.querySelectorAll('.nested-tab-content');
							nestedContents.forEach(content => content.classList.remove('active'));
							document.getElementById('nested-tab-' + firstNestedTabId).classList.add('active');
						}
					}
				}
		   
				if (tabId === "themes") {
					chrome.storage.sync.get(["theme-id-text"]).then((result) => {
						const id = result["theme-id-text"] || "0";
						const buttonById = getThemeCardButtonById(id);
						if (buttonById) {
							onApply(null, id, buttonById, false);
						}
					});
				}
			});
		});

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

       	window.settingsPage = settingsPage;
       	window.isItemToggled = settingsPage.isItemToggled.bind(settingsPage);
       });

       function createCustomThemeItem(themeName, customID) {
       	const li = document.createElement("li");
       	li.classList.add("custom-theme-item");
       	Object.assign(li.style, {
       		display: "flex",
       		justifyContent: "space-between",
       		alignItems: "center",
       		padding: "10px",
       		borderBottom: "1px solid #444"
       	});

       	const span = document.createElement("span");
       	span.classList.add("theme-name");
       	span.style.fontSize = "18px";
       	span.textContent = themeName;

       	const actionsDiv = document.createElement("div");
       	actionsDiv.classList.add("theme-actions");

       	function createButton(className, backgroundColor, text) {
       		const button = document.createElement("button");
       		Object.assign(button, {
       			className,
       			style: `
       				background-color: ${backgroundColor};
       				color: white;
       				border: none;
       				padding: 5px 10px;
       				border-radius: 4px;
       				cursor: pointer;
       				margin-left: 5px;
       			`,
       			textContent: text
       		});
       		return button;
       	}

       	const applyButton = createButton("apply-custom-theme", "#3498db", "Apply");
       	const editButton = createButton("edit-theme", "#3498db", "Edit");
       	const deleteButton = createButton("delete-theme", "#e74c3c", "Delete");

       	editButton.addEventListener('click', () => {
       		window.location.href = chrome.runtime.getURL(`settings/theme_edit.html?themeID=${customID}`);
       	});

       	deleteButton.addEventListener('click', () => deleteTheme(customID));

       	applyButton.addEventListener('click', () => {
       		const previousButton = document.getElementById("greyed-out-applied");
       		if (previousButton) {
       			previousButton.textContent = "Apply";
       			previousButton.disabled = false;
       			previousButton.removeAttribute("id");
       		}

       		applyButton.setAttribute("id", "greyed-out-applied");
       		applyButton.disabled = true;
       		applyButton.textContent = "In Use";

       		saveSetting('theme-id-text', customID);
       		createNotification(`Custom theme "${themeName}" has been successfully applied.`, "#3c8443", "#ffffff");
       	});

       	actionsDiv.append(applyButton, editButton, deleteButton);
       	li.append(span, actionsDiv);

       	return li;
       }

       function getAllCustomThemes(callback) {
       	chrome.storage.local.get('themes', data => callback(data.themes || {}));
       }

       function setUpCustomThemesList() {
       	const customThemesList = document.getElementById("custom-themes-list");
       	customThemesList.innerHTML = '';
       	getAllCustomThemes(themes => {
       		Object.entries(themes).forEach(([id, theme]) => {
       			customThemesList.appendChild(createCustomThemeItem(theme.name, id));
       		});
       	});
       }

       setUpCustomThemesList();

       document.getElementById("new-custom-theme-button").addEventListener('click', () => {
       	window.location.href = chrome.runtime.getURL("settings/theme_edit.html?themeID=new_theme");
       });

       function deleteTheme(themeId) {
       	chrome.storage.local.get('themes', data => {
       		const themes = data.themes || {};
       		if (themes[themeId]) {
       			delete themes[themeId];
       			chrome.storage.local.set({themes}, () => {
       				if (chrome.runtime.lastError) {
       					console.error("Error deleting theme:", chrome.runtime.lastError);
       					alert("Error deleting theme. Please try again.");
       				} else {
       					createNotification("The custom theme you have chosen has been successfully deleted.", "#3c8443", "#ffffff");
       					setUpCustomThemesList();
       				}
       			});
       		} else {
       			console.log("Theme not found.");
       			alert("Theme not found.");
       		}
       	});
       }

       const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
       let inputIndex = 0;

       document.addEventListener('keydown', event => {
       	if (event.key === konamiCode[inputIndex]) {
       		inputIndex++;
       		if (inputIndex === konamiCode.length) {
       			createNotification("Secret unlocked.", "#3c8443", "#ffffff");
       			document.getElementById("super-secret-tab-header").style.visibility = "visible";
       			inputIndex = 0;
       		}
       	} else {
       		inputIndex = 0;
       	}
       });