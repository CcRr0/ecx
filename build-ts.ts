import { buildSync, BuildOptions } from "esbuild";
import { glob } from "glob";
import path from "path";

const src = "./src";
const dest = "./dist";
const entry = "index.ts";

const entryPoints = glob.sync(path.join(src, "**", entry));
const options: BuildOptions = {
    entryPoints,
    outdir: dest,
    bundle: true,
    minify: true,
    platform: "browser",
    define: {
        "process.env.NODE_ENV": "\"production\"",
    },
    metafile: true,
};

const res = buildSync(options);
console.log(Object.keys(res.metafile!.outputs));
