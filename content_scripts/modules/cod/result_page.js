"show-sol-check-cont"
"correct-answer-mark-cont"
"answer-header"
    .ace_content
function checkAllSolutions() {
    const solCheckBoxes = document
        .querySelectorAll('div[aria-labelledby="show-sol-check-cont"]');
    solCheckBoxes.forEach((checkBox, index) => {
        if (index % 2 != 0 && !checkBox.querySelector('input').checked) {
            checkBox.firstChild.click();
        }
    })

}

function getSolutionsForCode(div) {
    const solutions = {};
    const answerHeaders = div
        .querySelectorAll('[aria-labelledby="answer-header"]');
    const codeContents = div.querySelectorAll('.ace_editor');
    answerHeaders.forEach((answer, index) => {
        const lang = answer.innerText.split('\n')[1];
        const code = codeContents[index].innerText;
        console.log(`[COD Result] [Debug] code: ${code}`);
        solutions[lang] = code;
    })
    return solutions;
}

function getRCodesInCPage() {
    checkAllSolutions();
    const codesInPage = [];
    const codeDivs = document
        .querySelectorAll('[aria-labelledby="each-section-questions"]');
    codeDivs.forEach((div) => {
        let code = {};

        const passage = getRQCommonContent(div);
        if (passage) code.passage = passage;

        const questionContent = getRQuestionContent(div);
        if (questionContent) code.question = questionContent;

        const solutionsDiv = div
            .querySelector('div[aria-labelledby="correct-answer-mark-cont"]');
        const answer = getSolutionsForCode(solutionsDiv);

        code = { ...code, ...answer };

        codesInPage.push(code);
    });
    return codesInPage;
}

function downloadCodeResultJson() {
    switchResultPage();
    let questions = []
    const pageSwitchElement = document.querySelectorAll('li');
    if (pageSwitchElement.length !== 0) {
        for (let i = 0; i < pageSwitchElement.length; i++) {
            if (!pageSwitchElement[i].innerText) continue;
            questions = [...questions, ...getRCodesInCPage()]
            pageSwitchElement[i].querySelector('a').click()
        }
    } else {
        questions = getRCodesInCPage()
        console.log(`[COD Result] Questions: ${JSON.stringify(questions)}`);
    }
    return questions;
}