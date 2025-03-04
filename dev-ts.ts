import { context, BuildContext, BuildOptions } from "esbuild";
import { glob } from "glob";
import fs from "fs";
import path from "path";

const src = "./src";
const dest = "./live";
const entry = "index.ts";
const devEntry = "index.dev.ts";

const entryPath = path.join(src, "**", entry);
const devEntryPath = path.join(src, "**", devEntry);

const options: BuildOptions = {
    outdir: dest,
    bundle: true,
    platform: "browser",
    define: {
        "process.env.NODE_ENV": "\"development\"",
    },
};

let ctx: BuildContext | null = null;

async function watch() {
    const entryPoints = glob.sync([entryPath, devEntryPath]);
    ctx = await context({
        entryPoints,
        ...options,
    });
    await ctx.watch();
}

void watch();

fs.watch(src, { recursive: true }, async (_event, filename) => {
    if (!filename || (path.basename(filename) !== entry && path.basename(filename) !== devEntry)) {
        return;
    }
    if (ctx) {
        await ctx.dispose();
    }
    await watch();
});
