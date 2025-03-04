import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
                silenceDeprecations: [
                    "import",
                    "global-builtin",
                    "mixed-decls",
                    "color-functions",
                ],
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "$": path.resolve(__dirname, "./src/api/hooks"),
            "#": path.resolve(__dirname, "../src"),
            "#cs": path.resolve(__dirname, "../src/content_scripts"),
            "#sw": path.resolve(__dirname, "../src/service_worker"),
        },
    },
});
