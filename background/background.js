async function getTabIds() {
    const tabs = await chrome.tabs.query({
        url: ['*://cdc.vit.ac.in/*', '*://*.examly.io/*'],
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

async function sendRqBodyToPatcher(reqBody, url) {
    console.log('[background] [Send Body] Body: ', reqBody);
    const tabIds = await getTabIds();
    console.log('[background] [Send Body] Tab Ids: ', tabIds);
    for (const id of tabIds) {
        chrome.tabs.sendMessage(id, {
            action: 'send_patched_request',
            data: reqBody,
            url,
        });
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        console.log('[background] [Before Request]:', details);
        if (details.requestBody?.raw?.[0]?.bytes) {
            const text = new TextDecoder().decode(
                details.requestBody.raw[0].bytes
            );
            sendRqBodyToPatcher(text, details.url);
        }
    },
    { urls: ['*://api.examly.io/api/*/updateDurationSpent'] },
    ['requestBody']
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`[background] message: ${JSON.stringify(message)}`);
    console.log(`[background] sender: ${JSON.stringify(sender)}`);
    if (message.action === undefined) {
        console.log(`[background] [Debug] message.action is undefined`);
        sendResponse('Not Injected');
        return;
    }
    const runtimeHelpers = [
        'inject_ace_helper',
        'inject_watch_helper',
        'inject_req_watcher',
        'inject_default_helper',
    ];
    const runtimePath = 'content_scripts/modules/runtime/';
    if (!runtimeHelpers.includes(message.action)) {
        console.log(
            `[background] [Debug] ${message.action} is not in runtime helpers`
        );
        sendResponse('Not Injected');
        return;
    }
    const fileName = message.action.replace('inject_', '') + '.js';
    const filePath = runtimePath + fileName;
    console.log(`[background] [Debug] filePath: ${filePath}`);
    chrome.scripting
        .executeScript({
            target: { tabId: sender.tab.id },
            world: 'MAIN',
            files: [filePath],
        })
        .then(() => {
            console.log(`[background] ${fileName} Injected`);
            sendResponse('Injected');
        })
        .catch((err) => {
            console.log(`[background] Failed to inject ${fileName}: ${err}`);
            sendResponse('Not Injected');
        });
    return true;
});
