// https://learn.hansung.ac.kr/course/view.php?*

import { onLoad } from "#/utils/load";
import { fetchVideoInfo } from "#cs/fetch/video";
import { VideoSelector, AssignSelector, QuizSelector } from "#cs/fetch/course";

import videoExt from "./video";
import assignExt from "./assign";
import quizExt from "./quiz";

const Exclude = ":not(.course_box0 .activity)";

onLoad(async () => {
    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));

    const videoInfo = await fetchVideoInfo(id);

    const videos = document.querySelectorAll(VideoSelector + Exclude);
    videos.forEach((video) => videoExt(video, videoInfo));

    const assigns = document.querySelectorAll(AssignSelector + Exclude);
    assigns.forEach(assignExt);

    const quizzes = document.querySelectorAll(QuizSelector + Exclude);
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
