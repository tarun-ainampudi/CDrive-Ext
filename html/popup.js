document.addEventListener('DOMContentLoaded', async () => {
    popupInit();
});

async function popupInit() {
    const creds = await getStoredCredentials();
    const isCheckedPreviosly = await chrome.storage.local.get(
        'default_answer_slowly'
    );
    const credManager = document.querySelector('#credential_manager');
    if (creds !== null) {
        const removeBtn = `<button id="removeStoredCredentials">Remove Credentials</button>`;
        // const changeBtn = `<button id="showCredentials">Change Credentials</button>`;
        credManager.innerHTML = removeBtn; //+ changeBtn;
        document.querySelector('#removeStoredCredentials').addEventListener(
            'click',
            () => {
                removeStoredCredentials();
            },
            true
        );
        // document.querySelector("#showCredentials").addEventListener("click", () => {
        //     showCredentials();
        // }, true);
    } else {
        // const addBtn = `<button id="showCredentials">Add Credentials</button>`;
        credManager.innerHTML = ''; //addBtn;
        // document.querySelector('#showCredentials').addEventListener(
        //     'click',
        //     () => {
        //         showCredentials();
        //     },
        //     true
        // );
    }
    const defHandler = document.querySelector('#defaultHandler');
    if (defHandler !== null) {
        if (isCheckedPreviosly['default_answer_slowly'] !== undefined) {
            defHandler.checked = isCheckedPreviosly['default_answer_slowly'];
        } else {
            chrome.storage.local.set({ default_answer_slowly: false });
        }
        defHandler.addEventListener('change', checkboxHandler, true);
    }
}

async function checkboxHandler(evt) {
    chrome.storage.local.set({ default_answer_slowly: evt.target.checked });
    console.log(`[popup] default_answer_slowly: ${evt.target.checked}`);
    const tabs = await chrome.tabs.query({
        url: ['*://cdc.vit.ac.in/*', '*://*.examly.io/*'],
    });
    for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {
            action: 'update_answer_slowly',
            data: evt.target.checked,
        });
    }
}

async function getStoredCredentials() {
    const creds = await chrome.storage.local.get('loginCredentials');
    console.log(`[popup] Get Creds Obj: ${JSON.stringify(creds)}`);
    if (
        Object.keys(creds).includes('loginCredentials') &&
        creds.loginCredentials.email !== undefined &&
        creds.loginCredentials.password !== undefined
    ) {
        return creds.loginCredentials;
    }
    return null;
}

async function removeStoredCredentials() {
    await chrome.storage.local.remove('loginCredentials');
    console.log('[popup] Credentials Removed Successfully');
    popupInit();
}

async function storeCredentials(creds) {
    await chrome.storage.local.set({ loginCredentials: creds });
    console.log('[popup] Credentials Stored Successfully');
    popupInit();
}

// eslint-disable-next-line no-unused-vars
async function showCredentials() {
    document.body.style.height = '100px';
    const credManager = document.querySelector('#credential_manager');
    const emailInput = `email: <input type="text" id="email"><br>`;
    const passwordInput = `password: <input type="text" id="password"><br>`;
    const submitBtn = `<button id="saveCredentials">Submit</button>`;
    credManager.innerHTML = emailInput + passwordInput + submitBtn;
    document.querySelector('#saveCredentials').addEventListener(
        'click',
        () => {
            saveCredentials();
        },
        true
    );
    const creds = await getStoredCredentials();
    if (creds !== null) {
        document.querySelector('#email').value = creds.email;
        document.querySelector('#password').value = creds.password;
    }
}

async function saveCredentials() {
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    if (
        emailInput !== null &&
        passwordInput !== null &&
        emailInput.value.trim() &&
        passwordInput.value
    ) {
        return storeCredentials({
            email: emailInput.value.trim(),
            password: passwordInput.value,
        });
    }
}
