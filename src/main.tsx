import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./pages/AuthContext";
import { CartProvider } from "../src/components/Cart/CartContext.tsx";
import { GameScoreProvider } from "../src/components/contexts/GameScoreContext.tsx";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <GameScoreProvider>
          <App />
        </GameScoreProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
