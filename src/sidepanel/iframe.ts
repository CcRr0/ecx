import { Id } from "./params";

document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.getElementById("iframe")!;
    iframe.setAttribute("src", `http://localhost:3000/?id=${Id}`);
});
