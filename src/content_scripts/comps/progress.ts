export default function Progress(value: number, max: number) {
    const el = document.createElement("div");
    el.className = "ecx-progress";

    const bar = document.createElement("progress");
    bar.className = "ecx-progress-bar";
    bar.value = value;
    bar.max = max;

    const text = document.createElement("span");
    text.className = "ecx-progress-text";

    const elapsed = formatSec(value);
    const total = formatSec(max);
    const pct = (value / max * 100).toFixed(1);
    text.textContent = `${elapsed} / ${total} (${pct}%)`;

    el.append(bar, text);
    return el;
}

function formatSec(sec: number): string {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
