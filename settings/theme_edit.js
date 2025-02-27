const urlParams = new URLSearchParams(window.location.search);
const themeID = urlParams.get('themeID');

if (!themeID) { window.location.href = chrome.runtime.getURL("settings/index.html");}

let editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "css",
    lineNumbers: true,
    fontSize: 20,
    theme: "ayu-dark",
    extraKeys: { "Ctrl-Space": "autocomplete"},
    colorpicker: true
  });

  editor.on("inputRead", function(cm, change) {
    // Only trigger autocomplete when typing alphanumeric characters.
    // Adjust the regex as needed.
    if (change.text[0] && /[a-zA-Z0-9_]/.test(change.text[0])) {
      cm.showHint({ completeSingle: false });
    }
  });

  let currentFontSize = 40; // starting font size

// Listen for ctrl+wheel events on the CodeMirror wrapper element.
editor.getWrapperElement().addEventListener("wheel", function(e) {
  if (e.ctrlKey) {
    e.preventDefault(); // Prevent the browser's default zoom behavior.
    
    // Adjust font size: if scrolling up (deltaY negative) increase size, otherwise decrease.
    if (e.deltaY < 0) {
      currentFontSize += 1;
    } else {
      currentFontSize = Math.max(1, currentFontSize - 1); // prevent negative font size
    }
    
    // Update the font size on the code area.
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
console.log(editor.getValue());