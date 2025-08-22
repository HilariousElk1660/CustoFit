import { StrictMode } from "react";
import { CartProvider } from './context/CartContext';
import { createRoot } from "react-dom/client";
import "@fontsource/inter";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
