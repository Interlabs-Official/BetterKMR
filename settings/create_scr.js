document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", () => {
        chrome.storage.local.get("plugins", (data) => {
            var data = data.plugins || [];
            console.log("Data: " + JSON.stringify(data));
            data.push({
                name: document.getElementById("name").value,
                code: document.getElementById("codebox").value
            });
            chrome.storage.local.set({plugins: data}, () => {
                console.log("Updated data!");
                console.log(data);
                window.location.href = "/settings/index.html";
            });
        });
        /*chrome.storage.local.set({ plugins: plugins }, function() {
        if (chrome.runtime.lastError) {
            console.error("Error saving plugin:", chrome.runtime.lastError);
            createNotification("Failed saving code, check console for details.", "#961a1a", "#ffffff");
        } else {
            if (failedSavingCode == false) {
            console.log("Plugin saved successfully!");
            createNotification(`Code saved.`, "#3c8443", "#ffffff");
            let newUrl = new URL(window.location.href);
            newUrl.searchParams.set('pluginID', actualPluginID);
            window.history.replaceState({}, '', newUrl);
            }
        }
        });*/
    });
})