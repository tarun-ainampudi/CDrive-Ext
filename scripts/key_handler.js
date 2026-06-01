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
        console.log("Key Test Name Not Found in Test Info");
        return;
    }
    if (testType === 'Multi Choice Type Question') {
        const answersStatus = await answerMcqs(testInfo['Test Name']);
        blockEvents();
        alert(answersStatus);
        console.log(answersStatus);
    }
}

function downloadCurrentPage() {
    if (window.location.href.includes('/test')) {
        const testType = getTestType();
        if (testType !== 'Multi Choice Type Question') return;
        downloadMcqTestJson();
    } else if (window.location.href.includes('/result')) {
        const resultType = getResultType();
        if (resultType !== 'MCQ') return;
        downloadMcqResultJson();
    }
}

function keydownHandler() {
    document.addEventListener("keydown", (e) => {
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
    }, true);
}
keydownHandler();

