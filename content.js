const mangaList = document.querySelectorAll('.gallery');
const netorare = '8653';
const netorareTag = ['Netorare', 'NTR', 'ntr', 'netorare', 'Ntr'];
let ntrCheck = true;

function getCookie() {
    let cookie = `; ${document.cookie}`;
    cookies = cookie.split('; ');
    ntrCheck = cookies.includes('ntrCheck=true');
    // chrome.runtime.sendMessage({ ntrCheck: ntrCheck });
}

function hideNetorare() {
    const hideManga = (style) => {
        mangaList.forEach((manga) => {
        if (manga.getAttribute('data-tags').includes(netorare)) {
            manga.style.display = style;
        } else {
            let title = manga.lastChild.lastChild.textContent
            let regList = netorareTag.map((tag) => new RegExp(tag, 'i'));
            regList.forEach((reg) => {
                if (reg.test(title)) {
                    manga.style.display = style;
                }
            });
        }
    })};
    if (!ntrCheck) {
        hideManga('');
        return;
    }
    hideManga('none');
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.ntrCheckOn!==null) {
        ntrCheck = message.ntrCheckOn;
        hideNetorare();
        document.cookie = `ntrCheck=${ntrCheck}`;
    } else if (message.hasCookie!==null) {
        console('hasCookie');
        getCookie();
        sendResponse({cookie: ntrCheck});
    } else {
        console.log('Unknown message received.');
    }

});

getCookie();
hideNetorare();