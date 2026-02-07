setTimeout(() => {
    chrome.runtime.sendMessage({action: "python", python: `print("Hello from Python!")`}, (result) => {
        console.log(result);
    })
})