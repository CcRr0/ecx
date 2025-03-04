import { useQuery } from "@tanstack/react-query";
import queryClient from "../queryClient";

import { courseListOptions, courseCurrentOptions } from "./course";
import { videoInfoOptions } from "./video";
import { assignInfoOptions } from "./assign";
import { quizInfoOptions } from "./quiz";

export interface CourseSummary {
    videoAct: number;
    videoReq: number;
    videoTotal: number;
    assignCount: number;
    assignTotal: number;
    quizCount: number;
    quizTotal: number;
}

export function useCourseSummary(id: number) {
    return useQuery({
        queryKey: ["course", "summary", id],
        queryFn: () => fetchCourseSummary(id),
        staleTime: 30 * 1000,
    });
}

export function useCourseSummaries() {
    return useQuery({
        queryKey: ["course", "summary"],
        queryFn: fetchCourseSummaries,
        staleTime: 30 * 1000,
    });
}

async function fetchCourseSummary(id: number): Promise<CourseSummary> {
    const { video, assign, quiz } = await queryClient.fetchQuery(courseCurrentOptions(id));

    let videoAct = 0;
    let videoReq = 0;
    let videoTotal = 0;
    let assignCount = 0;
    let assignTotal = 0;
    let quizCount = 0;
    let quizTotal = 0;

    videoTotal += video.length;
    if (video.length > 0) {
        const videoInfo = await queryClient.fetchQuery(videoInfoOptions(id));
        for (const { title } of video) {
            const { actual, required } = videoInfo[title];
            videoAct += Math.min(actual, required);
            videoReq += required;
        }
    }

    assignTotal += assign.length;
    await Promise.all(assign.map(async ({ id }) => {
        const { submit } = await queryClient.fetchQuery(assignInfoOptions(id));
        if (submit) {
            assignCount += 1;
        }
    }));

    quizTotal += quiz.length;
    await Promise.all(quiz.map(async ({ id }) => {
        const { submit } = await queryClient.fetchQuery(quizInfoOptions(id));
        if (submit) {
            quizCount += 1;
        }
    }));

    return {
        videoAct,
        videoReq,
        videoTotal,
        assignCount,
        assignTotal,
        quizCount,
        quizTotal,
    };
}

async function fetchCourseSummaries(): Promise<CourseSummary> {
    const list = await queryClient.fetchQuery(courseListOptions);
    const ids = list.map(({ id }) => id);

    let videoAct = 0;
    let videoReq = 0;
    let videoTotal = 0;
    let assignCount = 0;
    let assignTotal = 0;
    let quizCount = 0;
    let quizTotal = 0;

    await Promise.all(ids.map(async (id) => {
        const cs = await fetchCourseSummary(id);
        videoAct += cs.videoAct;
        videoReq += cs.videoReq;
        videoTotal += cs.videoTotal;
        assignCount += cs.assignCount;
        assignTotal += cs.assignTotal;
        quizCount += cs.quizCount;
        quizTotal += cs.quizTotal;
    }));

    return {
        videoAct,
        videoReq,
        videoTotal,
        assignCount,
        assignTotal,
        quizCount,
        quizTotal,
    };
}
