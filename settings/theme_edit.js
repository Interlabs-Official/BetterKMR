document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 200);
});

const urlParams = new URLSearchParams(window.location.search);
const themeID = urlParams.get('themeID');

if (!themeID) { window.location.href = /* webpackIgnore: true */ chrome.runtime.getURL("settings/index.html");}

let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "css",
    lineNumbers: true,
    fontSize: 20,
    theme: "ayu-dark",
    extraKeys: { "Ctrl-Space": "autocomplete"},
    colorpicker: true
  });

  editor.on("inputRead", function(cm, change) {
    if (change.text[0] && /[a-zA-Z0-9_]/.test(change.text[0])) {
      cm.showHint({ completeSingle: false });
    }
  });

  let currentFontSize = 16; // starting font size

editor.getWrapperElement().addEventListener("wheel", function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
    
    if (e.deltaY < 0) {
      currentFontSize += 1;
    } else {
      currentFontSize = Math.max(1, currentFontSize - 1); // prevent negative font size
    }
    
    let codeElement = editor.getWrapperElement().querySelector(".CodeMirror-code");
    if (codeElement) {
      codeElement.style.fontSize = currentFontSize + "px";
      editor.refresh();
    }
  }
});

editor.refresh();

document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

function loadTheme() {
  if (themeID) {
    chrome.storage.local.get('themes', function(data) {
      let themes = data.themes || {};
      let theme = themes[themeID];
      if (theme) {
        editor.setValue(theme.code);
        document.getElementById('theme-name-text').value = theme.name;
      }
    });
  }
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

function getAllCustomThemes(callback) {
  chrome.storage.local.get('themes', function(data) {
    const themes = data.themes || {};
    callback(themes);
  });
}

function saveCode() {
  var ascii = /^[ -~\t\n\r]+$/;

  const code = editor.getValue();
  const themeName = document.getElementById('theme-name-text').value;

  if (themeName.length === 0) {
    createNotification("Please enter a theme name before continuing.", "#961a1a", "#ffffff");
    return;
  }

  var failedSavingCode = false;
  chrome.storage.local.getBytesInUse(null, function(bytesInUse) {
    console.log(bytesInUse);
    const availableBytes = 100 * 1024 * 1024 - bytesInUse; // 4MB limit
    const cssByteSize = new Blob([editor.getValue()]).size;
    if (cssByteSize > availableBytes) {
      failedSavingCode = true;
      createNotification("Failed saving code: All custom theme code is too long. Please shorten this code below 100MB.", "#961a1a", "#ffffff");
      return;
    }
  });

  if (!ascii.test(editor.getValue())) {
    console.log("Contains non-ASCII characters. Will not save.");
    createNotification("Failed saving code: Contains characters that aren't ASCII.", "#961a1a", "#ffffff");
    return;
  }
  
  getAllCustomThemes(function(themes) {
    let actualThemeID = uuidv4();
    for (let x in themes) {
      if (themes[x].name == themeName) {
        actualThemeID = x;
        break;
      }
    }

    let themeData;

    if (themes[actualThemeID]) {
      // update existing theme
      themeData = themes[actualThemeID];
      themeData.name = themeName;
      themeData.code = code;
      themeData.lastModified = new Date().toISOString();
    } else {
      themeData = {
        id: actualThemeID,
        name: themeName,
        code: code,
        lastModified: new Date().toISOString()
      };
    }

    themes[actualThemeID] = themeData;

    chrome.storage.local.set({ themes: themes }, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving theme:", chrome.runtime.lastError);
        createNotification("Failed saving code, check console for details.", "#961a1a", "#ffffff");
      } else {
        if (failedSavingCode == false) {
          console.log("Theme saved successfully!");
          createNotification(`Code saved.`, "#3c8443", "#ffffff");
          let newUrl = new URL(window.location.href);
          newUrl.searchParams.set('themeID', actualThemeID);
          window.history.replaceState({}, '', newUrl);
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadTheme);
document.getElementById('save-button').addEventListener('click', () => {
  saveCode();
})
console.log(editor.getValue());
document.addEventListener("keydown", function(e) {
  if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    saveCode();
  }
}, false);