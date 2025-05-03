import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./Model.css";

import App from "./App.tsx";
import { AuthProvider } from "./pages/AuthContext.tsx"; // <-- import your context provider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
