import { Diff } from "./time";

export function formatDate(date: Date): string {
    const mo = date.getMonth() + 1;
    const dt = date.getDate();
    const hr = date.getHours().toString().padStart(2, "0");
    const mn = date.getMinutes().toString().padStart(2, "0");
    return `${mo}/${dt} ${hr}:${mn}`;
}

export function formatDiff({ day, hour, min, sec }: Diff): string {
    let s = "";
    if (day > 0) {
        s += `${day}일 `;
    }
    if (hour > 0) {
        s += `${hour}시간 `;
    }
    if (min > 0) {
        s += `${min}분 `;
    }
    if (sec > 0) {
        s += `${sec}초`;
    }
    return s;
}
