/* eslint-disable no-unused-vars */

function getInfo(divs) {
  if (divs.length == 0) return {};
  const info = {};
  divs.forEach((div) => {
    const parts = div.innerText.split(":");
    if (parts.length != 2 || parts[0].trim() == "") return;
    info[parts[0].trim()] = parts[1].trim();
  });
  return info;
}

function getTestInfo() {
  return getInfo(document.querySelectorAll(".section-name"));
}

function getTestType() {
  const typeDivs = document.querySelectorAll(
    'div[aria-labelledby="question-type"]',
  );
  if (typeDivs.length == 0) return "";
  return typeDivs[0].innerText.trim();
}

function getCourseAndTestIds() {
  const curr_path = window.location.href.split("=");
  if (
    !curr_path[0].trim().toLowerCase().includes("/test?id") &&
    curr_path.length != 2
  )
    return {};
  return {
    c_id: curr_path[1].trim().substring(0, 36),
    t_id: curr_path[1].trim().substring(36),
  };
}

function getResultInfo() {
  return getInfo(document.querySelectorAll('[aria-label="header-each-cont"]'));
}

function switchResultPage() {
  const questionDivs = document.querySelectorAll(
    '[aria-labelledby="each-section-questions"]',
  );
  if (questionDivs.length === 0) {
    console.log(`[Test Handler] Sections Not Found Switching Page`);
    const switchDiv = document.querySelector("#sectionsID");
    if (switchDiv) switchDiv.click();
  }
}

function getResultSections() {
  switchResultPage();
  const sectionTypeDivs = document.querySelectorAll(
    'div[aria-labelledby="each-section"]',
  );
  if (sectionTypeDivs.length === 0) {
    console.log(`[Test Handler] Sections Not Found Even After Page Switch`);
    return [];
  } else {
    return [...sectionTypeDivs];
  }
}

function downloadJson(json, filename) {
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function fetchAnswersByTestName(testName, count = 0) {
  const url = getUrlByTestName(testName);
  console.log(`[Test Handler] ${testName}: ${url}`);
  if (!url) return [];
  return await fetch(url)
    .then(async (res) => {
      console.log(`[Test Handler] response status: ${res.status}`);
      if (res.status == 200 || res.status == 304) {
        return res.json();
      } else if (res.status == 503 && count < 3) {
        console.log(`[Test Handler] retrying fetch in 5 seconds`);
        await sleep(5000);
        return fetchAnswersByTestName(testName, count + 1);
      } else {
        console.log(`[Test Handler] Unknown Status Code returning Empty List`);
        return [];
      }
    })
    .catch((err) => {
      console.error(
        `Error fetching solved key 
                for Test : ${testName} Url: ${url}:`,
        err,
      );
      return [];
    });
}
