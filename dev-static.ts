import fs from "fs";
import path from "path";

const src = "./app";
const dest = "./live";

fs.cpSync(src, dest, {
    recursive: true,
    filter: (source) => {
        const name = path.basename(source);
        return !name.includes(".prod.") && name !== "manifest.dev.json";
    },
});

fs.cpSync(path.join(src, "manifest.dev.json"), path.join(dest, "manifest.json"));

fs.watch(src, { recursive: true }, (event, filename) => {
    if (!filename || filename.endsWith("~")) {
        return;
    }
    const srcPath = path.join(src, filename);
    const destPath = path.join(dest, filename === "manifest.dev.json" ? "manifest.json" : filename);
    if (event === "rename") {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
        } else {
            fs.unlinkSync(destPath);
        }
    } else {
        fs.copyFileSync(srcPath, destPath);
    }
});
