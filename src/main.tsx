import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextShare from "./context/ContextShare.tsx";
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextShare>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ContextShare>
    </BrowserRouter>
  </React.StrictMode>
);
