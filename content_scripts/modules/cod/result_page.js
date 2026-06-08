let isAceHelperInjected = false;

function checkAllSolutions() {
    const solCheckBoxes = document
        .querySelectorAll('div[aria-labelledby="show-sol-check-cont"]');
    solCheckBoxes.forEach((checkBox, index) => {
        if (index % 2 != 0 && !checkBox.querySelector('input').checked) {
            checkBox.firstChild.click();
        }
    });
}

async function resolveCodesResponse() {
    return new Promise((resolve, reject) => {

        const timeout = setTimeout(() => {
            window.removeEventListener('message', handleMessage, true);
            reject(new Error('Timeout reached waiting for codes from ace_helper'));
        }, 2000);

        const handleMessage = (event) => {
            const data = event.data;
            if (data.action !== undefined
                && data.action === 'ace_codes') {
                console.log(`[COD Result] [Debug] data: `
                    + `${JSON.stringify(data)}`);
                clearTimeout(timeout);
                resolve(data.codes);
                window.removeEventListener('message', handleMessage, true);
            }
        }

        window.addEventListener('message', handleMessage, true);
    })
}

function mapEditorsToIndex(divs) {
    const editors = [...document.querySelectorAll('.ace_editor')];
    const indexArray = [...divs]
        .map((editor) => {
            return editors.indexOf(editor);
        });
    return indexArray;
}

async function injectAceHelper() {
    if (!isAceHelperInjected) {
        const msg = await chrome.runtime.sendMessage({
            "action": "inject_ace_helper"
        });
        if (msg === 'Injected') {
            isAceHelperInjected = true;
            return;
        }
        console.log(`[COD Result] [Debug] runtime `
            + `response: ${msg}`);
        return;
    }
    console.log(`[COD Result] ace_helper already injected`);
}

async function getAceEditorValues(divs) {
    await injectAceHelper();
    const indexArray = mapEditorsToIndex(divs)
    try {
        window.postMessage({
            action: 'get_ace_codes',
            indexArray
        });
        const res = await resolveCodesResponse();
        return res;
    }
    catch (err) {
        console.log(`[COD Result] Error: ${err}`);
        return Array.from({ length: divs.length }, () => `Can't Get Code`);
    }
}

async function getSolutionsForCode(div) {
    const solutions = {};
    const answerHeaders = div
        .querySelectorAll('[aria-labelledby="answer-header"]');
    const aceDivs = div.querySelectorAll('.ace_editor');
    const codeContents = await getAceEditorValues(aceDivs);
    answerHeaders.forEach((answer, index) => {
        const lang = answer.innerText.split('\n')[1];
        const code = codeContents[index];
        console.log(`[COD Result] [Debug] code: ${code}`);
        solutions[lang] = code;
    })
    return solutions;
}

async function getRCodesInCPage() {
    checkAllSolutions();
    const codesInPage = [];
    const codeDivs = document
        .querySelectorAll('[aria-labelledby="each-section-questions"]');
    for (let i = 0; i < codeDivs.length; i++) {
        const div = codeDivs[i];

        let code = {};

        const passage = getRQCommonContent(div);
        if (passage) code.passage = passage;

        const questionContent = getRQuestionContent(div);
        if (questionContent) code.question = questionContent;

        const solutionsDiv = div
            .querySelector('div[aria-labelledby="correct-answer-mark-cont"]');
        const answer = await getSolutionsForCode(solutionsDiv);

        code = { ...code, ...answer };

        codesInPage.push(code);
    }
    return codesInPage;
}

async function downloadCodeResultJson() {
    switchResultPage();
    let questions = [];
    const pageSwitchElement = document.querySelectorAll('li');
    if (pageSwitchElement.length !== 0) {
        for (let i = 0; i < pageSwitchElement.length; i++) {
            if (!pageSwitchElement[i].innerText) continue;
            const currPageQs = await getRCodesInCPage();
            questions = [...questions, ...currPageQs];
            pageSwitchElement[i].querySelector('a').click()
        }
    } else {
        questions = await getRCodesInCPage();
        console.log(`[COD Result] Questions: ${JSON.stringify(questions)}`);
    }
    return questions;
}