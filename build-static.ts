import { glob } from "glob";
import fs from "fs";
import path from "path";

const src = "./app";
const dest = "./dist";

fs.cpSync(src, dest, {
    recursive: true,
    filter: (source) => {
        const name = path.basename(source);
        return !name.includes(".dev.") && name !== "manifest.prod.json";
    },
});

fs.cpSync(path.join(src, "manifest.prod.json"), path.join(dest, "manifest.json"));

const jsonFiles = glob.sync(path.join(dest, "**/*.json"));
for (const file of jsonFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const minified = minifyJson(content);
    fs.writeFileSync(file, minified);
}

function minifyJson(json: string): string {
    const parsed = JSON.parse(json);
    const filtered = Object.fromEntries(
        Object.entries(parsed).filter(([key]) => {
            return !key.startsWith("$");
        }),
    );
    return JSON.stringify(filtered, null, 0);
}
