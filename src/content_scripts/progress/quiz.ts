import { insertAfter } from ".";
import { fetchQuizInfo } from "#cs/fetch/quiz";

import { remaining } from "#/utils/time";
import { formatDate, formatDiff } from "#/utils/format";

import Badge from "../comps/badge";

type Status = "Succ" | "Pend" | "None" | "Disabled";

export default async function quizExt(quiz: Element) {
    const margin = document.createTextNode("\u00A0\u00A0");
    const loadEl = Badge("로드 중...", "warning");
    insertAfter(quiz, [margin, loadEl]);

    const a = quiz.querySelector("a")!;
    const id = Number(new URL(a.href).searchParams.get("id"));

    const { from: fromIso, due: dueIso, submit: submitIso } = await fetchQuizInfo(id);
    const from = fromIso ? new Date(fromIso) : null;
    const due = dueIso ? new Date(dueIso) : null;
    const submit = submitIso ? new Date(submitIso) : null;

    const [rem, left] = due ? remaining(due) : [null, true];

    loadEl.remove();
    margin.remove();

    const status: Status = (() => {
        if (from && Date.now() < from.getTime()) {
            return "Disabled";
        }
        if (!submit) {
            return left ? "Pend" : "None";
        }
        return "Succ";
    })();

    const statusEl = (() => {
        if (status === "Disabled") {
            const fromText = formatDate(from!);
            return Badge(`시작: ${fromText}`, "secondary");
        } else if (status === "Succ") {
            const submitText = formatDate(submit!);
            return Badge(`제출: ${submitText}`, "success");
        } else if (status === "None") {
            return Badge("미제출", "danger");
        } else { // if (status === "Pend")
            if (!rem) {
                return Badge("미제출", "primary");
            }
            const remText = formatDiff(rem);
            return Badge(`${remText} 남음`, "primary");
        }
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

    insertAfter(quiz, [
        "\u00A0\u00A0",
        ...[
            statusEl,
            dueEl,
        ],
    ]);
}
