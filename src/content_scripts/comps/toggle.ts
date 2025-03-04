import Req from "#sw/Req";

const OPEN = "◀";
const CLOSE = "▶";

async function open() {
    return chrome.runtime.sendMessage({
        type: "SP_OPEN",
    } satisfies Req);
}

async function close() {
    return chrome.runtime.sendMessage({
        type: "SP_CLOSE",
    } satisfies Req);
}

export default function Toggle() {
    const el = document.createElement("div");
    el.className = "ecx-toggle";

    let state = false;
    el.innerHTML = OPEN;

    function alter(to: boolean) {
        state = to;
        el.innerHTML = to ? CLOSE : OPEN;
    }

    const port = chrome.runtime.connect();
    port.onMessage.addListener(() => {
        alter(true);
    });

    chrome.runtime.onConnect.addListener((port) => {
        port.onDisconnect.addListener(() => {
            alter(false);
        });
    });

    el.onclick = async () => {
        if (state) {
            await close();
        } else {
            alter(true);
            await open();
        }
    };

    return el;
}
