import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "700px",
            padding: "12px 16px",
            fontSize: "17px",
            fontWeight: "400",
          },
          error: { style: { color: "red" } },
          success: { style: { color: "green" } },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
