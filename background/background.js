async function getTabIds() {
    const tabs = await chrome.tabs.query({
        url: ['*://cdc.vit.ac.in/*', '*://vitplacement905.examly.io/*'],
    });
    return tabs.map((tab) => tab.id);
}

async function injectLoginHandler(tabIndex) {
    let tabIds;
    if (tabIndex !== -1) {
        tabIds = [tabIndex];
    } else {
        tabIds = await getTabIds();
    }
    console.log('[Inject Login Handler] Tab Ids: ', tabIds);
    for (const id of tabIds) {
        chrome.scripting
            .executeScript({
                target: { tabId: id, allFrames: true },
                files: ['content_scripts/modules/runtime/login_handler.js'],
            })
            .then(() => console.log('Login Handler Injection Initiated'));
    }
}

chrome.webRequest.onCompleted.addListener(
    (details) => {
        // console.log("[Completed Request]:", details);
        if (
            details.url.includes('/logout') ||
            (details.url.includes('/login') && details.method === 'GET')
        ) {
            injectLoginHandler(details.tabId);
        }
    },
    { urls: ['*://api.examly.io/api/*'] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`[background] message: ${JSON.stringify(message)}`);
    console.log(`[background] sender: ${JSON.stringify(sender)}`);
    if (message.action === 'inject_ace_helper') {
        chrome.scripting
            .executeScript({
                target: { tabId: sender.tab.id },
                world: 'MAIN',
                files: ['content_scripts/modules/runtime/ace_helper.js'],
            })
            .then(() => {
                console.log('Ace Helper Injected');
                sendResponse('Injected');
            })
            .catch((err) => {
                console.log(`[background] Failed to inject ace_helper: ${err}`);
                sendResponse(null);
            });
    }
    return true;
});
