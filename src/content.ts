const mangaList = document.querySelectorAll<HTMLElement>('.gallery');
console.log(`Found ${mangaList.length} .gallery elements`);
const netorare = '8653';
const netorareTag = ['Netorare', 'NTR', 'ntr', 'netorare', 'Ntr'];
let ntrCheck = true;
let cookies: string[] = [];

function getCookie() {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const ntrCookie = cookies.find(c => c.startsWith('ntrCheck='));

    if (ntrCookie !== undefined) {
        ntrCheck = ntrCookie === 'ntrCheck=true';
    } else {
        ntrCheck = true; // 預設為 true
        document.cookie = `ntrCheck=true; path=/; expires=${new Date('9999-12-31').toUTCString()}`;
        console.log('ntrCheck cookie not found. Setting default to true.');
    }
}

function hideNetorare() {
    const hideManga = (style: string) => {
        mangaList.forEach((manga, index) => {
            const dataTags = manga.getAttribute('data-tags') || '';
            const title = manga.lastChild?.lastChild?.textContent || '';

            if (dataTags.split(' ').includes(netorare)) {
                manga.style.display = style;
            } else {
                const regList = netorareTag.map((tag) => new RegExp(tag, 'i'));
                regList.forEach((reg) => {
                    if (reg.test(title)) {
                        manga.style.display = style;
                    }
                });
            }
        });
    };

    console.log(`NTR Check: ${ntrCheck}`);
    hideManga(ntrCheck ? 'none' : 'inline-block');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.ntrCheckOn !== undefined) {
        ntrCheck = message.ntrCheckOn;
        console.log(`ntrCheck updated to: ${ntrCheck}`);
        document.cookie = `ntrCheck=${ntrCheck}; path=/; expires=${new Date('9999-12-31').toUTCString()}`;
        hideNetorare();
    } else if (message.action === 'hasCookie') {
        getCookie();
        sendResponse({ cookie: ntrCheck });
        hideNetorare(); // 強制更新畫面
    } else {
        console.log('Unknown message received.');
    }

    return true;
});

getCookie();
hideNetorare();