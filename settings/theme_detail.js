        import jsyaml from 'js-yaml';
        window.addEventListener('scroll', function() {
            const scrollIndicator = document.getElementById('scrollToTop');
            if (window.scrollY > 300) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        });
        
        document.getElementById('scrollToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && 
                    mutation.target.id === 'theme-description' && 
                    mutation.addedNodes.length > 0) {
                    
                    const description = document.getElementById('theme-description');
                    description.style.opacity = '0';
                    
                    setTimeout(() => {
                        description.style.transition = 'opacity 0.5s ease';
                        description.style.opacity = '1';
                    }, 100);
                    
                    observer.disconnect();
                }
            });
        });
        
        observer.observe(document.getElementById('theme-description'), { childList: true });
        
        const urlParams = new URLSearchParams(window.location.search);
        const themeID = urlParams.get('themeID');
        
        document.querySelector('.apply-button').addEventListener('click', function() {
            chrome.storage.sync.set({"theme-id-text": themeID || "0"}).then((result) => {
                document.querySelector('.apply-button').classList.add('greyed-out-applied');
                document.querySelector('.apply-button').disabled = true;
                document.querySelector('.apply-button').textContent = "In Use";
            });
        });

        chrome.storage.sync.get(["theme-id-text"]).then((result) => {
            if (result["theme-id-text"] == themeID) {
                document.querySelector('.apply-button').classList.add('greyed-out-applied');
                document.querySelector('.apply-button').disabled = true;
                document.querySelector('.apply-button').textContent = "In Use";
            }
        });

        document.querySelector('.back-button').addEventListener('click', function() {
            window.location.href = chrome.runtime.getURL("settings/index.html") + "?tab-selected=themes";
        });
        
        fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/config/themes.yml"))
        .then(response => response.text())
        .then(data => {
            const yamlToJson = jsyaml.load(data);
            const theme = yamlToJson[themeID];
            
            document.getElementById('theme-image').src = "../assets/" + theme.thumbnail;
            document.getElementById('theme-title').textContent = theme.name;
            document.getElementById('theme-author').textContent = 'by ' + theme.author;

            const badgeContainer = document.querySelector('.badge-container');
            
            if (theme.tags) {
                Object.entries(theme.tags).forEach(([tagName, color]) => {
                    console.log(tagName, color);
                    const badge = document.createElement('span');
                    badge.className = `badge ${tagName}`;
                    badge.textContent = tagName;
                    badge.style.backgroundColor = color;
                    badgeContainer.appendChild(badge);
                });
            }

            if (typeof theme.description == 'undefined' || theme.description == null) {
                document.getElementById('theme-description').innerHTML = DOMPurify.sanitize(marked.parse(theme.highlight));
            } else {
                fetch(/* webpackIgnore: true */ chrome.runtime.getURL("src/themes/descriptions/" + theme.description))
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('theme-description').innerHTML = DOMPurify.sanitize(marked.parse(data));
                    })
                    .catch(error => console.error("Failed to load description for theme:", error));
            }
        })
        .catch(error => console.error("Failed to load theme tags:", error));