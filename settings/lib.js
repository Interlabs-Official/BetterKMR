/**********************************************************************
     * Storage Helpers
     **********************************************************************/

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

function loadSetting(key, callback) {
  if (window.chrome && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(key, function(result) {
      if (callback) { callback(result[key]); }
      return result[key];
    });
  } else {
    if (callback) { callback(JSON.parse(localStorage.getItem(key))); }
    return JSON.parse(localStorage.getItem(key));
  }
  return null; 
}

function loadSettingPromise(key) {
  return new Promise((resolve, reject) => {
    if (window.chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(key, function(result) {
        resolve(result[key]);
      });
    } else {
      resolve(JSON.parse(localStorage.getItem(key)));
    }
  });
}

/**********************************************************************
 * SettingsPage Class
 **********************************************************************/
export class SettingsPage {
  constructor() {
    this.settingsRegistry = {};
    this.tabSwitchHandlers = []; // array to store tab switch event handlers
  }

  /**
   * Adds a new setting item to a given main tab.
   * @param {string} tabId - The ID suffix of the tab (e.g., "general")
   * @param {object} setting - The setting definition object.
   */
  addSetting(tabId, setting) {
    const tabContent = document.getElementById('tab-' + tabId);
    if (!tabContent) {
      console.error('Tab not found: ' + tabId);
      return;
    }
    const settingDiv = document.createElement('div');
    settingDiv.className = 'setting-item';

    const header = document.createElement('div');
    header.className = 'setting-header';

    const label = document.createElement('span');
    label.className = 'setting-label';
    label.textContent = setting.label;
    header.appendChild(label);

    if (setting.tooltip) {
      const infoIcon = document.createElement('span');
      infoIcon.className = 'info-icon';
      infoIcon.innerHTML = '<img src="../assets/images/font-awesome/info-circle-solid.svg" width="16px" height="16px" style="opacity: 50%" alt="Info" />'
      //infoIcon.textContent = 'ⓘ';
      const tooltipSpan = document.createElement('span');
      tooltipSpan.className = 'tooltip';
      tooltipSpan.textContent = setting.tooltip;
      infoIcon.appendChild(tooltipSpan);
      header.appendChild(infoIcon);
    }

    let control;
    switch (setting.type) {
      case 'toggle':
        control = this.createToggle(setting);
        break;
      case 'dropdown':
        control = this.createDropdown(setting);
        break;
      case 'text':
        control = this.createTextBox(setting);
        break;
      case 'button':
        control = this.createButton(setting);
        break;
      default:
        control = document.createElement('span');
        control.textContent = 'Unsupported control';
    }
    control.classList.add('control');
    header.appendChild(control);
    settingDiv.appendChild(header);

    if (setting.children && Array.isArray(setting.children) && setting.children.length > 0) {
      const expandArrow = document.createElement('span');
      expandArrow.className = 'expand-arrow';
      expandArrow.textContent = '▼';
      header.appendChild(expandArrow);

      const childContainer = document.createElement('div');
      childContainer.className = 'child-settings';
      setting.children.forEach(childSetting => {
        const childSettingElement = this.createChildSetting(childSetting);
        childContainer.appendChild(childSettingElement);
      });
      settingDiv.appendChild(childContainer);

      header.addEventListener('click', (e) => {
        if (['input','select','button'].indexOf(e.target.tagName.toLowerCase()) === -1) {
          childContainer.style.display = (childContainer.style.display === 'block') ? 'none' : 'block';
        }
      });
    }

    this.settingsRegistry[setting.name] = {
      element: control,
      type: setting.type,
      value: setting.default,
      callback: setting.callback || function(val) {},
    };

    tabContent.appendChild(settingDiv);
  }

        /**
 * Adds a new setting item into a nested tab container.
 */
addNestedSetting(nestedTabId, setting) {
  const nestedTabContent = document.getElementById('nested-tab-' + nestedTabId);
  if (!nestedTabContent) {
    console.error('Nested tab not found: ' + nestedTabId);
    return;
  }
  const settingDiv = document.createElement('div');
  settingDiv.className = 'setting-item';

  const header = document.createElement('div');
  header.className = 'setting-header';

  const label = document.createElement('span');
  label.className = 'setting-label';
  label.textContent = setting.label;
  header.appendChild(label);

  if (setting.tooltip) {
    const infoIcon = document.createElement('span');
    infoIcon.className = 'info-icon';
    infoIcon.innerHTML = '<img src="../assets/images/font-awesome/info-circle-solid.svg" width="16px" height="16px" style="opacity: 50%" alt="Info" />'
    //infoIcon.textContent = 'ⓘ';
    const tooltipSpan = document.createElement('span');
    tooltipSpan.className = 'tooltip';
    tooltipSpan.textContent = setting.tooltip;
    infoIcon.appendChild(tooltipSpan);
    header.appendChild(infoIcon);
  }

  let control;
  switch (setting.type) {
    case 'toggle': control = this.createToggle(setting); break;
    case 'dropdown': control = this.createDropdown(setting); break;
    case 'text': control = this.createTextBox(setting); break;
    case 'button': control = this.createButton(setting); break;
    default:
      control = document.createElement('span');
      control.textContent = 'Unsupported control';
  }
  control.classList.add('control');
  header.appendChild(control);
  settingDiv.appendChild(header);

  if (setting.children && Array.isArray(setting.children) && setting.children.length > 0) {
    const expandArrow = document.createElement('span');
    expandArrow.className = 'expand-arrow';
    expandArrow.textContent = '▼';
    header.appendChild(expandArrow);

    const childContainer = document.createElement('div');
    childContainer.className = 'child-settings';
    setting.children.forEach(childSetting => {
      const childSettingElement = this.createChildSetting(childSetting);
      childContainer.appendChild(childSettingElement);
    });
    settingDiv.appendChild(childContainer);

    header.addEventListener('click', (e) => {
      if (['input', 'select', 'button'].indexOf(e.target.tagName.toLowerCase()) === -1) {
        childContainer.style.display = (childContainer.style.display === 'block') ? 'none' : 'block';
      }
    });
  }

  this.settingsRegistry[setting.name] = {
    element: control,
    type: setting.type,
    value: setting.default,
    callback: setting.callback || function(val) {}
  };

  nestedTabContent.appendChild(settingDiv);
}

  /**
   * Creates a child setting element (for collapsible child settings).
   */
  createChildSetting(setting) {
    const settingDiv = document.createElement('div');
    settingDiv.className = 'setting-item';

    const header = document.createElement('div');
    header.className = 'setting-header';

    const label = document.createElement('span');
    label.className = 'setting-label';
    label.textContent = setting.label;
    header.appendChild(label);

    if (setting.tooltip) {
      const infoIcon = document.createElement('span');
      infoIcon.className = 'info-icon';
      infoIcon.innerHTML = '<img src="../assets/images/font-awesome/info-circle-solid.svg" width="16px" height="16px" style="opacity: 50%" alt="Info" />'
      //infoIcon.textContent = 'ⓘ';
      const tooltipSpan = document.createElement('span');
      tooltipSpan.className = 'tooltip';
      tooltipSpan.textContent = setting.tooltip;
      infoIcon.appendChild(tooltipSpan);
      header.appendChild(infoIcon);
    }

    let control;
    switch (setting.type) {
      case 'toggle':
        control = this.createToggle(setting);
        break;
      case 'dropdown':
        control = this.createDropdown(setting);
        break;
      case 'text':
        control = this.createTextBox(setting);
        break;
      case 'button':
        control = this.createButton(setting);
        break;
      default:
        control = document.createElement('span');
        control.textContent = 'Unsupported control';
    }
    control.classList.add('control');
    header.appendChild(control);
    settingDiv.appendChild(header);

    this.settingsRegistry[setting.name] = {
      element: control,
      type: setting.type,
      value: setting.default,
      callback: setting.callback || function(val) {},
    };

    return settingDiv;
  }

  /**
   * Creates a toggle switch control.
   */
  createToggle(setting) {
    const container = document.createElement('label');
    container.className = 'toggle-switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = setting.default;
    const slider = document.createElement('span');
    slider.className = 'slider';
    container.appendChild(input);
    container.appendChild(slider);

    input.addEventListener('change', () => {
      const value = input.checked;
      this.settingsRegistry[setting.name].value = value;
      saveSetting(setting.name, value);
      if (setting.callback) { setting.callback(value); }
    });
    return container;
  }

  /**
   * Creates a dropdown control.
   */
  createDropdown(setting) {
    const select = document.createElement('select');
    select.className = 'dropdown';
    if (setting.options && Array.isArray(setting.options)) {
      setting.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.toLowerCase();
        option.textContent = opt;
        select.appendChild(option);
      });
      select.value = setting.default.toLowerCase();
    }
    select.addEventListener('change', () => {
      const value = select.value;
      this.settingsRegistry[setting.name].value = value;
      saveSetting(setting.name, value);
      if (setting.callback) { setting.callback(value); }
    });
    return select;
  }

  /**
   * Creates a text input control.
   */
  createTextBox(setting) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-box';
    input.value = setting.default;
    input.addEventListener('input', () => {
      const value = input.value;
      this.settingsRegistry[setting.name].value = value;
      saveSetting(setting.name, value);
      if (setting.callback) { setting.callback(value); }
    });
    return input;
  }

  /**
   * Creates a blue button control.
   */
  createButton(setting) {
    const button = document.createElement('button');
    button.className = 'blue-button';
    button.textContent = setting.label;
    button.addEventListener('click', (e) => {
      if (setting.callback) { setting.callback(e); }
    });
    return button;
  }

  /**
     * Registers a callback function to be called when tabs are switched.
     * @param {function} callback - Function that takes previousTab and newTab parameters
     * @returns {number} Handler ID that can be used to remove the handler
     */
  onTabSwitch(callback) {
    if (typeof callback !== 'function') {
      console.error('Tab switch handler must be a function');
      return -1;
    }
    this.tabSwitchHandlers.push(callback);
    return this.tabSwitchHandlers.length - 1; // return the index as an ID
  }

  /**
   * Removes a previously registered tab switch handler.
   * @param {number} handlerId - The handler ID returned from onTabSwitch
   * @returns {boolean} Whether the handler was successfully removed
   */
  removeTabSwitchHandler(handlerId) {
    if (handlerId >= 0 && handlerId < this.tabSwitchHandlers.length) {
      this.tabSwitchHandlers[handlerId] = null; // we null it out rather than splice to maintain indices
      return true;
    }
    return false;
  }

  /**
   * Triggers all registered tab switch handlers.
   * This should be called when a tab switch occurs.
   * @param {string} previousTab - ID of the previous tab, can be null
   * @param {string} newTab - ID of the new active tab, cannot be null
   */
  triggerTabSwitch(previousTab, newTab) {
    if (newTab === null) {
      console.error('New tab cannot be null when switching tabs');
      return;
    }
    
    for (const handler of this.tabSwitchHandlers) {
      if (handler) {
        try {
          handler(previousTab, newTab);
        } catch (e) {
          console.error('Error in tab switch handler:', e);
        }
      }
    }
  }

  /**
   * API method: returns the current toggled value (boolean)
   * for a given setting item (only valid for toggles).
   * @param {string} settingName
   * @returns {boolean}
   */
  isItemToggled(settingName) {
    if (this.settingsRegistry[settingName] &&
        this.settingsRegistry[settingName].type === 'toggle') {
      return this.settingsRegistry[settingName].value;
    }
    return false;
  }
}

// Export other functions if needed
export { saveSetting, loadSetting, loadSettingPromise };