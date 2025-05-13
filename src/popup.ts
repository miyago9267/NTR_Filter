const checkbox = document.getElementById('switch') as HTMLInputElement | null;

if (checkbox) {
    checkbox.addEventListener('change', async () => {
        const checked = checkbox.checked;
        console.log('Checkbox toggled:', checked);

        // Query for nhentai tabs only
        const tabs = await chrome.tabs.query({ url: ["*://nhentai.net/*", "*://www.nhentai.net/*"] });
        if (tabs.length > 0 && tabs[0].id) {
            await chrome.tabs.sendMessage(tabs[0].id, { ntrCheckOn: checked });
            console.log('Message sent to content script');
        } else {
            console.warn('No nhentai tabs found.');
        }

        await chrome.runtime.sendMessage({ action: 'updateHasCookie', cookie: checked });
    });

    chrome.runtime.sendMessage({ action: 'hasCookie' }).then((response: any) => {
        console.log('Initial cookie state:', response);
        checkbox.checked = response.cookie;
    }).catch((error) => {
        console.error('Error getting cookie:', error);
    });
}

window.addEventListener('beforeunload', async () => {
    const checked = checkbox?.checked ?? true;
    console.log('Popup closed, syncing state:', checked);

    const tabs = await chrome.tabs.query({ url: ["*://nhentai.net/*", "*://www.nhentai.net/*"] });
    if (tabs.length > 0 && tabs[0].id) {
        await chrome.tabs.sendMessage(tabs[0].id, { ntrCheckOn: checked });
        console.log('Synced state to content script on popup close');
    } else {
        console.warn('No nhentai tabs found on popup close.');
    }

    await chrome.runtime.sendMessage({ action: 'updateHasCookie', cookie: checked });
});