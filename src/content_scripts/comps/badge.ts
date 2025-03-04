export type BadgeVariant =
    "primary" | "secondary" |
    "success" | "danger" |
    "warning" | "info";

export default function Badge(content: string, variant: BadgeVariant) {
    const el = document.createElement("span");
    el.classList.add("ecx-badge", `ecx-badge-${variant}`);
    el.textContent = content;
    return el;
}
