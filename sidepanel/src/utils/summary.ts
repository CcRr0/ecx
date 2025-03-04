import { CourseSummary } from "$/summary";

export function summarize(
    { videoAct, videoReq, videoTotal, assignCount, assignTotal, quizCount, quizTotal }: CourseSummary,
): [number, number] {
    if (videoTotal === 0) {
        return [
            assignCount + quizCount,
            assignTotal + quizTotal,
        ];
    }
    return [
        videoAct * videoTotal + (assignCount + quizCount) * videoReq,
        (videoTotal + assignTotal + quizTotal) * videoReq,
    ];
}
