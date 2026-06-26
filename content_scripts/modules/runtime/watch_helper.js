function playVideo() {
    const videoEle = document.querySelector("app-video");
    if (videoEle !== null) {
        const ctx = videoEle.__ngContext__;
        if (ctx === undefined) {
            console.log(`[Watch Helper] [Debug] ngContext === undefined`);
            return;
        }
        const comp = ctx.find(v => v && v.durationUpdate);
        comp.durationUpdate.emit("play");
        console.log(`[Watch Helper] [Debug] Played Video with the help of __ngContext__`);
        return;
    }
    console.log(`[Watch Helper] [Debug] videoEle not found to play`);
}

window.addEventListener(
    'message',
    (event) => {
        const data = event.data;
        if (data.action !== undefined && data.action === 'play_video') {
            console.log(`[Watch Helper] [Debug] action: play_video`);
            playVideo();
        }
    },
    true
);
