let isTyperActive = false;

async function injectTextInToInput(text) {

    const inputElement = getInputElementInPage();
    if (inputElement !== null
        && inputElement.value !== undefined) {

        isTyperActive = true;
        for (let i = 0; i < text.length; i++) {
            if (!isTyperActive) {
                console.log("[Paste Handler] Inject text stopped");
                return;
            }
            const char = text[i];
            const start = inputElement.selectionStart || 0;
            const end = inputElement.selectionEnd || 0;
            const input = inputElement.value || '';
            const newText = input.substring(0, start) + char + input.substring(end);
            inputElement.value = newText;
            inputElement.setSelectionRange(start + 1, start + 1);
            await sleep(100 + 100 * Math.random());
            if (char === '\n') await sleep(1250 + 1000 * Math.random())
            if (char === ' ') await sleep(50 + 100 * Math.random())
            inputElement.dispatchEvent(new Event('input'))
        }

        return;
    }
    console.log("[Paste Handler] Can't inject text in to input")
}

async function pasteClipboardByTyping() {
    console.log("[Paste Handler] pasteClipboardByTyping Initiated")
    try {
        const clippedText = await navigator.clipboard.readText();
        console.log("[Paste Handler] clippedText:", clippedText);
        if (!clippedText) {
            console.log("[Paste Handler] Empty clippedText");
            return;
        }
        const formattedText = clippedText
            .trim()
            .split("\n")
            .map(e => e.trim())
            .join("\n");
        await injectTextInToInput(formattedText);
        console.log("[Paste Handler] pasteClipboardByTyping Ended");
    } catch (err) {
        console.error("[Paste Handler] pasteClipboardByTyping failed:", err);
    }
}

function getInputElementInPage() {
    const testType = getTestType().toLowerCase();
    if (!testType.includes("program")
        && !testType.includes("cod"))
        console.log(`[Paste Handler] Invalid Test Type: ${testType}`);
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT'
        || activeElement.tagName === 'TEXTAREA') {
        console.log(`[Paste Handler] Input Element Selected By Tag Name`);
        return activeElement;
    }
    const answerEditors = document
        .querySelectorAll('div[aria-labelledby="editor-answer"].ace_editor');
    if (answerEditors.length === 1) {
        console.log(`[Paste Handler] Input Element Selected By filteredAEds.length === 1`);
        return answerEditors[0].querySelector('.ace_text-input');
    }
    const textInputs = document.querySelectorAll(".ace_text-input");
    if (textInputs.length <= 0) {
        console.log(`[Paste Handler] No Text Elements with .ace_text-input`);
    } else {
        if (textInputs.length === 1) {
            console.log(`[Paste Handler] Input Element Selected By textInputs.length === 1`);
            return textInputs[0];
        } else {
            console.log(`[Paste Handler] Random selection of input`);
            return textInputs[Math.floor((textInputs.length - 1) * Math.random())]
        }
    }
    return null;
}
