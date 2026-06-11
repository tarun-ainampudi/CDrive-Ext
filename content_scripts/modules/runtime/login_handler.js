function getLoginCredsToSave() {
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    if (
        window.location.href.includes('/pwd') &&
        emailInput !== null &&
        passwordInput !== null
    ) {
        return {
            email: emailInput.value.trim(),
            password: passwordInput.value,
        };
    }
    return {};
}

function attachObserverToSubmitBtn() {
    const formDiv = document.querySelector('.formPos');
    const submitBtn = formDiv?.querySelector('button');
    if (submitBtn) {
        console.log('[Login Handler] Attaching Observer to Submit Button');
        submitBtn.onclick = () => {
            const creds = getLoginCredsToSave();
            if (Object.keys(creds).length === 2) {
                console.log(
                    `[Login Handler] Save Creds: ${JSON.stringify(creds)}`
                );
                return storeCredentials(creds);
            }
            console.log(
                `[Login Handler] Invalid Creds Obj: ${JSON.stringify(creds)}`
            );
        };
        return true;
    }
    console.log('[Login Handler] Submit Button Not Found');
    return false;
}

async function storeCredentials(creds) {
    await chrome.storage.local.set({ loginCredentials: creds });
    console.log('[Login Handler] Credentials Stored Successfully');
}

async function getStoredCredentials() {
    const creds = await chrome.storage.local.get('loginCredentials');
    console.log(`[Login Handler] Get Creds Obj: ${JSON.stringify(creds)}`);
    if (
        Object.keys(creds).includes('loginCredentials') &&
        creds.loginCredentials.email !== undefined &&
        creds.loginCredentials.password !== undefined
    ) {
        return creds.loginCredentials;
    }
    return null;
}

function fillCredentials(creds) {
    let status = false;
    const formDiv = document.querySelector('.formPos');
    const submitBtn = formDiv?.querySelector('button');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    if (emailInput !== null && emailInput.value === '') {
        emailInput.value = creds.email;
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (passwordInput !== null && passwordInput.value === '') {
        passwordInput.value = creds.password;
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        status = true;
    }
    if (submitBtn) {
        submitBtn.click();
    }
    return status;
}

function addListenerToAutoFill(creds) {
    if (creds) {
        fillCredentials(creds);
    }
    document.addEventListener(
        'load',
        () => {
            if (creds) fillCredentials(creds);
            else attachObserverToSubmitBtn();
        },
        true
    );
}

async function loginHandlerInit() {
    console.log('[Login Handler] Script Injected');
    const creds = await getStoredCredentials();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addListenerToAutoFill(creds);
        });
    } else {
        addListenerToAutoFill(creds);
    }
}

(() => {
    if (
        !window.location.href.includes('/pwd') &&
        !window.location.href.includes('/login')
    )
        return;
    loginHandlerInit();
})();
