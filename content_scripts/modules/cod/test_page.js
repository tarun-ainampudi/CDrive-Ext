function checkForDuplicationOfQs(solvedKey) {
  const seen = new Set();
  for (const { question } of solvedKey) {
    if (seen.has(question)) {
      return true;
    }
    seen.add(question);
  }
  return false;
}

function mergeSameQuestionsIntoOne(solvedKey) {
  const tempDic = {};
  for (const { question, language, code } of solvedKey) {
    tempDic[question] ??= { question };
    tempDic[question][language] = code;
  }
  const mergedSolvedKey = Object.values(tempDic);
  console.log(
    `[COD Test] Merged solvedKey: ${JSON.stringify(mergedSolvedKey)}`,
  );
  return mergedSolvedKey;
}

function fillCodeInInput(code, inputElement) {
  inputElement.value = code;
  inputElement.dispatchEvent(new Event("input", { bubbles: true }));
  return "code";
}

function selectLanguageOfCode(lang) {
  const dropDownDivs = document.querySelectorAll(".mydropdown");
  if (dropDownDivs.length === 0) {
    console.log(`[COD Test] Cannot find dropDown to Select Language`);
    return "";
  } else if (dropDownDivs.length === 1) {
    dropDownDivs[0].click();
    const langOptions = [...document.querySelectorAll(".each-option")];
    const langNames = langOptions.map((div) => {
      return div.innerText.replace(/[^A-Za-z+]/g, "").toLowerCase();
    });
    const isSelected = langOptions.some((option, index) => {
      if (lang === langNames[index]) {
        option.click();
        return true;
      }
      return false;
    });
    let javaIndex;
    if (!isSelected && (javaIndex = langNames.indexOf("java")) !== -1) {
      console.log(`[COD Test] Selected default java language`);
      langOptions[javaIndex].click();
      return "java";
    } else if (!isSelected) {
      console.log(`[COD Test] Cannot find languages to select in dropDown`);
      return "";
    } else {
      return lang;
    }
  } else {
    console.log(`[COD Test] Multiple dropDowns found!`);
    return "";
  }
}

function answerBasedOnTheLength(solvedKey, inputElement) {
  const nOfQuestions = document.querySelectorAll(
    "div[aria-labelledby='each-question']",
  ).length;
  if (solvedKey.length === 1 && nOfQuestions === 1) {
    console.log(
      `[COD TEST PAGE] Answering based on the length of Key and Questions`,
    );
    return fillCodeInInput(solvedKey[0]["code"], inputElement);
  }
  return "";
}

function checkMatchBasedOnIncludes(question, solvedQuestion) {
  if (solvedQuestion.includes("and")) {
    const sQParts = solvedQuestion.split(/\band\b/);
    const filterQParts = sQParts.filter((part) => {
      return question.includes(part);
    });
    if (sQParts.length === filterQParts.length) {
      return true;
    }
  }
  if (solvedQuestion.includes(question) || question.includes(solvedQuestion)) {
    return true;
  }
  return false;
}

function answerCodIfExistInKey(question, solvedKey, inputElement) {
  let answerIndex = -1;
  const nOfSQsIncludesQ = [];
  const parsedQuestion = question.trim().toLowerCase();
  const nOfQuestions = solvedKey.reduce((acc, ele, index) => {
    const solvedQ = ele.question.trim().toLowerCase();
    console.log(`[COD TEST PAGE] [Debug] ${solvedQ} === ${parsedQuestion}`);
    if (solvedQ === parsedQuestion) {
      answerIndex = index;
      acc = acc + 1;
    }
    if (checkMatchBasedOnIncludes(parsedQuestion, solvedQ)) {
      nOfSQsIncludesQ.push(index);
    }
    return acc;
  }, 0);
  if (nOfQuestions == 1 && answerIndex != -1) {
    console.log(`[COD TEST PAGE] Found Exact Question`);
    return fillCodeInInput(solvedKey[answerIndex]["code"], inputElement);
  } else if (nOfSQsIncludesQ.length == 1) {
    console.log(`[COD TEST PAGE] Found Similar Question`);
    return fillCodeInInput(solvedKey[nOfSQsIncludesQ[0]]["code"], inputElement);
  }
  console.log(`[COD TEST PAGE] Can't Find Question`);
  return answerBasedOnTheLength(solvedKey, inputElement);
}

function skipQuestionIfWarning() {
  const rejectBtn = document.querySelector("#tt-playground-alert-reject");
  if (rejectBtn !== null) {
    rejectBtn.click();
  }
}

// eslint-disable-next-line no-unused-vars
async function answerCodes(testName) {
  let status = "COD Questions Not Found";

  const questionNumberDivs = document.querySelectorAll(
    "div[aria-labelledby='each-question']",
  );
  if (questionNumberDivs.length == 0) return status;

  status = `Solved Key Not Found for ${testName}`;

  const solvedKey = await fetchAnswersByTestName(testName);
  if (!Array.isArray(solvedKey) || solvedKey.length === 0) return status;

  status = "Completed Answering CODs";

  questionNumberDivs.forEach((questionSelector, qIndex) => {
    const questionNumber = selectQuestion(questionSelector);
    skipQuestionIfWarning();
    if (questionNumber) {
      const questionContent = getQuestionContent();
      const inputElement = getInputElementInPage();
      if (inputElement == null) {
        console.log(`[COD TEST PAGE] Can't find input element`);
        status =
          "Some Questions are not Found in solvedKey Answer them Manually";
        return;
      }
      const answer = answerCodIfExistInKey(
        questionContent,
        solvedKey,
        inputElement,
      );
      if (!answer)
        status =
          "Some Questions are not Found in solvedKey Answer them Manually";
    } else {
      status = "Partially Completed Answering CODs Verify Manually For Errors";
      console.warn(
        `[COD TEST PAGE] No inner div found for question index ${qIndex}`,
      );
    }
  });

  return status;
}
