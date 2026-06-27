window.courseCompletionTracker = {}
window.isBreak = false;
let isWatchHelperInjected = false;


function getCourseName() {
    const name = document.getElementById("courseNameID").innerText;
    return name;
}

async function injectWatchHelper() {
    if (!isWatchHelperInjected) {
        const msg = await chrome.runtime.sendMessage({
            action: 'inject_watch_helper',
        });
        if (msg === 'Injected') {
            console.log(`[Watch] watch_helper injected`);
            isWatchHelperInjected = true;
            return;
        }
        console.log(`[Watch] [Debug] runtime inject response: ${msg}`);
        return;
    }
    console.log(`[Watch] watch_helper already injected`);
}

async function playVideoIfPossible() {
    await injectWatchHelper();
    window.postMessage({
        action: 'play_video',
    });
}

function isCourseToBeWatched() {
    const selectedEle = document.querySelector(".selectedAcd");
    if (selectedEle !== null) {
        const text = selectedEle.innerText.toLowerCase();
        if (text.includes("video") || text.includes("text")) {
            return true;
        }
    }
    return false;
}

function expandAllSections() {
    let daEle = document.querySelectorAll('img[alt="down-arrow"]');
    if (daEle.length == 0) {
        return;
    }
    daEle.forEach(ele => ele.click());
    daEle = document.querySelectorAll('img[alt="down-arrow"]');
    if (daEle.length != 0) {
        daEle.forEach(ele => ele.click());
    }
}

function selectNextWatchableEle(count = 0) {
    expandAllSections();
    const items = Array.from(document.querySelectorAll(".modonhover"));
    const current = document.querySelector(".selectedAcd");

    if (items.length === 0) {
        return;
    }

    let idx = items.indexOf(current);
    if (idx === -1) {
        idx = 0;
    } else {
        idx = (idx + 1) % items.length;
    }

    items[idx].click()

    if (!isCourseToBeWatched() && count < items.length) {
        selectNextWatchableEle(count + 1);
    } else {
        playVideoIfPossible();
    }
}

function getTotalTime() {
    const selectedEle = document.querySelector(".selectedAcd");
    if (selectedEle != null) {
        const timeEle = selectedEle.innerText.split("\n")[1];
        const timeParts = timeEle.split(":");
        if (timeParts.length === 3) {
            return timeParts[1].trim() + ":" + timeParts[2].trim();
        }
    }
    return "10:00"
}

function getTimeSpent() {
    const timeSpentEle = document.getElementById("timeSpentCountID");
    if (timeSpentEle !== null)
        return timeSpentEle.innerText.split(" ")[0];
    return "";
}

function toSeconds(time) {
    const parts = time.split(":");
    if (parts.length === 2) {
        return Number(parts[0] * 60) + Number(parts[1]);
    }
    return 0;
}

function getTimeDiff() {
    const totalTime = toSeconds(getTotalTime());
    const spentTime = toSeconds(getTimeSpent());
    return totalTime - spentTime;
}

function decryptPayload(encPayloadData) {
    const key = "89wZc3csuXMuqxJ/BY86XA==";
    const bytes = CryptoJS.AES.decrypt(encPayloadData, key);
    const decPayloadData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decPayloadData) {
        console.log("[Watch] [Error] Failed to decrypt payload");
    }
    return JSON.parse(decPayloadData);
}

function encryptPayload(payload) {
    const key = "89wZc3csuXMuqxJ/BY86XA==";
    const data = CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
    return { data };
}

async function sendPutReq(bodyStr, url) {
    const userAgentData = navigator.userAgentData;
    const brands = userAgentData.brands
        .map(b => `"${b.brand}";v="${b.version}"`)
        .join(", ");
    const headers = {
        "accept": "application/json, text/plain, */*",
        "authorization": JSON.parse(localStorage.token)['token'],
        "content-type": "application/json",
        "referer": location.origin,
        "sec-ch-ua": brands,
        "sec-ch-ua-mobile": userAgentData.mobile ? "?1" : "?0",
        "sec-ch-ua-platform": `"${userAgentData.platform}"`,
        "user-agent": navigator.userAgent
    };
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers,
            body: bodyStr,
        });
        console.log(`[Watch] [Debug] Status Code: ${res.status}`);
        const resObj = await res.json();
        if (resObj['data'] === undefined) {
            console.log(`[Watch] [Debug] response: ${JSON.stringify(resObj)}`);
        } else {
            console.log(`[Watch] [Debug] response: ${resObj['data']['message']}`);
        }
        selectNextWatchableEle();
    } catch (err) {
        console.error(
            `Error sending patched request :`,
            err
        );
    }
}

function removeBreak() {
    setTimeout(() => {
        window.isBreak = false;
        console.log(`[Watch] [Debug] Break Removed`);
    }, 5000);
}

async function sendPatchedRequest(reqBodyString, reqUrl) {
    if (!location.href.includes("/mycourses/details")) {
        console.log(`[Watch] [Debug] Not in /mycourses/details`);
        return;
    }
    if (window.isBreak) {
        console.log(`[Watch] [Debug] isBreak: ${window.isBreak} -> Ignoring Duplicate Rq`);
        return;
    } else {
        window.isBreak = true;
        removeBreak();
    }
    if (!isCourseToBeWatched()) {
        console.log(`[Watch] [Debug] Course is not to be watched`);
        selectNextWatchableEle();
        return;
    }
    const reqBody = JSON.parse(reqBodyString);
    const orgBody = decryptPayload(reqBody['data']);
    const contentId = orgBody['content_id'];
    if (window.courseCompletionTracker[contentId] !== undefined) {
        console.log(`[Watch] [Debug] contentId: ${contentId} Already Completed`);
        selectNextWatchableEle();
        return;
    }
    const timeDiff = getTimeDiff();
    if (timeDiff <= 0) {
        console.log(`[Watch] [Debug] timeDiff: ${timeDiff}`);
        selectNextWatchableEle();
        return;
    }
    window.courseCompletionTracker[contentId] = 0;
    orgBody['duration_spent'] = timeDiff.toString();
    console.log(`[Watch] [Debug] patchedJSON: ${JSON.stringify(orgBody)}`);
    const patchedBody = encryptPayload(orgBody);
    const patchedRqStr = JSON.stringify(patchedBody);
    sendPutReq(patchedRqStr, reqUrl);
}

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if (message.action === "send_patched_request") {
            sendPatchedRequest(message.data, message.url);
            return "ok";
        }
        return "nok";
    }
)