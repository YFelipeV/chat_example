import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBot from "./components/chatbot/ChatBot";

// Exportar el componente
export { ChatBot };

// Función de inicialización para uso global
const initChatBot = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`No se encontró el contenedor con ID: ${containerId}`);
    return;
  }
  
  try {
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(ChatBot));
    return root;
  } catch (error) {
    console.error('Error al inicializar ChatBot:', error);
  }
};

// Exponer la función de inicialización globalmente
if (typeof window !== "undefined") {
  window.ChatBot = initChatBot;
}

export default initChatBot;