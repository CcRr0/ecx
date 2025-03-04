import { insertBelow } from ".";
import { VideoInfo } from "#cs/fetch/video";

import { diff, remaining } from "#/utils/time";
import { formatDiff } from "#/utils/format";

import Horizontal from "#cs/comps/horizontal";
import Progress from "#cs/comps/progress";
import Badge from "#cs/comps/badge";

type Status = "Att" | "Abs" | "Pend" | "Disabled";

export default function videoExt(video: Element, info: VideoInfo) {
    const title = video.querySelector("span.instancename")!.firstChild!.textContent!.trim();
    const prog = info[title];
    if (prog === undefined) {
        return;
    }

    const { actual, required } = prog;

    const [from, due] = video.querySelector("span.text-ubstrap")!.textContent!.split("~").map(s => new Date(s));
    const [rem, left] = remaining(due);

    const status: Status = (() => {
        if (Date.now() < from.getTime()) {
            return "Disabled";
        }
        if (actual < required) {
            return left ? "Pend" : "Abs";
        }
        return "Att";
    })();

    const el = Horizontal();
    insertBelow(video, el);

    const progEl = Progress(actual, required);

    const vRemEl = (() => {
        if (status !== "Pend") {
            return null;
        }
        const vRem = diff(actual, required);
        const vRemText = formatDiff(vRem);
        return Badge(`${vRemText} 필요`, "warning");
    })();

    const statusEl = (() => {
        if (status === "Att") {
            return Badge("출석", "success");
        } else if (status === "Abs") {
            return Badge("결석", "danger");
        } else if (status === "Pend") {
            const remText = formatDiff(rem);
            return Badge(`${remText} 남음`, "primary");
        } else { // if (status === "Disabled")
            return Badge("아직 시청할 수 없음", "secondary");
        }
    })();

    el.append(...[
        progEl, "\u00A0",
        vRemEl,
        statusEl,
    ].filter(e => e !== null));
}
