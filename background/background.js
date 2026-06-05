function checkForTabsAndReturnIds(tabs) {
    const filteredTabs = tabs.filter(tab => {
        return tab.url !== undefined && (tab.url.includes("cdc.vit.ac.in") || tab.url.includes("examly.io"));
    });
    if(filteredTabs.length === 1) {
        return [filteredTabs[0].id];
    }
    else if (filteredTabs.length > 1) {
        const secondFilter = filteredTabs.filter((tab) => {
            return tab.url.includes("/dashboard")
                || tab.url.includes("/login")
                || tab.url.includes("/mycourses")
        })
        if (secondFilter.length !== 0)
            return secondFilter.map(tab => tab.id);
        return filteredTabs.map(tab => tab.id);
    }
    return [];
}
async function getTabIdsForLoginHandler() {
    const tabs = await chrome.tabs
        .query({
            active: true,
        });
    return checkForTabsAndReturnIds(tabs);
}
async function injectLoginHandler(tabIndex) {
    const tabIds = await getTabIdsForLoginHandler();
    console.log("[Inject Login Handler] Tab Ids: ", tabIds);
    for (const id of tabIds) {
        chrome.scripting.executeScript({
            target: { tabId: id, allFrames: true },
            files: ["content_scripts/login_handler.js"],
        }).then(() => console.log("Login Handler Injection Initiated"));
    }
}

chrome.webRequest.onCompleted.addListener((details) => {
    console.log("[Completed Request]:", details);
    if (details.url.includes("/logout") ||
        (details.url.includes("/login") && details.method === 'GET')
    ) {
        injectLoginHandler(details.tabId);
    }

}, { urls: ["*://api.examly.io/api/*"] });