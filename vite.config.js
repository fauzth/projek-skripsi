import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],

            refresh: true,
        }),

        tailwindcss(),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },

    server: {
        host: "0.0.0.0",
        port: 5173,
        hmr: {
            host: "192.168.1.36",
        },

        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
