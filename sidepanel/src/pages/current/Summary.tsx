import { useCourseSummaries } from "$/summary";

import { summarize } from "@/utils/summary";
import { formatSec, formatFrac } from "@/utils/format";

import { Stack, Badge, ProgressBar } from "react-bootstrap";
import "./Summary.scss";

function Summary() {
    const { data: summary } = useCourseSummaries();
    const [now, max] = summary ? summarize(summary) : [null, null];
    const rem = summary && max! - now!;

    const nowLabel = summary && formatFrac(now!, max!);
    const remLabel = summary && `-${formatFrac(rem!, max!)}`;

    return (
        <div className="mb-3">
            <ProgressBar className="progress-lg mb-2">
                <ProgressBar
                    variant="success"
                    now={now ?? 0} max={Math.max(max ?? 1, 1)}
                    label={<b>{nowLabel}</b>}
                />
                <ProgressBar
                    className="text-dark" variant="warning"
                    now={rem ?? 0} max={Math.max(max ?? 1, 1)}
                    label={<b>{remLabel}</b>}
                />
            </ProgressBar>
            <Video />
            <Assign />
            <Quiz />
        </div>
    );
}

function Video() {
    const { data: summary } = useCourseSummaries();
    const { videoAct: act, videoReq: req } = summary || { videoAct: null, videoReq: null };
    const rem = summary && req! - act!;

    const nowLabel = summary && `${formatSec(act!)} 시청`;
    const remLabel = summary && `${formatSec(rem!)} 남음`;

    return (
        <Stack className="d-flex mb-1" direction="horizontal" gap={1}>
            <Badge>영상</Badge>
            <ProgressBar className="progress-md flex-grow-1">
                <ProgressBar
                    now={act ?? 0} max={Math.max(req ?? 1, 1)}
                    variant={rem === 0 ? "success" : "primary"}
                    label={<b>{nowLabel}</b>}
                />
                <ProgressBar
                    className="text-dark" variant="warning"
                    now={rem ?? 0} max={Math.max(req ?? 1, 1)}
                    label={<b>{remLabel}</b>}
                />
            </ProgressBar>
        </Stack>
    );
}

function Assign() {
    const { data: summary } = useCourseSummaries();
    const { assignCount: count, assignTotal: total } = summary || { assignCount: null, assignTotal: null };
    const rem = summary && total! - count!;

    const nowLabel = summary && `${count!} 제출`;
    const remLabel = summary && `${rem!} 남음`;

    return (
        <Stack className="d-flex mb-1" direction="horizontal" gap={1}>
            <Badge>과제</Badge>
            <ProgressBar className="progress-md flex-grow-1">
                <ProgressBar
                    now={count ?? 0} max={Math.max(total ?? 1, 1)}
                    variant={rem === 0 ? "success" : "primary"}
                    label={<b>{nowLabel}</b>}
                />
                <ProgressBar
                    className="text-dark" variant="warning"
                    now={rem ?? 0} max={Math.max(total ?? 1, 1)}
                    label={<b>{remLabel}</b>}
                />
            </ProgressBar>
        </Stack>
    );
}

function Quiz() {
    const { data: summary } = useCourseSummaries();
    const { quizCount: count, quizTotal: total } = summary || { quizCount: null, quizTotal: null };
    const rem = summary && total! - count!;

    const nowLabel = summary && `${count!} 제출`;
    const remLabel = summary && `${rem!} 남음`;

    return (
        <Stack className="d-flex mb-1" direction="horizontal" gap={1}>
            <Badge>퀴즈</Badge>
            <ProgressBar className="progress-md flex-grow-1">
                <ProgressBar
                    now={count ?? 0} max={Math.max(total ?? 1, 1)}
                    variant={rem === 0 ? "success" : "primary"}
                    label={<b>{nowLabel}</b>}
                />
                <ProgressBar
                    className="text-dark" variant="warning"
                    now={rem ?? 0} max={Math.max(total ?? 1, 1)}
                    label={<b>{remLabel}</b>}
                />
            </ProgressBar>
        </Stack>
    );
}

export default Summary;
