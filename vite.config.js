import dts from "vite-plugin-dts";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig ({
    build: {
        // Tells Vite we're building library code as opposed to application code
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            // Component library name
            name: "components-library",
            formats: ["es"],
            // Output file name
            filename: "index",
        },
        plugins: [dts({ rollupTypes: true })],
        rollupOptions: {
            // Provide global variables to use in the UMD build for externalized deps
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDom"
                }
            },
            // Externalize deps that shouldn't be bundled into the library
            external: ["react", "react-dom"]
        }
    }
});