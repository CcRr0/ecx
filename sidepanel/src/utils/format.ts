export function formatSec(sec: number, hour: boolean = true): string {
    const s = (sec % 60).toString().padStart(2, "0");
    if (!hour) {
        const m = (Math.floor(sec / 60)).toString().padStart(2, "0");
        return `${m}:${s}`;
    }
    const h = Math.floor(sec / 3600);
    const m = (Math.floor(sec / 60) % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
}

export function formatFrac(num: number, denom: number, digits: number = 1): string {
    const pct = (num / denom) * 100;
    return `${pct.toFixed(digits)}%`;
}
