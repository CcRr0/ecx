import { fetchParse } from "#/utils/fetch";

export interface VideoInfo {
    title: string;
    actual: number;
    required: number;
}

export async function fetchVideoList(id: number): Promise<VideoInfo[][]> {
    const url = `/report/ubcompletion/user_progress.php?id=${id}`;
    const doc = await fetchParse(url);

    const table = doc.querySelector("table.user_progress");
    if (!table) {
        return [];
    }

    const rows = table.querySelectorAll(":scope > tbody > tr");
    const res: VideoInfo[][] = [];

    let week = 0;
    for (const row of rows) {
        const tds = row.children;
        const start = [...tds].findIndex(td => td.querySelector("img"));
        if (start === -1) {
            continue;
        }

        const weekEl = tds[0].querySelector("div.sectiontitle");
        if (weekEl) {
            week = Number(weekEl.textContent!.trim());
        }

        const titleTd = tds[start];
        const reqTd = tds[start + 1];
        const actTd = tds[start + 2];

        const title = titleTd.textContent!.trim();
        const required = timeToSec(reqTd.textContent!.trim());
        const actual = actTd.firstChild
            ? timeToSec(actTd.firstChild.textContent!.trim())
            : 0;

        res[week] = res[week] || [];
        res[week].push({
            title,
            actual,
            required,
        });
    }

    return res;
}

function timeToSec(time: string): number {
    if (time.length === 0 || time === "0") {
        return 0;
    }
    const spl = time.split(":").map(Number);
    if (spl.length === 3) {
        const [h, m, s] = spl;
        return h * 3600 + m * 60 + s;
    }
    const [m, s] = spl;
    return m * 60 + s;
}
