import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBot from "./components/chatbot/ChatBot";

// Exportamos el componente
export { ChatBot };

// 📌 Asegurar que esté disponible en `window`
if (typeof window !== "undefined") {
    window.ChatWidget = ChatBot;
  }
