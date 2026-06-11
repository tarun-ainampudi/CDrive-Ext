function getRQCommonContent(div) {
    const passageDivs = div.querySelectorAll(
        "div[aria-labelledby='common-content']"
    );
    return getContentFromDivs(passageDivs);
}

function getRQuestionContent(div) {
    const questionDivs = div.querySelectorAll(
        "div[aria-labelledby='question-data']"
    );
    return getContentFromDivs(questionDivs);
}

function getRQAnswer(div) {
    const correctedTick = div.querySelector('img[src*="correct_ans"]');
    if (correctedTick) {
        const imgParent = correctedTick.parentElement;
        return imgParent.parentElement.innerText.trim();
    }
    return '';
}

function getRQuestionsInCPage() {
    const questionsInPage = [];
    const questionDivs = document.querySelectorAll(
        '[aria-labelledby="each-section-questions"]'
    );
    questionDivs.forEach((div) => {
        const question = {};

        const passage = getRQCommonContent(div);
        if (passage) question.passage = passage;

        const questionContent = getRQuestionContent(div);
        if (questionContent) question.question = questionContent;

        const answer = getRQAnswer(div);
        if (answer) question.answer = answer;

        questionsInPage.push(question);
    });
    return questionsInPage;
}

// eslint-disable-next-line no-unused-vars
function downloadMcqResultJson() {
    switchResultPage();
    let questions = [];
    const pageSwitchElement = document.querySelectorAll('li');
    if (pageSwitchElement.length !== 0) {
        for (let i = 0; i < pageSwitchElement.length; i++) {
            if (!pageSwitchElement[i].innerText) continue;
            questions = [...questions, ...getRQuestionsInCPage()];
            pageSwitchElement[i].querySelector('a').click();
        }
    } else {
        questions = getRQuestionsInCPage();
        console.log(`[MCQ Result] Questions: ${JSON.stringify(questions)}`);
    }
    return questions;
}
