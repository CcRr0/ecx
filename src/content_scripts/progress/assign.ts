import { insertAfter } from ".";
import { fetchAssignInfo } from "#cs/fetch/assign";

import { remaining } from "#/utils/time";
import { formatDate, formatDiff } from "#/utils/format";

import Badge from "#cs/comps/badge";

type Status = "Succ" | "Late" | "Pend" | "None";

export default async function assignExt(assign: Element) {
    const margin = document.createTextNode("\u00A0\u00A0");
    const loadEl = Badge("로드 중...", "warning");
    insertAfter(assign, [margin, loadEl]);

    const a = assign.querySelector("a")!;
    const id = Number(new URL(a.href).searchParams.get("id"));

    const { due: dueIso, submit: submitIso, block } = await fetchAssignInfo(id);
    const due = dueIso ? new Date(dueIso) : null;
    const submit = submitIso ? new Date(submitIso) : null;

    const [rem, left] = due ? remaining(due) : [null, true];

    loadEl.remove();
    margin.remove();

    const status: Status = (() => {
        if (!due) {
            return submit ? "Succ" : "Pend";
        }
        if (!submit) {
            return left ? "Pend" : "None";
        }
        return submit <= due ? "Succ" : "Late";
    })();

    const statusEl = (() => {
        if (status === "Succ") {
            const submitText = formatDate(submit!);
            return Badge(`제출: ${submitText}`, "success");
        } else if (status === "Late") {
            const submitText = formatDate(submit!);
            return Badge(`늦은 제출: ${submitText}`, "warning");
        } else if (status === "None") {
            return Badge("미제출", "danger");
        } else { // if (status === "Pend")
            if (!due) {
                return Badge("미제출", "primary");
            }
            const remText = formatDiff(rem!);
            return Badge(`${remText} 남음`, "primary");
        }
    })();

    const remEl = (() => {
        if (!due) {
            return null;
        } else if (block) {
            return Badge("제출 차단됨", "secondary");
        }
        const remText = formatDiff(rem!);
        if (status === "Succ" && left) {
            return Badge(`${remText} 남음`, "primary");
        } else if (status === "None") {
            return Badge(`${remText} 지남`, "warning");
        }
        return null;
    })();

    const dueEl = (() => {
        if (!due) {
            return Badge("기한 없음", "info");
        }
        const dueText = formatDate(due);
        if (left) {
            return Badge(`기한: ${dueText}`, "info");
        }
        return Badge(`마감: ${dueText}`, "secondary");
    })();

    insertAfter(assign, [
        "\u00A0\u00A0",
        ...[
            statusEl,
            remEl,
            dueEl,
        ].filter(e => !!e),
    ]);
}
