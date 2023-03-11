const checkbox = document.getElementById('switch');

checkbox.addEventListener('change', () => {
    let checked = checkbox.checked;
    console.log(checked)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { ntrCheckOn: checked });
    });
});

chrome.runtime.sendMessage({ action: 'hasCookie' }, (response) => {
    console.log(response)
    checkbox.checked = response.cookie;
});