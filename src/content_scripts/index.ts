// https://learn.hansung.ac.kr/*

import Req, { Type } from "./Req";
import Res from "./Res";

import { fetchCourseList, fetchCourseCurrent } from "./fetch/course";
import { fetchVideoInfo } from "./fetch/video";
import { fetchAssignInfo } from "./fetch/assign";
import { fetchQuizInfo } from "./fetch/quiz";

import "./toggle";

chrome.runtime.onMessage.addListener((req: Req, _sender, sendResponse) => {
    const { type } = req;

    function respond<T extends Type>(res: Res<T>) {
        sendResponse(JSON.stringify(res));
    }

    if (type === "COURSE_LIST") {
        (async () => {
            const res = await fetchCourseList();
            respond<typeof type>(res);
        })();
    } else if (type === "COURSE_CURRENT") {
        const { id } = req;
        (async () => {
            const res = await fetchCourseCurrent(id);
            respond<typeof type>(res);
        })();
    } else if (type === "VIDEO_INFO") {
        const { id } = req;
        (async () => {
            const res = await fetchVideoInfo(id);
            respond<typeof type>(res);
        })();
    } else if (type === "ASSIGN_INFO") {
        const { id } = req;
        (async () => {
            const res = await fetchAssignInfo(id);
            respond<typeof type>(res);
        })();
    } else if (type === "QUIZ_INFO") {
        const { id } = req;
        (async () => {
            const res = await fetchQuizInfo(id);
            respond<typeof type>(res);
        })();
    }

    return true;
});
