/* TODO: At a later date, this code needs to be reformed as it's not only bad to look at, but everything's in one file.
   It probably needs a complete rewrite at some point, but I'll do this when I'm bored. */
import jsyaml from 'js-yaml';
import { SettingsPage, loadSetting, loadSettingPromise, saveSetting } from './lib';

/**********************************************************************
 * Initialization & Example Usage
 **********************************************************************/
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		const loadingScreen = document.getElementById('loading-screen');
		if (loadingScreen) {
			loadingScreen.classList.add('hidden');
			document.getElementById('tab-general').classList.add('active');
		}
	}, 200);
});

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
	initSettingsTheme();
	const urlParams = new URLSearchParams(window.location.search);
	
	if (urlParams.get('tab-selected')) {
		const selectedTab = urlParams.get('tab-selected');
		setTimeout(() => {
			const tab = document.querySelector(`.tab-item[data-tab="${selectedTab}"]`);
			if (tab) {
				
				document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
				document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
				
				tab.classList.add('active');
				const content = document.getElementById('tab-' + selectedTab);
				if (content) {
					content.classList.add('active');
				} else {
					console.error('Could not find content for tab:', selectedTab);
				}
			} else {
				console.error('Could not find tab with data-tab:', selectedTab);
			}
		}, 300);
	} else if (urlParams.get('nested-tab-selected')) {
		const selectedTab = urlParams.get('nested-tab-selected');
		setTimeout(() => {
			const tab = document.querySelector(`.nested-tab-item[data-nested-tab="${selectedTab}"]`);
			if (tab) {
				document.querySelectorAll('.nested-tab-item').forEach(t => t.classList.remove('active'));
				document.querySelectorAll('.nested-tab-content').forEach(tc => tc.classList.remove('active'));
				document.querySelectorAll('.tab-item').forEach(tc => tc.classList.remove('active'));
				
				tab.classList.add('active');
				if (tab) {
					for (var i = 0; i < document.querySelectorAll('.tab-content').length; i++) {
						document.querySelectorAll('.tab-content')[i].classList.remove('active');
					}
					const parentElm = tab.parentElement.parentElement.parentElement; // Sneaky little fix
					var currentElm = null;
					parentElm.classList.add('active');
					tab.classList.add('active');
					if (parentElm.getAttribute('id')) {
						if (parentElm.getAttribute('id').startsWith('tab-')) {
							currentElm = parentElm.getAttribute('id').substring(4);
						}
					}
					console.log(tab.parentElement.parentElement.parentElement.getAttribute('id'));
					/* Instead of this, which I started off doing:
					const nestedTabs = document.getElementById('tab-themes').querySelector('.nested-tabs');
					for (var i = 0; i < nestedTabs.childNodes.length; i++) {
						if (nestedTabs.childNodes[i].getAttribute('id') === `nested-tab-${selectedTab}`) {
							// Do stuff
						}
					}
					// I soon realised that I could literally do this */
					const actualNestedTab = document.getElementById(`nested-tab-${selectedTab}`);
					if (actualNestedTab) {
						actualNestedTab.classList.add('active');
					}
					if (currentElm != null) {
						document.querySelector(`.tab-item[data-tab="${currentElm}"]`).classList.add('active');
					}
				} else {
					console.error('Could not find content for nested tab:', selectedTab);
				}
			} else {
				console.error('Could not find nested tab with data-nested-tab:', selectedTab);
			}
		}, 250);
	}
	const settingsPage = new SettingsPage();

	// Initialise settings
	const initialiseSettings = async () => {
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
			label: 'Upload Profile Picture (PNG, JPG/JPEG, WEBP)',
			tooltip: 'Adds a custom profile picture to remove your school photo.',
			type: 'button',
			default: null,
			callback: () => {
				window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL("settings/pfp_wizard.html");
			}
		});

		// By the way, yes this was AI. WHY? because of this weird implementation and no way to properly add just one more button in regular HTML
// Add this to your script (after DOM exists)
const addDeleteButton = () => {
	// Target specific upload button using your provided selector
	const uploadBtn = document.querySelector("#nested-tab-profile > div:nth-child(1) > div > button");
	
	if (!uploadBtn) {
	  console.error('Upload button not found! Check selector:', "#nested-tab-profile > div:nth-child(1) > div > button");
	  return;
	}
  
	// Create delete button
	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'red-button delete-profile-pic blue-button';
	deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>'; 
	
	// Modified click handler with confirmation dialog
	deleteBtn.addEventListener('click', () => {
	  createDialog({
		title: 'Delete Profile Picture',
		content: 'Are you sure you want to delete your profile picture?',
		buttons: [
		  {
			text: 'Yes',
			callback: async () => {
			  try {
				await chrome.storage.local.remove('choose_profile_picture');
				console.log('Profile picture cleared');
				// Silent visual feedback
				deleteBtn.innerHTML = '<i class="fa fa-check"></i>';
				deleteBtn.disabled = true;
			  } catch (error) {
				console.error('Deletion failed:', error);
				deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
			  }
			}
		  },
		  {
			text: 'No',
			//callback: () => console.log('Deletion cancelled'), NOT NEEDED
			classname: 'dialog-button-not'
		  }
		]
	  });
	});
  
	// Insert delete button next to upload button
	uploadBtn.insertAdjacentElement('afterend', deleteBtn);
  };
  
  // Run when page loads
  document.addEventListener('DOMContentLoaded', addDeleteButton);
  // Fallback in case DOM loads slowly
  setTimeout(addDeleteButton, 500);
  
  // end weird implementation
  
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

		const [snap_load] = await Promise.all([loadSettingPromise("snap-load")]);
		settingsPage.addSetting('advanced', {
			name: 'snap-load',
			label: 'Snap Load',
			tooltip: 'Attempts to make Kamar load faster by removing the loading screen. Note that this may cause some pages to not load properly.',
			type: 'toggle',
			default: snap_load ?? false,
			callback: (val) => saveSetting("snap_load", val)
		});

		/* Doesn't work: may have a look at later */
		/* const [hide_external_js_warning] = await Promise.all([loadSettingPromise("hide_external_js_warning")]);
		settingsPage.addSetting('advanced', {
			name: 'hide_external_js_warning',
			label: 'Hide External JS Warning',
			tooltip: 'Hides the dialog warning when you apply a theme with external JavaScript.',
			type: 'toggle',
			default: hide_external_js_warning ?? false,
			callback: (val) => saveSetting("hide_external_js_warning", val)
		}); */

		const [show_attendance_info_class_name_tips] = await Promise.all([loadSettingPromise("show_attendance_info_class_name_tips")]);
		settingsPage.addNestedSetting('general', {
			name: 'show_attendance_info_class_name_tips',
			label: 'Show Class Name Info Tips (Attendance)',
			tooltip: 'Shows class name info tips on the attendance page. Note that this is only available for select schools.',
			type: 'toggle',
			default: show_attendance_info_class_name_tips ?? true,
			callback: (val) => saveSetting("show_attendance_info_class_name_tips", val)
		});

		// Modified Navbar Settings
		const [dynamic_navbar, dynamic_navbar_hidden_navbar_pages, dynamic_navbar_show_betterkmr_lightbulb] = await Promise.all([
			loadSettingPromise("dynamic_navbar"),
			loadSettingPromise("dynamic_navbar_hidden_navbar_pages"),
			loadSettingPromise("dynamic_navbar_show_betterkmr_lightbulb"),
		]);
		settingsPage.addNestedSetting('general', {
			name: 'dynamic_navbar',
			label: 'Dynamic Navbar',
			tooltip: 'A modified, dynamic version of the navbar, enabled by default. Disable if there are issues.',
			type: 'toggle',
			default: dynamic_navbar ?? true,
			callback: (val) => saveSetting("dynamic_navbar", val),
			children: [{
				name: 'dynamic_navbar_hidden_navbar_pages',
				label: 'Hidden Navbar Pages',
				tooltip: 'Pages to hide from the navbar. Separate with commas (e.g. "Student Details, Contact, Calendar").',
				type: 'text',
				default: dynamic_navbar_hidden_navbar_pages ?? '',
				callback: (val) => saveSetting("dynamic_navbar_hidden_navbar_pages", val)
			},
			{
				name: 'dynamic_navbar_show_betterkmr_lightbulb',
				label: 'Show BetterKMR Lightbulb',
				tooltip: 'Shows the lightbulb next to "My Account", which links to the BetterKMR settings page.',
				type: 'toggle',
				default: dynamic_navbar_show_betterkmr_lightbulb ?? true,
				callback: (val) => saveSetting("dynamic_navbar_show_betterkmr_lightbulb", val)
			},
		]
		});
		const [better_notices_enabled, hide_rss_link_better_notices] = await Promise.all([
			loadSettingPromise("better_notices_enabled"),
			loadSettingPromise("hide_rss_link_better_notices")
		]);
		settingsPage.addNestedSetting('general', {
			name: 'better_notices_enabled',
			label: 'Better Notices Page',
			tooltip: 'Improves the experience of the notices page, allowing you to delete specific/all notices.',
			type: 'toggle',
			default: better_notices_enabled ?? true,
			callback: (val) => saveSetting("better_notices_enabled", val),
			children: [{
				name: 'hide_rss_link_better_notices',
				label: 'Hide RSS Link',
				tooltip: 'Hides the RSS link on the notices page, because why would an everyday user need it?',
				type: 'toggle',
				default: hide_rss_link_better_notices ?? false,
				callback: (val) => saveSetting("hide_rss_link_better_notices", val)
			}]
		});
		// Danger Zone
		settingsPage.addNestedSetting('danger-zone', {
			name: 'reset_all_data',
			label: 'Reset Chrome Extension (All Data)',
			tooltip: 'Removes all data stored by the extension, including settings and themes. Cannot be undone.',
			type: 'button',
			default: null,
			callback: () => {
				createDialog({
					title: `Reset BetterKMR Data`,
					content: 'Hold on! Are you sure you want to reset BetterKMR data? <br>This action restores BetterKMR to stock settings and can\'t be undone.<br><br>What you\'ll clear:<br>- All settings data<br>- All themes data, including Custom Themes<br><br>Are you sure you want to clear your data?',
					buttons: [
						{
							text: 'Cancel',
							callback: () => console.log('Cancelled'),
							classname: 'dialog-button-not',
						},
						{
							text: 'OK',
							callback: () => clearAllData(),
						},
					],
				});
			}
		});
		try {
			const response = await fetch(chrome.runtime.getURL('../src/config/general.yml'));
			if (response.ok) {
				const yamlText = await response.text();
				const yamlContent = jsyaml.load(yamlText);
				if (yamlContent) {
					let version = yamlContent.version || chrome.runtime.getManifest().version;
					document.getElementById("sidebar-version-id").textContent = "v" + version;
					document.getElementById("sidebar-version-id").style.display = 'block';
					document.getElementById("version-number").textContent = "Version " + version;
				}
			}
		} catch (error) {
			console.warn('Failed to load version from general.yml:', error);
		}
		document.body.style.visibility = 'visible';
	};

	initialiseSettings();

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

	function showRedemptionDialog() {
		createDialog({
			title: 'Redeem BetterKMR Code',
			content: `
			    <p>Enter a BetterKMR code to redeem it:</p>
				<input type="text" id="redemption-code" class="dialog-input" placeholder="Enter code..." style="
					font-family: 'Inter', sans-serif;
					width: 50%;
					padding: 8px;
					margin: 10px 0;
					border: 1px solid #444;
					border-radius: 4px;
					background: #2a2a2a;
					color: #fff;
					text-align: center;
				">
				<div id="redemption-error" style="color: #ff5555; margin-top: 5px; display: none;"></div>
				<p style="color: grey;">Note: Codes can only be redeemed once. All codes are non case-sensitive.</p>
				<p style="color: grey; font-size: 10px;">BetterKMR codes are usually given out by staff, and can give you certain perks or are for development purposes.</p>
			`,
			buttons: [
				{
					text: 'Cancel',
					callback: () => console.log('Redemption cancelled'),
					classname: 'dialog-button-not'
				},
				{
					text: 'Redeem',
					callback: () => handleCodeRedemption(),
				}
			]
		});
	}

	
	document.querySelectorAll('.icon-button').forEach(button => {
		button.addEventListener('click', () => {
			const url = button.getAttribute('data-url');
			if (url) {
				window.open(url, '_blank').focus();
				return;
			}

			const tabId = button.getAttribute('data-tab');
			if (tabId === 'redeem-code') {
				showRedemptionDialog();
			}
		});
	});

	// Code definitions and their callbacks
	const VALID_CODES = {
		'SILKSONGISREAL': {
			reward: 'Unlocked Silksong Counter (Limited Time Exclusive)',
			callback: () => {
				// Example callback for special theme unlock
				createNotification('Successfully redeemed! (check the Visual Theme Editor to see a surprise)', '#3c8443', '#ffffff');
			}
		},
	/*	'BETTERKMR2024': {
			reward: 'Unlocked special theme',
			callback: () => {
				// Example callback for special theme unlock
				createNotification('Special theme unlocked!', '#3c8443', '#ffffff');
			}
		},
		'EARLYBIRD': {
			reward: 'Early supporter badge',
			callback: () => {
				// Example callback for badge
				createNotification('Early supporter badge unlocked!', '#3c8443', '#ffffff');
			}
		}
    */
	};

	function handleCodeRedemption() {
		const codeInput = document.getElementById('redemption-code');
		const errorDiv = document.getElementById('redemption-error');
		const code = codeInput.value.trim().toUpperCase();

		// Check if code exists
		if (!VALID_CODES[code]) {
			createNotification("Code is invalid or has expired.", "#b71c1c", "#ffffff");
			return;
		}

		// Check if code was already redeemed
		chrome.storage.sync.get('redeemedCodes', (data) => {
			const redeemedCodes = data.redeemedCodes || [];
			
			if (redeemedCodes.includes(code)) {
				createNotification("This code has been previously redeemed.", "#b71c1c", "#ffffff");
				return;
			}

			// Store the redeemed code
			redeemedCodes.push(code);
			chrome.storage.sync.set({ redeemedCodes }, () => {
				// Close the dialog by removing it
				const overlay = document.querySelector('.dialog-overlay');
				if (overlay) {
					document.body.removeChild(overlay);
				}

				// Execute the callback for this code
				VALID_CODES[code].callback();
				createNotification(`Successfully redeemed: ${VALID_CODES[code].reward}`, '#3c8443', '#ffffff');
			});
		});
	}

	function clearAllData() {
		chrome.storage.sync.clear(function() {
			var error = chrome.runtime.lastError;
			if (error) {
				console.error(error);
			}
			createDialog({
				title: `BetterKMR Data Reset`,
				content: 'Successfully cleared all of your data.',
				buttons: [
					{
						text: 'OK',
						callback: () => window.location.reload(),
					},
				],
			});
		});
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
		} else if (title === 'Vivid Winter') {
			addBadge(imgWrapper, '🎬 Animated', 'animated-badge');
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
			window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL(
				'settings/theme_detail.html?themeID=' + customID
			);
		});

		const button = document.createElement('button');
		button.className = 'download-button';
		button.textContent = 'Apply';
		button.addEventListener('click', async function() {
			const [hide_external_js_warning] = await Promise.all([loadSettingPromise('hide_external_js_warning')]);
			
			if (externalJS && (!hide_external_js_warning)) {
				const response = await fetch(/* webpackIgnore: true */ chrome.runtime.getURL('src/config/general.yml'));
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
			const response = await fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/config/themes.yml"));
			const data = await response.text();
			const yamlToJson = jsyaml.load(data);
			const themeCount = Object.keys(yamlToJson).length;
			let loadedThemes = 0;

			const themesArray = Object.entries(yamlToJson)
				.filter(([key]) => key !== "1")
				.map(([key, theme]) => ({
					key,
					...theme,
					order_id: theme.order_id ?? Number.MAX_SAFE_INTEGER
				}));

			themesArray.sort((a, b) => a.order_id - b.order_id);

			themesArray.forEach(theme => {
				if (!theme.css) {
					assert(`Theme with key "${theme.key}" does not have a CSS stylesheet attached!`);
					return;
				}
				if (!theme.author) {
					assert(`Theme with key "${theme.key}" does not have an author!`);
					return;
				}

				createThemeCard(
					theme.key,
					theme.name,
					"../../assets/" + theme.thumbnail,
					theme.author,
					theme.highlight,
					theme.description || null,
					theme.js,
					onApply,
					theme.tags
				);
				loadedThemes++;
			});

			if (loadedThemes === themesArray.length) {
				setTimeout(() => {
					document.getElementById("loader").style.display = "none";
					document.getElementById("theme-grid").style.display = "grid";
				}, 1250);
			}
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
            
            searchInput.value = '';
            
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

		if (Math.random() > 0.75) {
			createNotification("If you haven't already, you should join our Discord! Go to the About & Contact section.", "#738adb", "#ffffff");
		}
	const tabs = document.querySelectorAll('.tab-item');
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			if (tab.textContent === 'Website & Docs ↗') {
				window.open('https://interlabs-official.github.io', '_blank').focus();
				return;
			}
			if (tab.textContent === 'Discord Server ↗') {
				window.open('https://discord.gg/4MkRmFmHz2', '_blank').focus();
				return;
			}
			if (tab.textContent === 'About & Contact') {
				document.body.classList.add('gradient-background');
				document.querySelector('.sidebar').classList.add('sidebar-transparency');
			} else {
				document.body.classList.remove('gradient-background');
				document.querySelector('.sidebar').classList.remove('sidebar-transparency');
			}
			let previousTabId = null;
			tabs.forEach((t) => {
				if (t.classList.contains('active')) {
					t.classList.remove('active')
					previousTabId = t.getAttribute('data-tab');
				}
			});
			//tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');
	   
			const tabContents = document.querySelectorAll('.tab-content');
			tabContents.forEach(tc => tc.classList.remove('active'));
			   
			const tabId = tab.getAttribute('data-tab');
			document.getElementById('tab-' + tabId).classList.add('active');
	   
			// reset nested tabs to first tab when switching main tabs
			const nestedTabs = document.querySelectorAll('.nested-tab-item');
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
					setUpCustomThemesList();
				});
				
				const searchInput = document.getElementById('theme-search-input');
				if (searchInput) {
					searchInput.value = '';
				}
			}
			settingsPage.triggerTabSwitch(previousTabId, tabId);
		});
	});

	window.selectNestedTab = function(nTab) {
		const tabId = nTab.getAttribute('data-nested-tab');
		console.log(tabId);
		/*if (tabId === "navbar-editor") {
			window.location.href = (chrome.runtime.getURL("settings/navbar_drop.html"));
			return;
		}
		if (tabId === "submit-your-themes") {
			window.open("mailto:interlabsofficial@gmail.com?subject=Theme%20Submission&body=Theme%20Name%3A%20NAME%20HERE%0ATheme%20Author%3A%20NAME%20HERE%0ATheme%20Description%20(Max%2032%20characters)%3A%20DESCRIPTION%20HERE%0ATheme%20Tags%20(Optional)%3A%20TAGS%20HERE%0AThumbnail%20Image%20(can%20be%20background%20image%2C%20link%20or%20upload%20below)%3A%20IMAGE%20HERE%0A%0ASubmit%20your%20theme%20as%20a%20css%20file%2C%20or%20paste%20the%20contents%20below.%0A%0AAny%20updates%2C%20email%20us%20again%20through%20this%20thread.");
			return;
		} */
		document.querySelectorAll('.nested-tab-item').forEach(t => t.classList.remove('active'));
		document.querySelectorAll('.nested-tab-content').forEach(tc => tc.classList.remove('active'));

		nTab.classList.add('active');
		document.getElementById('nested-tab-' + tabId).classList.add('active');

		if (tabId === "default-themes" || tabId === "market-themes" || tabId === "custom-themes") {
			const searchInput = document.getElementById('theme-search-input');
			if (searchInput) {
				searchInput.value = '';
				const themeCards = document.querySelectorAll('.theme-card');
				themeCards.forEach(card => {
					if (card.id !== "1") {
						card.style.display = 'flex';
					}
				});
				const noResultsMessage = document.getElementById('no-theme-results');
				if (noResultsMessage) {
					noResultsMessage.style.display = 'none';
				}
			}
			if (tabId === "custom-themes") {
				setUpCustomThemesList();
			}
		}
	}

   	document.querySelectorAll('.nested-tab-item').forEach(nTab => {
   		nTab.addEventListener('click', () => {
   			selectNestedTab(nTab);
   		});
   	});

   	window.settingsPage = settingsPage;
   	window.isItemToggled = settingsPage.isItemToggled.bind(settingsPage);

   	const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
   	let inputIndex = 0;
   	
   	document.addEventListener('keydown', event => {
   		const isOnAboutTab = Array.from(tabs).find(tab => 
   			tab.classList.contains('active') && tab.textContent == "About & Contact"
   		) != null;

   		if (event.key === konamiCode[inputIndex] && isOnAboutTab && !window.isSecretCodeActivated) {
   			inputIndex++;
   			if (inputIndex === konamiCode.length) {
				window.isSecretCodeActivated = true;
   				triggerSecretAnimation();
   				inputIndex = 0;
   			}
   		} else {
   			inputIndex = 0;
   		}
   	});

   	function triggerSecretAnimation() {
		const secretTab = document.getElementById('advanced-tab-header');

		document.body.classList.add('gradient-fade-out')
   		
   		const tabRect = secretTab.getBoundingClientRect();
   		
   		secretTab.style.display = 'block';
   		secretTab.classList.add('konami-reveal');

   		createNotification("Secret unlocked!", "#3c8443", "#ffffff");
   	}
   	
   	function getRandomColor() {
   		const colors = [
   			'#FF5252', // Red
   			'#FF4081', // Pink
   			'#7C4DFF', // Purple
   			'#448AFF', // Blue
   			'#64FFDA', // Teal
   			'#B2FF59', // Light Green
   			'#FFFF00', // Yellow
   			'#FF9800'  // Orange
   		];
   		return colors[Math.floor(Math.random() * colors.length)];
   	}

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

	const applyButton = createButton("apply-custom-theme", "#3498db", "");
	const editButton = createButton("edit-theme", "#3498db", "");
	const cloneButton = createButton("clone-theme", "#3498db", "");
	const deleteButton = createButton("delete-theme", "#e74c3c", "");

	deleteButton.addEventListener('click', () => {
			createDialog({
				title: `Delete Theme`,
				content: `Delete theme "${themeName}"?<br><br>This action cannot be undone.<br>We cannot provide support for deleted themes.`,
				buttons: [
					{
						text: 'Yes',
						callback: () => deleteTheme(customID),
						classname: 'dialog-button-danger',
					},
					{
						text: 'No',
						callback: () => console.log("Cancelled deletion of theme \"${themeName}\""),
						classname: 'dialog-button-not',
					},
				],
			});
	});

	const deleteImg = document.createElement("img");
	deleteImg.src = "../assets/images/font-awesome/trash-solid.svg";
	deleteImg.width = "12";
	deleteImg.height = "12";
	deleteImg.classList.add("svg-white");
	deleteButton.appendChild(deleteImg);

	cloneButton.addEventListener('click', () => {
		createDialog({
			title: `Clone Theme`,
			content: `Create a copy of theme "${themeName}"?`,
			buttons: [
				{
					text: 'Yes',
					callback: () => cloneTheme(customID),
				},
				{
					text: 'No',
					callback: () => console.log("Cancelled deletion of theme \"${themeName}\""),
					classname: 'dialog-button-not',
				},
			],
		});
	});

	const cloneImg = document.createElement("img");
	cloneImg.src = "../assets/images/font-awesome/clone-solid.svg";
	cloneImg.width = "12";
	cloneImg.height = "12";
	cloneImg.classList.add("svg-white");
	cloneButton.appendChild(cloneImg);

	editButton.addEventListener('click', () => {
		showEditorSelectionDialog(customID, false);
	});

	const editImg = document.createElement("img");
	editImg.src = "../assets/images/font-awesome/edit-solid.svg";
	editImg.width = "12";
	editImg.height = "12";
	editImg.classList.add("svg-white");
	editButton.appendChild(editImg);

	applyButton.addEventListener('click', () => {
		const previousButton = document.getElementById("greyed-out-applied");
		if (previousButton) {
			const previousCheckImg = previousButton.getElementsByTagName("img")[0];
			previousCheckImg.src = "../assets/images/font-awesome/plus-solid.svg";
			previousButton.disabled = false;
			previousButton.removeAttribute("id");
		}

		if (applyButton) {
			applyButton.setAttribute("id", "greyed-out-applied");
			applyButton.disabled = true;
			const currentCheckImg = applyButton.getElementsByTagName("img")[0];
			currentCheckImg.src = "../assets/images/font-awesome/check-solid.svg";
		}
		
		saveSetting('theme-id-text', customID);
		createNotification(`Custom theme "${themeName}" has been successfully applied.`, "#3c8443", "#ffffff");
	});

	const applyImg = document.createElement("img");
	applyImg.src = "../assets/images/font-awesome/plus-solid.svg";
	applyImg.width = "12";
	applyImg.height = "12";
	applyImg.classList.add("svg-white");
	applyButton.appendChild(applyImg);

	actionsDiv.append(applyButton, editButton, cloneButton, deleteButton);
	li.append(span, actionsDiv);

	return li;
}

function getAllCustomThemes(callback) {
	chrome.storage.local.get('themes', data => callback(data.themes || {}));
}

function setUpCustomThemesList() {
	const customThemesList = document.getElementById("custom-themes-list");
	customThemesList.innerHTML = '';
	
	chrome.storage.sync.get(["theme-id-text"], (result) => {
		const currentThemeId = result["theme-id-text"] || "0";
		
		getAllCustomThemes(themes => {
			var total = 0;
			Object.entries(themes).forEach(([id, theme]) => {
				const themeItem = createCustomThemeItem(theme.name, id);
				total += 1;
				
				if (id === currentThemeId) {
					const applyButton = themeItem.querySelector('.apply-custom-theme');
					if (applyButton) {
						applyButton.setAttribute("id", "greyed-out-applied");
						applyButton.disabled = true;
						const checkImg = applyButton.getElementsByTagName("img")[0];
						checkImg.src = "../assets/images/font-awesome/check-solid.svg";
					}
				}
				
				customThemesList.appendChild(themeItem);
			});
			if (total > 1) {
				document.getElementById("delete-all-themes-button").style.display = "block";
			} else {
				document.getElementById("delete-all-themes-button").style.display = "none";
			}
		});
	});
}

setUpCustomThemesList();

document.getElementById("new-custom-theme-button").addEventListener('click', () => {
	showEditorSelectionDialog('new_theme', true);
});

document.getElementById("delete-all-themes-button").addEventListener('click', () => {
    chrome.storage.local.get('themes', data => {
        const themes = data.themes || {};
        const themeCount = Object.keys(themes).length;
        
        if (themeCount === 0) {
            createNotification("No custom themes to delete.", "#e74c3c", "#ffffff");
            return;
        }

        createDialog({
            title: 'Delete All Themes',
            content: `Are you sure you want to delete all ${themeCount} custom theme${themeCount === 1 ? '' : 's'}? This action cannot be undone.`,
            buttons: [
                {
                    text: 'Delete All',
                    callback: () => {
						createDialog({
							title: 'Delete All Themes - Final Warning',
							content: `Final warning!<br>Are you sure you want to delete all ${themeCount} custom theme${themeCount === 1 ? '' : 's'}?<br>This action cannot be undone, and we cannot provide support for deleted themes.`,
							buttons: [
								{
									text: 'Confirm & Delete All',
									callback: () => {
										chrome.storage.local.set({themes: {}}, () => {
											if (chrome.runtime.lastError) {
												console.error("Error deleting themes:", chrome.runtime.lastError);
												createNotification("Error deleting themes. Please try again.", "#e74c3c", "#ffffff");
											} else {
												createNotification(`Successfully deleted all custom themes.`, "#3c8443", "#ffffff");
												setUpCustomThemesList();
											}
										});
									},
									classname: 'dialog-button-danger'
								},
								{
									text: 'Cancel',
									callback: () => console.log("Cancelled deletion of all themes"),
									classname: 'dialog-button-not'
								}
							]
						});
                    },
                    classname: 'dialog-button-danger'
                },
                {
                    text: 'Cancel',
                    callback: () => console.log("Cancelled deletion of all themes"),
                    classname: 'dialog-button-not'
                }
            ]
        });
    });
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

function cloneTheme(themeId) {
	chrome.storage.local.get('themes', data => {
		const themes = data.themes || {};
		if (themes[themeId]) {
			const clonedTheme = { ...themes[themeId] };
			const newThemeId = `${themeId}_copy_${Date.now()}`;
			clonedTheme.name = `${clonedTheme.name} (Copy)`;
			themes[newThemeId] = clonedTheme;

			chrome.storage.local.set({ themes }, () => {
				if (chrome.runtime.lastError) {
					console.error("Error cloning theme:", chrome.runtime.lastError);
					alert("Error cloning theme. Please try again.");
				} else {
					createNotification(`Successfully cloned theme.`, "#3c8443", "#ffffff");
					setUpCustomThemesList();
				}
			});
		} else {
			console.log("Theme not found.");
			alert("Theme not found.");
		}
	});
}

function showEditorSelectionDialog(themeId, isNew = false) {
	createDialog({
		title: isNew ? 'Create New Theme' : 'Edit Theme',
		content: 'How would you like to edit this theme?',
		buttons: [
			{
				text: 'Visual Theme Editor',
				callback: () => {
					window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL(`settings/visual_theme.html?themeID=${themeId}`);
				},
				classname: 'vtt-button'
			},
			{
				text: 'Code Editor',
				callback: () => {
					window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL(`settings/theme_edit.html?themeID=${themeId}`);
				},
				classname: 'dialog-button'
			},
			{
				text: 'Cancel',
				callback: () => console.log('Cancelled editor selection'),
				classname: 'dialog-button-not'
			}
		]
	});
}

if (document.getElementById("tab-general")) {
		var ran = Math.random()
		console.log("Threshold to get the \"support\" notification: " + ran + " / 0.85");
		if (ran > 0.85) {
			document.getElementById("tab-general").insertAdjacentHTML("beforebegin", `
				<div id="update-notice" class="update-notice">
				  <span class="update-ex-text">BetterKMR needs your help! If you find any bugs or glitches, please report them in the <a href="https://github.com/Interlabs-Official/BetterKMR/issues" target="_blank" style="color: #fff;">GitHub repository</a> or on our <a href="https://discord.gg/HjJvakyAXe" target="_blank" style="color: #fff;">Discord server</a>.</span>
				  <span class="smaller-text">&nbsp;Click this notification to close.</span>
			  </div>
					`);
			document.getElementById("update-notice").addEventListener('click', () => {
					document.getElementById("update-notice").remove();
			});
			//chrome.storage.sync.set({ 'update_notice_closed': true });
		}
}

function handleSettingsTheme(theme, doUpdate) {
	if (theme === 'default' && doUpdate != true) return;
    const existingThemeLink = document.getElementById('settings-theme-stylesheet');
    if (existingThemeLink) {
        existingThemeLink.remove();
    }

    //if (theme !== 'settings-default') {
        const link = document.createElement('link');
        link.id = 'settings-theme-stylesheet';
        link.rel = 'stylesheet';
        link.href = `../src/themes/${theme}.css`;
        document.head.appendChild(link);
    //}

    chrome.storage.sync.set({ settingsTheme: theme });
    
	if (doUpdate == true) {
		if (theme === 'settings-default-visual-refresh-01b_beta') {
			createNotification("This theme is not actively maintained and is known to have issues. Proceed at your own expense.", "#961a1a", "#ffffff");
		}
		createNotification(`Settings theme updated! Some changes may require a refresh.`, "#3c8443", "#ffffff");
	}
}

function initSettingsTheme() {
    const themeSelector = document.getElementById('settings-theme-selector');
    
    chrome.storage.sync.get(['settingsTheme'], function(result) {
        const savedTheme = result.settingsTheme || 'default';
        themeSelector.value = savedTheme;
        handleSettingsTheme(savedTheme);
    });

    themeSelector.addEventListener('change', function() {
        handleSettingsTheme(themeSelector.value, true);
    });
}

function checkUpdateNotification() {
    chrome.storage.local.get([
        'updateAvailable',
        'latestVersion',
        'changelog',
        'versionHighlight'
    ], (result) => {
        if (result.updateAvailable) {
            const existingUpdate = document.querySelector('.update-notification');
            if (!existingUpdate) {
                const banner = document.createElement('div');
                banner.className = 'update-notification';
                banner.innerHTML = `
                    <span class="update-text">
                        Your version (v${chrome.runtime.getManifest().version}) is out of date - v${result.latestVersion} is available: ${result.versionHighlight || ''}
                    </span>
                    <a href="${result.changelog}" target="_blank" style="color: white; text-decoration: underline;">View changelog</a>
                    <button class="update-close" title="Dismiss">&times;</button>
                `;
                
                insertIntoBannerContainer(banner);

                banner.querySelector('.update-close').addEventListener('click', () => {
                    banner.remove();
                    chrome.storage.local.set({ 'update_notice_closed': true });
                });
            }
        }
    });
}

function checkAnnouncement() {
	chrome.storage.local.get(['announcement', 'announcement_dismissed', 'last_announcement'], (result) => {
		if (result.announcement && result.announcement.trim() !== '') {
			if (result.announcement !== result.last_announcement) {
				chrome.storage.local.set({
					'announcement_dismissed': false,
					'last_announcement': result.announcement
				});
			}

			if (!result.announcement_dismissed) {
				const existingAnnouncement = document.querySelector('.announcement-banner');
				if (!existingAnnouncement) {
					const banner = document.createElement('div');
					banner.className = 'announcement-banner';
					banner.innerHTML = `
						<span class="announcement-text">${result.announcement}</span>
						<button class="announcement-close" title="Dismiss">&times;</button>
					`;
					
					insertIntoBannerContainer(banner);

					banner.querySelector('.announcement-close').addEventListener('click', () => {
						banner.remove();
						chrome.storage.local.set({ 'announcement_dismissed': true });
					});
				}
			}
		}
	});
}

function insertIntoBannerContainer(banner) {
	let container = document.querySelector('.banner-container');
	if (!container) {
		container = document.createElement('div');
		container.className = 'banner-container';
		const content = document.querySelector('.content');
		content.insertBefore(container, content.firstChild);
	}
	container.appendChild(banner);
}

document.addEventListener('DOMContentLoaded', async () => {
	const delay = ms => new Promise(res => setTimeout(res, ms));
	//await delay(500);
	checkAnnouncement();
	checkUpdateNotification();
	await delay(250);
	const dynNavigationDiv = document.querySelector("#nested-tab-general > div:nth-child(5) > div");
	// NOTE: dynamic navbar is 5th from the top, using conor's AI's hacky method because my method didn't want to work
	if (dynNavigationDiv.getElementsByClassName("setting-label")[0].textContent === "Dynamic Navbar") {
		const button = document.createElement("button");
		button.className = "dynamic-navbar-customise-button control";
		button.style.marginLeft = "10px";
		button.textContent = "✨ Customise";
		button.addEventListener('click', () => {
			window.location.href = (/* webpackIgnore: true */ chrome.runtime.getURL("settings/navbar_drop.html"));
		})
		dynNavigationDiv.insertBefore(button, dynNavigationDiv.getElementsByClassName("info-icon")[0].nextSibling);
	}
});

function convertThemeToNewVersion(themeData) {
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
  themeData.vtt_version = "1.2.0";
  return themeData;
}