let isReqWatcherInjected = false;
let decryptedKeyData = [];
let isDefaultMcqSolverRunning = false;
let isDefaultHelperInjected = false;

function expandSectionDropDown() {
    const dropDown = document.querySelector('img[src*=arrow_down]');
    if (dropDown !== null) {
        dropDown.click();
    }
}

function collapseSectionDropDown() {
    const dropDown = document.querySelector('img[src*=arrow_up]');
    if (dropDown !== null) {
        dropDown.click();
    }
}

function getSectionInfo() {
    expandSectionDropDown();
    const sectionInfo = [];
    let totalQCount = 0;
    let count = 0;
    while (count < 10) {
        const eleId = `#each-section-${count}`;
        const dp = document.querySelector(eleId);
        if (dp === null || !dp.textContent.includes('Section')) {
            break;
        }
        const secInfo = {};
        secInfo.id = eleId;
        secInfo.index = dp.innerText.split('\n')[0];
        secInfo.name = dp.innerText.split('\n')[1];
        secInfo.qCount = dp.innerText.split('\n')[2].replace(/[^\d]/g, '');
        secInfo.startQIndex = totalQCount;
        sectionInfo.push(secInfo);
        totalQCount += Number(secInfo.qCount);
        count += 1;
    }
    collapseSectionDropDown();
    return sectionInfo;
}

async function injectDefaultHelper() {
    if (!isDefaultHelperInjected) {
        isDefaultHelperInjected = true;
        const msg = await chrome.runtime.sendMessage({
            action: 'inject_default_helper',
        });
        if (msg === 'Injected') {
            console.log(`[Default] default_helper injected`);
            return;
        }
        isDefaultHelperInjected = false;
        console.log(`[Default] [Debug] runtime inject response: ${msg}`);
        return;
    }
    console.log(`[Default] default_helper already injected`);
}

async function injectReqWatcher() {
    if (!isReqWatcherInjected) {
        isReqWatcherInjected = true;
        const msg = await chrome.runtime.sendMessage({
            action: 'inject_req_watcher',
        });
        if (msg === 'Injected') {
            console.log(`[Default] req_watcher injected`);
            return;
        }
        isReqWatcherInjected = false;
        console.log(`[Default] [Debug] runtime inject response: ${msg}`);
        return;
    }
    console.log(`[Default] req_watcher already injected`);
}

function answerCurrentQuestion() {
    if (decryptedKeyData.length === 0) {
        console.log('[Default] [Debug] decryptedKeyData is empty');
        return;
    }
    const sectionsInfo = getSectionInfo();
    if (sectionsInfo.length === 0) {
        console.log(
            '[Default] [Debug] No sections found. Cannot auto-fill MCQs.'
        );
        return;
    }
    const qDiv = document.querySelector('div[aria-labelledby="question"]');
    if (qDiv === null) {
        console.log('[Default] [Debug] Question Div Not Found');
        return;
    }
    const qHeader = qDiv.querySelector('[aria-labelledby="question-header"]');
    if (qHeader === null) {
        console.log('[Default] [Debug] Question Header Not Found');
        return;
    }
    const secNameDiv = document.querySelector('#each-section-panels');
    if (secNameDiv === null) {
        console.log("[Default] [Debug] Can't Get Section Name Div");
        return;
    }
    const header = qHeader.textContent;
    const secIndex =
        parseInt(secNameDiv.textContent.match(/Section (\d+)\/\d+/)[1]) - 1;
    const qNo = header.match(/Question No : (\d+) \/ \d+/);
    const num = qNo ? qNo[1] : null;
    if (num && !isNaN(secIndex)) {
        const opIndex =
            decryptedKeyData.at(-1)[
                parseInt(num) + sectionsInfo[secIndex].startQIndex - 1
            ];
        const opDiv = document.querySelector(
            '#tt-option-' + opIndex + ' > label > span.checkmark1'
        );
        if (opDiv) {
            opDiv.dispatchEvent(new Event('click', { bubbles: true }));
        }
    } else {
        console.log(
            `[Default] [Debug] Question Number: ${num} Section Index: ${secIndex}`
        );
    }
}

// eslint-disable-next-line no-unused-vars
async function answerMcqDefault() {
    injectDefaultHelper();

    if (isDefaultMcqSolverRunning) {
        document.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Backspace' })
        );
        await sleep(2000);
    }

    isDefaultMcqSolverRunning = true;

    const queArray = [
        ...document.querySelectorAll("div[aria-labelledby='each-question']"),
    ];
    const currSelectedQue = document.querySelector(
        'div[aria-labelledby^="currentQuestion"]'
    );

    let currentIndex = 0;

    if (currSelectedQue) {
        const index = queArray.indexOf(currSelectedQue);
        if (index !== -1) currentIndex = index;
    }

    console.log(
        '[Default] Answering Questions. Press backspace to stop the script.'
    );

    for (
        let i = currentIndex;
        i < queArray.length && isDefaultMcqSolverRunning;
        i++
    ) {
        queArray[i].querySelector('div').click();
        if (document.querySelector("input[type='radio']:checked") === null) {
            answerCurrentQuestion();
            console.log(`[Default] Answered Question: ${i + 1}`);
        }
    }

    console.log(
        '[Default] All questions answered. Passing time press backspace to stop the script.'
    );

    for (let i = 0; i < queArray.length && isDefaultMcqSolverRunning; i++) {
        const passTime = Math.floor(Math.random() * 50000) + 30000;
        console.log(
            `[Default] Passing ${Math.floor(passTime / 1000)} Seconds On Question: ${i + 1}`
        );
        queArray[i].querySelector('div').click();
        await sleep(passTime - 3000);
        window.postMessage({
            action: 'mcq-scorrect-option-click',
        });
        await sleep(3000);
    }

    isDefaultMcqSolverRunning = false;

    console.log('[Default] answerInject() Completed....');
}

injectReqWatcher();
window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.action !== undefined && data.action === 'key_data') {
        console.log(`[Default] [Debug] data: ` + `${JSON.stringify(data)}`);
        decryptedKeyData = [...decryptedKeyData, ...data.keyData];
    }
});
