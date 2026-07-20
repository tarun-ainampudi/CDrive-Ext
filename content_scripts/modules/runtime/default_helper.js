function mcqSingleCrtEventEmitter(evt) {
    const mcqSingleCrtEle = document.querySelector('mcqsinglecorrect-answer');
    if (mcqSingleCrtEle !== null) {
        const ctx = mcqSingleCrtEle.__ngContext__;
        if (ctx === undefined) {
            console.log(`[Default Helper] [Debug] ngContext === undefined`);
            return;
        }
        const comp = ctx.find((v) => v && v.optionClick);
        if (comp === undefined) {
            console.log(`[Default Helper] [Debug] comp === undefined`);
            return;
        }
        comp.action.emit({
            type: 'event',
            data: {
                event_type: evt,
            },
        });
        console.log(`[Default Helper] [Debug] Emitted Event: ${evt}`);
        return;
    }
    console.log(
        `[Default Helper] [Debug] mcqSingleCrtEle not found to Emmit Event`
    );
}

window.addEventListener(
    'message',
    (event) => {
        const data = event.data;
        if (
            data.action !== undefined &&
            data.action === 'mcq-scorrect-heart-beat'
        ) {
            console.log(`[Default Helper] [Debug] action: heart-beat`);
            mcqSingleCrtEventEmitter('heart-beat');
            return;
        }
        if (
            data.action !== undefined &&
            data.action === 'mcq-scorrect-option-click'
        ) {
            console.log(`[Default Helper] [Debug] action: option-click`);
            mcqSingleCrtEventEmitter('option-click');
            return;
        }
    },
    true
);
