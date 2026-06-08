function checkAllSolutions() {
    const solCheckBoxes = document
        .querySelectorAll('div[aria-labelledby="show-sol-check-cont"]');
    solCheckBoxes.forEach((checkBox, index) => {
        if (index % 2 != 0 && !checkBox.querySelector('input').checked) {
            checkBox.firstChild.click();
        }
    });
}

async function getAceEditorValues(divs) {
    const editors = [...document.querySelectorAll('.ace_editor')];
    const editorIndexs = [...divs]
        .map((editor) => {
            return editors.indexOf(editor);
        });
    console.log(`[COD Result] [Debug] Index: ${editorIndexs}`);
    return chrome.runtime.sendMessage({
        "action": "inject_ace_helper"
    }).then((res) => {
        console.log(`[COD Result] [Debug] runtime `
            + `response: ${res}`);
        if (res === 'Injected') {
            window.postMessage({
                action: 'get_ace_codes',
                indexs: editorIndexs
            });
            return new Promise((resolve) => {
                window.addEventListener('message', (event) => {
                    const data = event.data;
                    if (data.action !== undefined
                        && data.action === 'ace_codes') {
                        console.log(`[COD Result] [Debug] data: `
                            + `${JSON.stringify(data)}`);
                        resolve(data.codes);
                    }
                }, true);
            })
        }
        console.log(`[COD Result] [Debug] Can't Get Code From Page`);
        return ['CANT GET CODE', 'CANT GET CODE',
            'CANT GET CODE', 'CANT GET CODE'];
    });
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