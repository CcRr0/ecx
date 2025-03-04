export interface Diff {
    day: number;
    hour: number;
    min: number;
    sec: number;
}

export function diff(start: number, end: number): Diff {
    const sec = Math.floor(end - start);
    return {
        day: Math.floor(sec / 86400),
        hour: Math.floor(sec / 3600) % 24,
        min: Math.floor(sec / 60) % 60,
        sec: sec % 60,
    };
}

export function remaining(due: Date, from: number = Date.now()): [Diff, boolean] {
    const start = from / 1000;
    const end = due.getTime() / 1000;
    if (end < start) {
        return [
            diff(end, start),
            false,
        ];
    }
    return [
        diff(start, end),
        true,
    ];
}
