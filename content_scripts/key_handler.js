function allowCopyAndPaste(e) {
    e.stopImmediatePropagation();
    return true;
}

function blockEvents() {
    [
        "fullscreenchange",
        "copy",
        "paste",
        "onpaste",
        "webkitfullscreenchange",
        "mozfullscreenchange",
        "MSFullscreenChange",

    ].forEach(evt => {
        document.addEventListener(evt, allowCopyAndPaste, true);
    });
}

async function answerCurrentPageTest() {
    const testInfo = getTestInfo();
    const testType = getTestType();
    const keys = Object.keys(testInfo);
    if (keys.length == 0 || !keys.includes("Test Name")) {
        console.log("[Key Handler] Test Name Not Found in Test Info");
        return;
    }
    if (testType === 'Multi Choice Type Question') {
        const answersStatus = await answerMcqs(testInfo['Test Name']);
        blockEvents();
        alert(answersStatus);
        console.log(`[Key Handler] MCQ Answering Status: ${answersStatus}`);
    } else if (testType === 'Single File Programming Question'
        || testType.toLowerCase().includes('program')
        || testType.toLowerCase().includes('cod')
    ) {
        const answersStatus = await answerCodes(testInfo['Test Name']);
        blockEvents();
        alert(answersStatus);
        console.log(`[Key Handler] COD Answering Status: ${answersStatus}`);
    }
}

async function resultPageDownload() {
    const sections = getResultSections();
    console.log(`[Key Handler] [Debug] No.of Sections: ${sections.length}`);
    let results = {};
    for (const [index, section] of sections.entries()) {
        console.log(`[Key Handler] [Debug] Section: ${index}`);
        const selector = section
            .querySelector('div[aria-label="title"]');
        if (selector == null) {
            console.log(`[Key Handler] Selector not found for index: ${index}`);
            continue;
        }
        selector.click();
        const type = section.innerText.trim();
        let result;
        if (type === 'MCQ') {
            result = downloadMcqResultJson();
        } else {
            result = await downloadCodeResultJson();
        }
        results[type] = result;
    }
    const file_name = (getResultInfo()['Test'] || 'Assessment') + ' Answers.json'
    downloadJson(results, file_name)
}

function downloadCurrentPage() {
    if (window.location.href.includes('/test')) {
        const testType = getTestType();
        if (testType !== 'Multi Choice Type Question') return;
        downloadMcqTestJson();
    } else if (window.location.href.includes('/result')) {
        resultPageDownload()
    }
}

function keydownHandler() {
    document.addEventListener("keydown", (e) => {
        const ctrlKey = e.ctrlKey || e.metaKey;
        if (e.key === 'F9') {
            e.preventDefault();
            blockEvents();
        }
        if (e.key === 'F8') {
            e.preventDefault();
            answerCurrentPageTest();
        }
        if (e.key === 'F10') {
            e.preventDefault();
            downloadCurrentPage();
        }
        if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            pasteClipboardByTyping();
        }
        if (isTyperActive && e.key === 'Backspace') {
            isTyperActive = false;
            console.log("[Key Handler] Backspace encountered stopping Typer")
        }
    }, true);
}
keydownHandler();

