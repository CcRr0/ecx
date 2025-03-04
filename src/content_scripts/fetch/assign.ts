import { fetchParse } from "#/utils/fetch";

export interface AssignInfo {
    due: string | null;
    submit: string | null;
    block: boolean;
}

export async function fetchAssignInfo(id: number): Promise<AssignInfo> {
    const url = `/mod/assign/view.php?id=${id}`;
    const doc = await fetchParse(url);

    const table = doc.querySelector("table.generaltable")!;
    const block = !doc.querySelector("div.submissionaction");

    let due: string | null = null;
    let submit: string | null = null;

    const infos = table.querySelectorAll(":scope > tbody > tr");
    for (const info of infos) {
        const [titleTd, contentTd] = info.children;
        const title = titleTd.textContent!.trim();
        if (title === "종료 일시") {
            const dueText = contentTd.textContent!.trim();
            due = new Date(dueText).toISOString();
        }
        if (title === "최종 수정 일시") {
            const submitText = contentTd.textContent!.trim();
            if (submitText !== "-") {
                submit = new Date(submitText).toISOString();
            }
        }
    }

    return {
        due,
        submit,
        block,
    };
}
