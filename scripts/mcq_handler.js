const sleep = ms => new Promise(r => setTimeout(r, ms));

function selectQuestion(questionSelector) {
    const question = questionSelector.querySelector("div");
    let qNum = '';
    if (question) {
        qNum = question.innerText.trim();
        question.click();
    }
    return qNum;
}

function getContentFromDivs(divs) {
    return [...divs]
        .map(div => div.innerText.replace(/\s+/g, ' ').trim())
        .join('\n');
}


function getQuestionCommonContent() {
    const passageDivs = document
        .querySelectorAll("div[aria-labelledby='common-content']");
    return getContentFromDivs(passageDivs);
}

function getQuestionContent() {
    const questionDivs = document
        .querySelectorAll("div[aria-labelledby='question-data']");
    return getContentFromDivs(questionDivs);
}

function getOptionsForQuestion() {
    const optionsDivs = document
        .querySelectorAll("div[aria-labelledby='each-option-cont']");
    return [...optionsDivs]
        .map(div => div.innerText.replace(/\s+/g, ' ').trim())
}

function answerMcqs() {

    let status = 'MCQ Questions Not Found';

    const questionNumberDivs = document
        .querySelectorAll("div[aria-labelledby='each-question']");
    if (questionNumberDivs.length == 0) return status;

    status = 'Completed Answering MCQs';

    questionNumberDivs.forEach((questionSelector, qIndex) => {
        const questionNumber = selectQuestion(questionSelector)
        if (questionNumber) {
            // await sleep(300);

            const que = {}
            que.questionNumber = questionNumber;
            const passage = getQuestionCommonContent();
            if (passage) que.passage = passage
            const question = getQuestionContent();
            if (question) que.question = question;
            const option = getOptionsForQuestion();
            option.forEach((val, index) => {
                que[`option${index + 1}`] = val;
            });
            console.log(que);

        } else {
            status = "Partially Completed Answering MCQs Verify Manually For Errors"
            console.warn(`No inner div found for question index ${qIndex}`);
        }

    });

    return status;
}

function downloadMcqTestJson() {

    const questionNumberDivs = document
        .querySelectorAll("div[aria-labelledby='each-question']");
    if (questionNumberDivs.length == 0) return;
    const questions = []
    questionNumberDivs.forEach((questionSelector, qIndex) => {
        const questionNumber = selectQuestion(questionSelector)
        if (questionNumber) {
            const question = {}
            question.questionNumber = questionNumber;
            const passage = getQuestionCommonContent();
            if (passage) question.passage = passage
            const questionContent = getQuestionContent();
            if (questionContent) question.question = questionContent;
            const option = getOptionsForQuestion();
            option.forEach((val, index) => {
                question[`option${index + 1}`] = val;
            });
            questions.push(question)
        } else {
            console.warn(`No inner div found for question index ${qIndex}`);
        }

    });
    const file_name = (getTestInfo()['Test Name'] || "Assessment")
        + " Questions.json";
    downloadJson(questions, file_name)
}
