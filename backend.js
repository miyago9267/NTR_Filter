var hasCookie = false;

chrome.runtime.onInstalled.addListener(function() {
    console.log("My Extension installed successfully!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == 'hasCookie') {
        chrome.runtime.sendMessage({ hasCookie: 'query' }, (response) => {
            hasCookie = response.cookie;
            sendResponse({cookie: hasCookie});
        });
    }
});

chrome.runtime.sendMessage({ hasCookie: 'query' }, (response) => {
    console.log(response)
    hasCookie = response.cookie;
});