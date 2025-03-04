import { Id } from "@/params";

import Req, { Type } from "#cs/Req";
import Res from "#cs/Res";

export async function sendTab<T extends Type>(req: Extract<Req, { type: T }>): Promise<Res<T>> {
    const res: string = await chrome.tabs.sendMessage(Id, req);
    return JSON.parse(res);
}
