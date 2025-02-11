import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBot from "./components/chatbot/ChatBot";

// Exportamos el componente
export { ChatBot };

// 📌 Asegurar que esté disponible en `window` para ser usado con `<script>`
if (typeof window !== "undefined") {
    window.ChatBot = function (containerId)  {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return;
      }
      ReactDOM.createRoot(container).render(<ChatBot />);
    };
  }
