function fillCodeInInput(code, inputElement) {
    inputElement.value = code;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    return 'code';
}

function answerBasedOnTheLength(solvedKey, inputElement) {
    const nOfQuestions = document
        .querySelectorAll("div[aria-labelledby='each-question']").length;
    if (solvedKey.length === 1 && nOfQuestions === 1) {
        console.log(`[COD TEST PAGE] Answering based on the length of Key and Questions`);
        return fillCodeInInput(solvedKey[0]['code'], inputElement);
    }
    return '';
}

function answerCodIfExistInKey(question, solvedKey, inputElement) {
    let answerIndex = -1;
    let nOfSQsIncludesQ = [];
    const nOfQuestions = solvedKey.reduce((acc, ele, index) => {
        const solvedQ = ele.question;
        console.log(`[COD TEST PAGE] [Debug] ${solvedQ.toLowerCase()} === ${question.toLowerCase()}`);
        if (solvedQ.toLowerCase() === question.toLowerCase()) {
            answerIndex = index;
            acc = acc + 1;
        }
        if (solvedQ.toLowerCase().includes(question.toLowerCase())
            || question.toLowerCase().includes(solvedQ.toLowerCase())) {
            nOfSQsIncludesQ.push(index);
        }
        return acc;
    }, 0)
    if (nOfQuestions == 1 && answerIndex != -1) {
        console.log(`[COD TEST PAGE] Found Exact Question`);
        return fillCodeInInput(solvedKey[answerIndex]['code'], inputElement);
    } else if (nOfSQsIncludesQ.length == 1) {
        console.log(`[COD TEST PAGE] Found Similar Question`);
        return fillCodeInInput(solvedKey[nOfSQsIncludesQ[0]]['code'], inputElement);
    }
    console.log(`[COD TEST PAGE] Can't Find Question`);
    return answerBasedOnTheLength(solvedKey, inputElement);

}

function skipQuestionIfWarning() {
    const rejectBtn = document
        .querySelector('#tt-playground-alert-reject');
    if (rejectBtn !== null) {
        rejectBtn.click();
    }
}

async function answerCodes(testName) {

    let status = 'COD Questions Not Found';

    const questionNumberDivs = document
        .querySelectorAll("div[aria-labelledby='each-question']");
    if (questionNumberDivs.length == 0) return status;

    status = `Solved Key Not Found for ${testName}`;

    const solvedKey = await fetchAnswersByTestName(testName);
    if (!Array.isArray(solvedKey) || solvedKey.length === 0) return status;

    status = 'Completed Answering CODs';

    questionNumberDivs.forEach((questionSelector, qIndex) => {
        const questionNumber = selectQuestion(questionSelector)
        skipQuestionIfWarning();
        if (questionNumber) {
            const questionContent = getQuestionContent();
            const inputElement = getInputElementInPage();
            if (inputElement == null) {
                console.log(`[COD TEST PAGE] Can't find input element`);
                status = 'Some Questions are not Found in solvedKey Answer them Manually';
                return;
            }
            const answer = answerCodIfExistInKey(questionContent, solvedKey, inputElement);
            if (!answer)
                status = 'Some Questions are not Found in solvedKey Answer them Manually';
        } else {
            status = "Partially Completed Answering CODs Verify Manually For Errors";
            console.warn(`[COD TEST PAGE] No inner div found for question index ${qIndex}`);
        }

    });

    return status;
}