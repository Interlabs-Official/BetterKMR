    // Retrieve themeID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const themeID = urlParams.get('themeID');
    console.log(themeID);

    fetch(chrome.runtime.getURL("src/config/themes.yml"))
    .then(response => response.text())
    .then(data => {
        const yamlToJson = jsyaml.load(data);
        console.log(yamlToJson);
        const theme = yamlToJson[themeID];
        console.log(theme);
        document.getElementById('theme-image').src = "../assets/" + theme.thumbnail;
        document.getElementById('theme-title').textContent = theme.name;
        document.getElementById('theme-author').textContent = 'by ' + theme.author;
        if (typeof theme.description == 'undefined' || theme.description == null) {
            document.getElementById('theme-description').innerHTML = DOMPurify.sanitize(marked.parse(theme.highlight));
        } else {
            fetch(chrome.runtime.getURL("src/themes/descriptions/" + theme.description))
                .then(response => response.text())
                .then(data => {
                    document.getElementById('theme-description').innerHTML = DOMPurify.sanitize(marked.parse(data));
                })
                .catch(error => console.error("Failed to load description for theme:", error));
        }
    })
    .catch(error => console.error("Failed to load themes:", error));

document.getElementById('button1').addEventListener('click', () => {
    window.history.back();
});