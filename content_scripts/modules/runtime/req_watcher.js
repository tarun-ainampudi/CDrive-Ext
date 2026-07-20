function getDecryptionKey() {
    let acdEvent = localStorage.getItem('accord_event');
    let sclDetails = localStorage.getItem('school_details');

    if (acdEvent === null || sclDetails === null) {
        console.log(
            '[Req Watcher] [Error] Required Local Storage Items Not Found'
        );
        return '';
    }

    acdEvent = JSON.parse(acdEvent);
    sclDetails = JSON.parse(sclDetails);

    if (acdEvent.list?.['test_details']?.[0] && sclDetails?.['school_id']) {
        const uid = acdEvent.list['test_details'][0].user_id;
        const sid = sclDetails['school_id'];
        const decKey = `${uid}${sid}k3QL95NjdP!cA34CsXL`.replaceAll('-', '');
        console.log(`[Req Watcher] [Debug] Decryption Key: ${decKey}`);
        return decKey;
    }
    console.log('[Req Watcher] [Error] Failed to get Decryption Key');
    return '';
}

function decryptPayload(encPayload, key) {
    const parsedPayload = JSON.parse(encPayload);
    if (parsedPayload['data'] === undefined) {
        console.log(
            "[Req Watcher] [Error] Payload Doesn't Contain Data to Decrypt"
        );
        return null;
    }
    const bytes = CryptoJS.AES.decrypt(parsedPayload['data'], key);
    const decPayloadData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decPayloadData) {
        console.log('[Req Watcher] [Error] Failed to decrypt payload');
    }
    return JSON.parse(decPayloadData);
}

function getKeyData(testData) {
    const nSections = testData.length;
    const keyData = [];
    for (let i = 0; i < nSections; i++) {
        const questions = testData[i]['questions'];
        for (let j = 0; j < questions.length; j++) {
            const qData = questions[j];
            if (qData['mcq_questions']) {
                const ans = qData.mcq_questions.actual_answer.args[0];
                const options = qData.options.map((op) => op.text);
                keyData.push(options.indexOf(ans));
            } else {
                keyData.push(-1);
            }
        }
    }
    return keyData;
}

window.addEventListener(
    'message',
    (event) => {
        const data = event.data;
        if (data.action !== undefined && data.action === 'get_key_data') {
            console.log(`[Req Watcher] [Debug] data: ${JSON.stringify(data)}`);
            window.postMessage({
                action: 'key_data',
                keyData: window.keyData,
            });
        }
    },
    true
);

(() => {
    const OriginalXMLHttpRequest = window.XMLHttpRequest;

    window.keyData = [];

    function PatchedXMLHttpRequest() {
        const xhr = new OriginalXMLHttpRequest();

        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                const responseUrl = xhr.responseURL;
                /* console.log(
                    `[Req Watcher] [Debug] Response URL: ${responseUrl}`
                ); */
                if (
                    responseUrl.includes(
                        'https://api.examly.io/api/sEKMRyOJKjIzZbUa'
                    ) ||
                    responseUrl.includes(
                        'https://api.examly.io/api/9DECJfxqhu0cgJAQ'
                    )
                ) {
                    console.log(`[Req Watcher] [Debug] URL Matched`);
                    const decKey = getDecryptionKey();
                    if (!decKey) {
                        console.log(
                            '[Req Watcher] [Error] Decryption Key Not Found'
                        );
                        return;
                    }
                    const decRes = decryptPayload(xhr.responseText, decKey);
                    if (decRes['frozen_test_data'] === undefined) {
                        console.log(
                            '[Req Watcher] [Error] frozen_test_data Not Found'
                        );
                        return;
                    }
                    console.log(
                        `[Req Watcher] [Debug] frozen_test_data: ${JSON.stringify(decRes['frozen_test_data'])}`
                    );
                    const kData = getKeyData(decRes['frozen_test_data']);
                    if (kData.length === 0) {
                        console.log(
                            '[Req Watcher] [Error] keyData length === 0'
                        );
                        return;
                    }
                    window.keyData.push(kData);
                    window.postMessage({
                        action: 'key_data',
                        keyData: window.keyData,
                    });
                }
            }
        });

        return xhr;
    }

    window.XMLHttpRequest = PatchedXMLHttpRequest;
    console.log('[Req Watcher] Patch Applied to XMLHttpRequest');
})();
