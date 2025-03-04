import { Id } from "@/params";

if (import.meta.env.PROD) {
    chrome.runtime.onConnect.addListener((port) => {
        if (port.sender?.tab!.id === Id) {
            port.postMessage({});
            void chrome.tabs.connect(Id);
        }
    });
    void chrome.tabs.connect(Id);
}
