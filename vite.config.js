import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.jsx"), // 📌 Asegurar la entrada correcta
      name: "ChatWidget", // 📌 Nombre global para el UMD
      fileName: (format) => `chat-widget.${format}.js`,
      formats: ["umd"], // 📌 Asegurar que se genera UMD
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"], // 📌 No incluir React en el bundle
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        intro: `
          if (typeof process === "undefined") { var process = { env: { NODE_ENV: "production" } }; }
          if (typeof jsxRuntime === "undefined") { var jsxRuntime = React; }
        `,
      },
    },
  },
});
