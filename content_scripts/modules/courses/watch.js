window.courseCompletionTracker = {}

function getCourseName() {
    const name = document.getElementById("courseNameID").innerText;
    return name;
}

function isCourseVideo() {
    return document.querySelector(".youtube") !== null || document.querySelector(".vp-video") !== null;
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

async function sendPutReq(bodyStr) {
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
        const res = await fetch("https://api.examly.io/api/studentcontent/updateDurationSpent", {
            method: "PUT",
            headers,
            body: bodyStr,
        });
        console.log(`[Watch] [Debug] Status Code: ${res.status}`);
    } catch (err) {
        console.error(
            `Error sending patched request :`,
            err
        );
    }
}

async function sendPatchedRequest(reqBodyString) {
    const reqBody = JSON.parse(reqBodyString);
    const orgBody = decryptPayload(reqBody['data']);
    const contentId = orgBody['content_id'];
    if(window.courseCompletionTracker[contentId] !== undefined){
        console.log(`[Watch] [Debug] contentId: ${contentId} Already Completed`)
        return;
    }
    window.courseCompletionTracker[contentId] = 0;
    orgBody['duration_spent'] = orgBody['duration'];
    console.log(`[Watch] [Debug] patchedJSON: ${JSON.stringify(orgBody)}`);
    const patchedBody = encryptPayload(orgBody);
    const patchedRqStr = JSON.stringify(patchedBody);
    sendPutReq(patchedRqStr);
}

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if (message.action = "send_patched_request") {
            sendPatchedRequest(message.data);
            return "ok";
        }
        return "nok";
    }
)