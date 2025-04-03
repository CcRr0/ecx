// https://learn.hansung.ac.kr/course/view.php?*

import { onLoad } from "#/utils/load";
import { fetchVideoList } from "#cs/fetch/video";
import { SwitchSelector, VideoSelector, AssignSelector, QuizSelector } from "#cs/fetch/course";

import videoExt from "./video";
import assignExt from "./assign";
import quizExt from "./quiz";

const SummaryExcl = ":not(.course_box0 .activity)";

onLoad(async () => {
    if (document.querySelector(SwitchSelector)) {
        return;
    }

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));

    const videoList = await fetchVideoList(id);
    const sections = document.querySelectorAll("li.section");

    for (const section of sections) {
        const week = Number(section.id.split("-")[1]);
        const videoInfos = videoList[week];
        if (!videoInfos) {
            continue;
        }

        const videos = section.querySelectorAll(VideoSelector);
        videos.forEach((video, i) => videoExt(video, videoInfos[i]));
    }

    const assigns = document.querySelectorAll(AssignSelector + SummaryExcl);
    assigns.forEach(assignExt);

    const quizzes = document.querySelectorAll(QuizSelector + SummaryExcl);
    quizzes.forEach(quizExt);
});

export function insertBelow(act: Element, el: Element) {
    const inst = act.querySelector("div.activityinstance")!;
    inst.insertAdjacentElement("afterend", el);
}

export function insertAfter(act: Element, els: (Node | string)[]) {
    const inst = act.querySelector("div.activityinstance")!;
    inst.append(...els);
}
