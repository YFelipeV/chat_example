import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatWidget from "./ChatWidget";

// Exportamos el componente
export { ChatWidget };

// Función para montar el widget
const mount = (containerId, props = {}) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <ChatWidget {...props} />
    );
    return root;
  } catch (error) {
    console.error('Error mounting ChatWidget:', error);
  }
};

// Exponemos la función mount globalmente
if (typeof window !== 'undefined') {
  window.ChatWidget = mount;
}

export default mount;