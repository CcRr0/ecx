import Req from "./Req";

const orig = "https://learn.hansung.ac.kr";
const path = (id: number) => (
    process.env.NODE_ENV === "production"
        ? `/sidepanel/index.html?id=${id}`
        : `/sidepanel/index.dev.html?id=${id}`
);

async function enable(tabId: number) {
    return chrome.sidePanel.setOptions({
        tabId,
        path: path(tabId),
        enabled: true,
    });
}

async function disable(tabId: number) {
    return chrome.sidePanel.setOptions({
        tabId,
        enabled: false,
    });
}

void chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: false,
});

chrome.tabs.onUpdated.addListener(async (tabId, _info, tab) => {
    if (!tab.url) {
        return;
    }
    const url = new URL(tab.url);
    if (url.origin !== orig) {
        await disable(tabId);
        return;
    }
    await enable(tabId);
});

chrome.runtime.onMessage.addListener((req: Req, sender, respond) => {
    const { type } = req;
    if (type === "SP_OPEN") {
        const tabId = sender.tab!.id!;
        (async () => {
            await chrome.sidePanel.open({ tabId });
            await enable(tabId);
        })();
    } else if (type === "SP_CLOSE") {
        const tabId = sender.tab!.id!;
        (async () => {
            await disable(tabId);
            await enable(tabId);
        })();
    }
    respond();
    return false;
});
