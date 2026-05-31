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

function answerCurrentPageTest() {
    const testInfo = getTestInfo();
    const keys = Object.keys(testInfo);
    if (keys.length == 0 || !keys.includes("Test Name")) {
        console.error("Key Test Name Not Found in Test Info");
        return;
    }
    if(testInfo['Test Name'].includes("Aptitude")){
        const answersStatus = answerMcqs();
        console.log(answersStatus);
    }
}

function downloadCurrentPage() {
    if(window.location.href.includes('/test')){
        const testType = getTestType();
        if(testType !== 'Multi Choice Type Question') return;
        downloadMcqTestJson();
    } else if(window.location.href.includes('/result')){
        const resultType = getResultType();
        if(resultType !== 'MCQ') return;
        downloadMcqResultJson();
    }
}

function keydownHandler() {
    document.addEventListener("keydown", (e) => {
        if (e.key === 'F9') {
            blockEvents();
        }
        if (e.key === 'F8') {
            answerCurrentPageTest();
        }
        if (e.key === 'F10') {
            e.preventDefault();
            downloadCurrentPage();
        }
    }, true);
}
keydownHandler();

