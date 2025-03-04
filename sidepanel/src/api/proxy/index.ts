import { Id } from "@/params";
import Form from "#/sidepanel/Form";

import define from "./define";

type Resolve<T> = (value: T) => void;
type RRecvFn = (data: any, sender: chrome.runtime.MessageSender, respond: (res?: any) => void) => boolean;

if (import.meta.env.DEV) {
    define();

    const rSend = new Map<number, Resolve<any>>();
    let rsId = 0;

    const tSend = new Map<number, Resolve<any>>();
    let tsId = 0;

    const tUpdate = new Map<number, Resolve<chrome.tabs.Tab | undefined>>();
    let tuId = 0;

    const rRecvFns: RRecvFn[] = [];

    const ws = new WebSocket(`ws://localhost:3001?user=client&id=${Id}`);
    ws.onmessage = (e) => {
        const form = JSON.parse(e.data) as Form;
        const { type, id, data } = form;

        if (type === "R_SEND_RES") {
            const resolve = rSend.get(id);
            if (resolve) {
                resolve(data);
                rSend.delete(id);
            }
        } else if (type === "R_RECV_REQ") {
            const { sender } = form;
            for (const callback of rRecvFns) {
                callback(data, sender, (res) => {
                    ws.send(JSON.stringify({
                        type: "R_RECV_RES", id,
                        data: res,
                    } satisfies Form));
                });
            }
        } else if (type === "T_SEND_RES") {
            const resolve = tSend.get(id);
            if (resolve) {
                resolve(data);
                tSend.delete(id);
            }
        } else if (type === "T_UPDATE_RES") {
            const resolve = tUpdate.get(id);
            if (resolve) {
                resolve(data);
                tUpdate.delete(id);
            }
        }
    };

    async function wait() {
        return new Promise<void>((resolve) => {
            if (ws.readyState === WebSocket.OPEN) {
                resolve();
                return;
            }
            const handleOpen = () => {
                ws.removeEventListener("open", handleOpen);
                resolve();
            };
            ws.addEventListener("open", handleOpen);
        });
    }

    chrome.runtime.sendMessage = async (data: any): Promise<any> => {
        await wait();
        const req: Form = {
            type: "R_SEND_REQ",
            id: rsId++,
            data,
        };
        return new Promise((resolve) => {
            rSend.set(req.id, resolve);
            ws.send(JSON.stringify(req));
        });
    };

    chrome.runtime.onMessage.addListener = (callback: RRecvFn) => {
        rRecvFns.push(callback);
    };

    chrome.tabs.sendMessage = async (tabId: number, data: any): Promise<any> => {
        await wait();
        const req: Form = {
            type: "T_SEND_REQ",
            id: tsId++,
            tabId, data,
        };
        return new Promise((resolve) => {
            tSend.set(req.id, resolve);
            ws.send(JSON.stringify(req));
        });
    };

    // @ts-ignore
    chrome.tabs.update = async (data: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab | undefined> => {
        await wait();
        const req: Form = {
            type: "T_UPDATE_REQ",
            id: tuId++,
            data,
        };
        return new Promise((resolve) => {
            tUpdate.set(req.id, resolve);
            ws.send(JSON.stringify(req));
        });
    };
}
