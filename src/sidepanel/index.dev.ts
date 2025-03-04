import { Id } from "./params";
import Form from "./Form";

import "./iframe";

const ws = new WebSocket(`ws://localhost:3001?user=server&id=${Id}`);

ws.addEventListener("message", async (e) => {
    const form = JSON.parse(e.data) as Form;
    const { type, id, data } = form;

    if (type === "R_SEND_REQ") {
        const res = await chrome.runtime.sendMessage(data);
        ws.send(JSON.stringify({
            type: "R_SEND_RES", id,
            data: res,
        } satisfies Form));
    } else if (type === "R_RECV_RES") {
        const respond = rRecv.get(id);
        if (respond) {
            respond(data);
            rRecv.delete(id);
        }
    } else if (type === "T_SEND_REQ") {
        const { tabId } = form;
        const res = await chrome.tabs.sendMessage(tabId, data);
        ws.send(JSON.stringify({
            type: "T_SEND_RES", id,
            data: res,
        } satisfies Form));
    } else if (type === "T_UPDATE_REQ") {
        const res = await chrome.tabs.update(data);
        ws.send(JSON.stringify({
            type: "T_UPDATE_RES", id,
            data: res,
        } satisfies Form));
    }
});

type Respond = (res?: any) => void;

const rRecv = new Map<number, Respond>();
let rrId = 0;

chrome.runtime.onMessage.addListener((data, sender, respond) => {
    const req: Form = {
        type: "R_RECV_REQ",
        id: rrId++,
        data, sender,
    };
    rRecv.set(req.id, respond);
    ws.send(JSON.stringify(req));
    return true;
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.sender?.tab!.id === Id) {
        port.postMessage({});
        void chrome.tabs.connect(Id);
    }
});
void chrome.tabs.connect(Id);
