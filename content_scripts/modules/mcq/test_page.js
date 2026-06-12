// eslint-disable-next-line no-unused-vars
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function selectQuestion(questionSelector) {
    const question = questionSelector.querySelector('div');
    let qNum = '';
    if (question) {
        qNum = question.innerText.trim();
        question.click();
    }
    return qNum;
}

function getContentFromDivs(divs) {
    return [...divs]
        .map((div) => div.innerText.replace(/\s+/g, ' ').trim())
        .join('\n');
}

function getQuestionCommonContent() {
    const passageDivs = document.querySelectorAll(
        "div[aria-labelledby='common-content']"
    );
    return getContentFromDivs(passageDivs);
}

function getQuestionContent() {
    const questionDivs = document.querySelectorAll(
        "div[aria-labelledby='question-data']"
    );
    return getContentFromDivs(questionDivs);
}

function getOptionsForQuestion() {
    const optionsDivs = document.querySelectorAll(
        "div[aria-labelledby='each-option-cont']"
    );
    return [...optionsDivs].map((div) =>
        div.innerText.replace(/\s+/g, ' ').trim()
    );
}

function selectOption(answer) {
    const optionsDivs = document.querySelectorAll(
        "div[aria-labelledby='each-option-cont']"
    );
    const options = getOptionsForQuestion();
    const ansIndex = options.indexOf(answer.replace(/\s+/g, ' ').trim());
    if (ansIndex != -1) {
        if (optionsDivs[ansIndex].querySelector('input:checked') === null)
            optionsDivs[ansIndex].firstChild.click();
        return options[ansIndex];
    }
    return '';
}

function answerBasedOnTheOption(solvedKey) {
    const currentOptions = getOptionsForQuestion();
    const questionsHavingCOps = solvedKey.filter((element) => {
        return currentOptions.includes(
            element.answer.replace(/\s+/g, ' ').trim()
        );
    });
    if (questionsHavingCOps.length == 1) {
        return selectOption(questionsHavingCOps[0].answer);
    }
    return '';
}

function answerQueIfExistInKey(question, solvedKey) {
    let answerIndex = -1;
    const nOfSQsIncludesQ = [];
    const nOfQuestions = solvedKey.reduce((acc, ele, index) => {
        const solvedQ = ele.question;
        if (solvedQ === question) {
            answerIndex = index;
            acc = acc + 1;
        }
        if (solvedQ.includes(question) || question.includes(solvedQ)) {
            nOfSQsIncludesQ.push(index);
        }
        return acc;
    }, 0);
    if (nOfQuestions == 1 && answerIndex != -1) {
        return selectOption(solvedKey[answerIndex].answer);
    } else if (nOfSQsIncludesQ.length == 1) {
        return selectOption(solvedKey[nOfSQsIncludesQ[0]].answer);
    }
    return answerBasedOnTheOption(solvedKey);
}

// eslint-disable-next-line no-unused-vars
async function answerMcqs(testName) {
    let status = 'MCQ Questions Not Found';

    const questionNumberDivs = document.querySelectorAll(
        "div[aria-labelledby='each-question']"
    );
    if (questionNumberDivs.length == 0) return status;

    status = `Solved Key Not Found for ${testName}`;

    const solvedKey = await fetchAnswersByTestName(testName);
    if (!Array.isArray(solvedKey) || solvedKey.length === 0) return status;

    status = 'Completed Answering MCQs';

    questionNumberDivs.forEach((questionSelector, qIndex) => {
        const questionNumber = selectQuestion(questionSelector);
        if (questionNumber) {
            const questionContent = getQuestionContent();
            const answer = answerQueIfExistInKey(questionContent, solvedKey);
            if (!answer)
                status =
                    'Some Questions are not Found in solvedKey Answer them Manually';
        } else {
            status =
                'Partially Completed Answering MCQs Verify Manually For Errors';
            console.warn(`No inner div found for question index ${qIndex}`);
        }
    });

    return status;
}

// eslint-disable-next-line no-unused-vars
function downloadMcqTestJson() {
    const questionNumberDivs = document.querySelectorAll(
        "div[aria-labelledby='each-question']"
    );
    if (questionNumberDivs.length == 0) return;
    const questions = [];
    questionNumberDivs.forEach((questionSelector, qIndex) => {
        const questionNumber = selectQuestion(questionSelector);
        if (questionNumber) {
            const question = {};
            question.questionNumber = questionNumber;
            const passage = getQuestionCommonContent();
            if (passage) question.passage = passage;
            const questionContent = getQuestionContent();
            if (questionContent) question.question = questionContent;
            const options = getOptionsForQuestion();
            options.forEach((val, index) => {
                question[`option${index + 1}`] = val;
            });
            questions.push(question);
        } else {
            console.warn(`No inner div found for question index ${qIndex}`);
        }
    });
    const file_name =
        (getTestInfo()['Test Name'] || 'Assessment') + ' Questions.json';
    downloadJson(questions, file_name);
}
