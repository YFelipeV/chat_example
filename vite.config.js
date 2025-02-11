import { defineConfig } from "vite";
import {resolve} from 'path'
import react from "@vitejs/plugin-react";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode:"production",
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.jsx"),
      name: "chat-widget",
      fileName: (format) => `chat-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
          "react/jsx-runtime": "react/jsx-runtime"
        }
      },
      
      intro: 'if (typeof process === "undefined") { var process = { env: { NODE_ENV: "production" } }; }',

      
    },

    
  }
});