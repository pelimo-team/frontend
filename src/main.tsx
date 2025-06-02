import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider as MainAdminAuthProvider } from "./components/MainAdminContext/MainAuthContexts";
import { AuthProvider as SiteAuthProvider } from "./pages/AuthContext";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <SiteAuthProvider>
      <MainAdminAuthProvider>
        <App />
      </MainAdminAuthProvider>
    </SiteAuthProvider>
  </StrictMode>
);
