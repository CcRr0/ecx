import { fetchParse } from "#/utils/fetch";

export interface QuizInfo {
    from: string | null;
    due: string | null;
    submit: string | null;
}

export async function fetchQuizInfo(id: number): Promise<QuizInfo> {
    const url = `/mod/quiz/view.php?id=${id}`;
    const doc = await fetchParse(url);

    let from: string | null = null;
    let due: string | null = null;

    const infos = doc.querySelectorAll("div.quizinfo > p");
    for (const info of infos) {
        const text = info.textContent!.trim();
        if (text.startsWith("시작일시 : ")) {
            from = new Date(text.slice(7).trim()).toISOString();
        }
        if (text.endsWith(" 까지는 퀴즈를 이용할 수 없음")) {
            from = new Date(text.slice(0, 10)).toISOString();
        }
        if (text.startsWith("종료일시 : ")) {
            due = new Date(text.slice(7).trim()).toISOString();
        }
    }

    const summary = doc.querySelector("table.quizattemptsummary");
    const submitText = summary?.querySelector("span.statedetails")?.textContent!.slice(0, 16);

    const submit = summary
        ? (submitText ? new Date(submitText).toISOString() : null)
        : null;

    return {
        from,
        due,
        submit,
    };
}
