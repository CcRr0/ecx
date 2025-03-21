import { fetchParse } from "#/utils/fetch";

export interface CourseInfo {
    id: number;
    title: string;
}

export interface CourseVideo {
    title: string;
    id: number | null;
    laby: number | null;
    from: string;
    due: string;
}

export interface CourseAssign {
    id: number;
    title: string;
}

export interface CourseQuiz {
    id: number;
    title: string;
}

export interface CourseCurrent {
    video: CourseVideo[];
    assign: CourseAssign[];
    quiz: CourseQuiz[];
}

export const SwitchSelector = "a.btn-switch";
export const VideoSelector = "li.activity:is(.vod, .laby):has(.text-ubstrap)";
export const AssignSelector = "li.activity.assign:has(a)";
export const QuizSelector = "li.activity.quiz:has(a)";

export async function fetchCourseList(): Promise<CourseInfo[]> {
    const doc = await fetchParse("/local/ubion/user/");
    const rows = doc.querySelectorAll("div.course_lists table > tbody > tr");

    const res: CourseInfo[] = [];
    for (const row of rows) {
        const tds = row.children;
        if (tds.length < 2) {
            continue;
        }

        const label = tds[1];
        const a = label.querySelector("a")!;

        const id = Number(new URL(a.href).searchParams.get("id"));
        const title = a.textContent!.trim();

        res.push({
            id,
            title,
        });
    }

    return res;
}

export async function fetchCourseCurrent(id: number): Promise<CourseCurrent> {
    const url = `/course/view.php?id=${id}`;
    const doc = await fetchParse(url);

    const res: CourseCurrent = {
        video: [], assign: [], quiz: [],
    };

    if (document.querySelector(SwitchSelector)) {
        return res;
    }

    const current = doc.querySelector("div.course_box_current");
    if (!current) {
        return res;
    }

    const videos = current.querySelectorAll(VideoSelector);
    const assigns = current.querySelectorAll(AssignSelector);
    const quizzes = current.querySelectorAll(QuizSelector);

    for (const video of videos) {
        const title = video.querySelector("span.instancename")!.firstChild!.textContent!.trim();
        const [from, due] = video.querySelector("span.text-ubstrap")!.textContent!.split("~").map(
            s => new Date(s).toISOString(),
        );

        const a = video.querySelector("a");
        if (!a) {
            res.video.push({
                title, from, due,
                id: null, laby: null,
            });
            continue;
        }

        const id = Number(new URL(a.href).searchParams.get("id"));
        const laby = video.classList.contains("laby")
            ? Number(a.getAttribute("onclick")!.match(/'\/mod\/laby\/viewer\.php\?i=(\d+)'/)![1])
            : null;

        res.video.push({
            title,
            id,
            laby,
            from,
            due,
        });
    }

    for (const assign of assigns) {
        const a = assign.querySelector("a")!;
        const id = Number(new URL(a.href).searchParams.get("id"));

        const title = assign.querySelector("span.instancename")!
            .firstChild!.textContent!.trim();

        res.assign.push({
            id,
            title,
        });
    }

    for (const quiz of quizzes) {
        const a = quiz.querySelector("a")!;
        const id = Number(new URL(a.href).searchParams.get("id"));

        const title = quiz.querySelector("span.instancename")!
            .firstChild!.textContent!.trim();

        res.quiz.push({
            id,
            title,
        });
    }

    return res;
}
