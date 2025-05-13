var hasCookie: boolean = false;

chrome.runtime.onInstalled.addListener(() => {
    console.log("My Extension installed successfully!");
});

chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    if (message.action === 'hasCookie') {
        getCookie();
        sendResponse({ cookie: hasCookie });
        hideNetorare(); // 強制更新畫面
        return true;
    }

    if (message.action === 'updateHasCookie') {
        hasCookie = message.cookie;
        console.log('hasCookie updated:', hasCookie);
    }

    if (message.ntrCheckOn !== undefined) {
        ntrCheck = message.ntrCheckOn;
        console.log(`ntrCheck updated to: ${ntrCheck}`);
        document.cookie = `ntrCheck=${ntrCheck}; path=/; expires=${new Date('9999-12-31').toUTCString()}`;
        hideNetorare();
    } else {
        console.log('Unknown message received.');
    }

    return true;
});